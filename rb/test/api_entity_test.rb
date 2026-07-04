# Api entity test

require "minitest/autorun"
require "json"
require_relative "../MultifonClient_sdk"
require_relative "runner"

class ApiEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MultifonClientSDK.test(nil, nil)
    ent = testsdk.Api(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = api_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "api." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MULTIFONCLIENT_TEST_API_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    api_ref01_ent = client.Api(nil)
    api_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.api"), "api_ref01"))

    api_ref01_data_result = api_ref01_ent.create(api_ref01_data, nil)
    api_ref01_data = Helpers.to_map(api_ref01_data_result)
    assert !api_ref01_data.nil?

  end
end

def api_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "api", "ApiTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MultifonClientSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["api01", "api02", "api03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MULTIFONCLIENT_TEST_API_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MULTIFONCLIENT_TEST_API_ENTID" => idmap,
    "MULTIFONCLIENT_TEST_LIVE" => "FALSE",
    "MULTIFONCLIENT_TEST_EXPLAIN" => "FALSE",
    "MULTIFONCLIENT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["MULTIFONCLIENT_TEST_API_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MULTIFONCLIENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["MULTIFONCLIENT_APIKEY"],
      },
      extra || {},
    ])
    client = MultifonClientSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MULTIFONCLIENT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MULTIFONCLIENT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
