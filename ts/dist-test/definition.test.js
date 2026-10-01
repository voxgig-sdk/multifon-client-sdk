"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "account_management",
        "accessor": "AccountManagement",
        "op": "load",
        "method": "GET",
        "path": "/api",
        "args": [],
        "select": {
            "auth": "v1",
            "method": "v1"
        },
        "headers": [],
        "query": [
            "method",
            "auth"
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "auth"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "routing": {
                "enabled": true,
                "rules": [
                    {
                        "id": "x",
                        "destination": "x",
                        "priority": 1
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "api",
        "accessor": "Api",
        "op": "create",
        "method": "POST",
        "path": "/api",
        "args": [],
        "select": {
            "method": "v1"
        },
        "headers": [],
        "query": [
            "method"
        ],
        "auth": [
            [
                {
                    "in": "query",
                    "name": "auth"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "message": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map