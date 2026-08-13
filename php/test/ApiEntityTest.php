<?php
declare(strict_types=1);

// Api entity test

require_once __DIR__ . '/../multifonclient_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ApiEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MultifonClientSDK::test(null, null);
        $ent = $testsdk->Api(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = api_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "api." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MULTIFON_CLIENT_TEST_API_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $api_ref01_ent = $client->Api(null);
        $api_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.api"), "api_ref01"));

        $api_ref01_data_result = $api_ref01_ent->create($api_ref01_data, null);
        $api_ref01_data = Helpers::to_map(is_object($api_ref01_data_result) && method_exists($api_ref01_data_result, 'data_get') ? $api_ref01_data_result->data_get() : $api_ref01_data_result);
        $this->assertNotNull($api_ref01_data);

    }
}

function api_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/api/ApiTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MultifonClientSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["api01", "api02", "api03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MULTIFON_CLIENT_TEST_API_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MULTIFON_CLIENT_TEST_API_ENTID" => $idmap,
        "MULTIFON_CLIENT_TEST_LIVE" => "FALSE",
        "MULTIFON_CLIENT_TEST_EXPLAIN" => "FALSE",
        "MULTIFON_CLIENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MULTIFON_CLIENT_TEST_API_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MULTIFON_CLIENT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["MULTIFON_CLIENT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new MultifonClientSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MULTIFON_CLIENT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MULTIFON_CLIENT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
