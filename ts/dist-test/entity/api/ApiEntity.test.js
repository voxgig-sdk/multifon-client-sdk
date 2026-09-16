"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MULTIFON_CLIENT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MULTIFON_CLIENT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MultifonClientSDK.test();
        const ent = testsdk.Api();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MULTIFON_CLIENT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "message", "req": false, "short": "Success message", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "success", "req": false, "type": "`$BOOLEAN`", "index$": 1 }], "name": "api", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "method", "orig": "method", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "POST /api", "json": "{\"operationId\":\"updateAccountSettings\",\"parameters\":[{\"description\":\"The method to set specific settings\",\"in\":\"query\",\"name\":\"method\",\"required\":true,\"schema\":{\"enum\":[\"setRouting\",\"setCallingLines\",\"setStatus\",\"setPassword\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"enabled\":{\"description\":\"Enable or disable routing\",\"type\":\"boolean\"},\"rules\":{\"items\":{\"properties\":{\"destination\":{\"type\":\"string\"},\"priority\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"enabled\"],\"type\":\"object\"},{\"properties\":{\"lines\":{\"items\":{\"properties\":{\"active\":{\"type\":\"boolean\"},\"number\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"lines\"],\"type\":\"object\"},{\"properties\":{\"status\":{\"description\":\"New account status\",\"enum\":[\"active\",\"inactive\"],\"type\":\"string\"}},\"required\":[\"status\"],\"type\":\"object\"},{\"properties\":{\"currentPassword\":{\"description\":\"Current password\",\"format\":\"password\",\"type\":\"string\"},\"newPassword\":{\"description\":\"New password\",\"format\":\"password\",\"type\":\"string\"}},\"required\":[\"currentPassword\",\"newPassword\"],\"type\":\"object\"}]}},\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"value\":{\"description\":\"The value to set for the specified method\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Success message\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully updated settings\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters or data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Authentication required or failed\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BasicAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key authentication via query parameter\",\"in\":\"query\",\"name\":\"auth\",\"type\":\"apiKey\"},\"BasicAuth\":{\"description\":\"Basic HTTP authentication\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api", "segments": [{ "lit": "api" }], "select": { "exist": ["method"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "api", "name__orig": "api", "Name": "Api", "name_": "api", "name-": "api", "NAME": "API", "index$": 1 }, { "active": true, "entity": "api", "key$": "BasicApiFlow", "kind": "basic", "name": "BasicApiFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "api_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Api');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_ref01_ent = client.Api();
        let api_ref01_data = setup.data.new.api['api_ref01'];
        api_ref01_data = (await api_ref01_ent.create(api_ref01_data)).data();
        (0, node_assert_1.default)(null != api_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api/ApiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MultifonClientSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api01', 'api02', 'api03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MULTIFON_CLIENT_TEST_API_ENTID': idmap,
        'MULTIFON_CLIENT_TEST_LIVE': 'FALSE',
        'MULTIFON_CLIENT_TEST_EXPLAIN': 'FALSE',
        'MULTIFON_CLIENT_APIKEY': '',
    });
    idmap = env['MULTIFON_CLIENT_TEST_API_ENTID'];
    const live = 'TRUE' === env.MULTIFON_CLIENT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MULTIFON_CLIENT_TEST_API_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MultifonClientSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.MULTIFON_CLIENT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.MULTIFON_CLIENT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ApiEntity.test.js.map