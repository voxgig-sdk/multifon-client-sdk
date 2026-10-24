import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "account_management",
    "accessor": "AccountManagement",
    "op": "load",
    "method": "GET",
    "path": "/api",
    "args": [],
    "select": {
      "method": "v1",
      "auth": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "method",
      "auth"
    ],
    "queryArgs": [
      {
        "name": "auth",
        "wire": "auth"
      },
      {
        "name": "method",
        "wire": "method"
      }
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
    "idField": "id",
    "ownQuery": "auth"
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "method"
    ],
    "queryArgs": [],
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
    "idField": "id",
    "ownQuery": "auth"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
