
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'MultifonClient',
        slug: "multifon-client",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://sm.megafon.ru",

    auth: {
      prefix: '',
      in: 'query',
      name: 'auth',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        account_management: {
        },
  
        api: {
        },
  
    }
  }


  entity = {
    "account_management": {
      "fields": [],
      "name": "account_management",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/api",
              "segments": [
                {
                  "lit": "api"
                }
              ],
              "parts": [
                "api"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "auth",
                    "orig": "auth",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "method",
                    "orig": "method",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "method"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "api": {
      "fields": [
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "short": "Success message"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "api",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/api",
              "segments": [
                {
                  "lit": "api"
                }
              ],
              "parts": [
                "api"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "method",
                    "orig": "method",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "method"
                ]
              },
              "body": {
                "alternatives": [
                  {
                    "fields": [
                      {
                        "name": "value"
                      }
                    ],
                    "kind": "form",
                    "media": "application/x-www-form-urlencoded"
                  }
                ],
                "kind": "json",
                "media": "application/json"
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

