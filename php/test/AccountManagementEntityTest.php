<?php
declare(strict_types=1);

// AccountManagement entity test

require_once __DIR__ . '/../multifonclient_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AccountManagementEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MultifonClientSDK::test(null, null);
        $ent = $testsdk->AccountManagement(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = account_management_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "account_management." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $account_management_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.account_management")));
        $account_management_ref01_data = null;
        if (count($account_management_ref01_data_raw) > 0) {
            $account_management_ref01_data = Helpers::to_map($account_management_ref01_data_raw[0][1]);
        }

        // LOAD
        $account_management_ref01_ent = $client->AccountManagement(null);
        $account_management_ref01_match_dt0 = [];
        $account_management_ref01_data_dt0_loaded = $account_management_ref01_ent->load($account_management_ref01_match_dt0, null);
        $this->assertNotNull($account_management_ref01_data_dt0_loaded);

    }
}

function account_management_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/account_management/AccountManagementTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MultifonClientSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["account_management01", "account_management02", "account_management03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID" => $idmap,
        "MULTIFON_CLIENT_TEST_LIVE" => "FALSE",
        "MULTIFON_CLIENT_TEST_EXPLAIN" => "FALSE",
        "MULTIFON_CLIENT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID"]);
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
