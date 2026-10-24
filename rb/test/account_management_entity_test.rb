# AccountManagement entity test

require "minitest/autorun"
require "json"
require_relative "../MultifonClient_sdk"
require_relative "runner"

class AccountManagementEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = MultifonClientSDK.test(nil, nil)
    ent = testsdk.AccountManagement(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = MultifonClientConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = MultifonClientSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AccountManagement(nil).load({ "auth" => 1, "method" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = account_management_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "account_management." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    account_management_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.account_management")))
    account_management_ref01_data = nil
    if account_management_ref01_data_raw.length > 0
      account_management_ref01_data = Helpers.to_map(account_management_ref01_data_raw[0][1])
    end

    # LOAD
    account_management_ref01_ent = client.AccountManagement(nil)
    account_management_ref01_match_dt0 = {}
    account_management_ref01_data_dt0_loaded = account_management_ref01_ent.load(account_management_ref01_match_dt0, nil)
    assert !account_management_ref01_data_dt0_loaded.nil?

  end
end

def account_management_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "account_management", "AccountManagementTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MultifonClientSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["account_management01", "account_management02", "account_management03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID" => idmap,
    "MULTIFON_CLIENT_TEST_LIVE" => "FALSE",
    "MULTIFON_CLIENT_TEST_EXPLAIN" => "FALSE",
    "MULTIFON_CLIENT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MULTIFON_CLIENT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["MULTIFON_CLIENT_APIKEY"],
      },
      extra || {},
    ])
    client = MultifonClientSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MULTIFON_CLIENT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MULTIFON_CLIENT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
