package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/multifon-client-sdk"
	"github.com/voxgig-sdk/multifon-client-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestApiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Api(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := apiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "api." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MULTIFONCLIENT_TEST_API_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		apiRef01Ent := client.Api(nil)
		apiRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "api"}, setup.data), "api_ref01"))

		apiRef01DataResult, err := apiRef01Ent.Create(apiRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		apiRef01Data = core.ToMapAny(apiRef01DataResult)
		if apiRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func apiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "api", "ApiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read api test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse api test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"api01", "api02", "api03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MULTIFONCLIENT_TEST_API_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MULTIFONCLIENT_TEST_API_ENTID": idmap,
		"MULTIFONCLIENT_TEST_LIVE":      "FALSE",
		"MULTIFONCLIENT_TEST_EXPLAIN":   "FALSE",
		"MULTIFONCLIENT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MULTIFONCLIENT_TEST_API_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MULTIFONCLIENT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MULTIFONCLIENT_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMultifonClientSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MULTIFONCLIENT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MULTIFONCLIENT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
