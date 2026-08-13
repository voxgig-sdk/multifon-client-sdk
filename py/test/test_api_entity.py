# Api entity test

import json
import os
import time

import pytest

from multifonclient_sdk.utility.voxgig_struct import voxgig_struct as vs
from multifonclient_sdk import MultifonClientSDK
from multifonclient_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestApiEntity:

    def test_should_create_instance(self):
        testsdk = MultifonClientSDK.test(None, None)
        ent = testsdk.Api(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _api_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "api." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MULTIFON_CLIENT_TEST_API_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        api_ref01_ent = client.Api(None)
        api_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.api"), "api_ref01"))

        api_ref01_data = helpers.to_map(runner.entity_data(api_ref01_ent.create(api_ref01_data, None)))
        assert api_ref01_data is not None



def _api_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/api/ApiTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MultifonClientSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["api01", "api02", "api03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MULTIFON_CLIENT_TEST_API_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MULTIFON_CLIENT_TEST_API_ENTID": idmap,
        "MULTIFON_CLIENT_TEST_LIVE": "FALSE",
        "MULTIFON_CLIENT_TEST_EXPLAIN": "FALSE",
        "MULTIFON_CLIENT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("MULTIFON_CLIENT_TEST_API_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MULTIFON_CLIENT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("MULTIFON_CLIENT_APIKEY"),
            },
            extra or {},
        ])
        client = MultifonClientSDK(helpers.to_map(merged_opts))

    _live = env.get("MULTIFON_CLIENT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MULTIFON_CLIENT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
