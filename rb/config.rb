# MultifonClient SDK configuration

module MultifonClientConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "MultifonClient",
        "slug" => "multifon-client",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://sm.megafon.ru",
        "auth" => {
          "prefix" => "",
          "in" => "query",
          "name" => "auth",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "account_management" => {},
          "api" => {},
        },
      },
      "entity" => {
        "account_management" => {
          "fields" => [],
          "name" => "account_management",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                  ],
                  "parts" => [
                    "api",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "auth",
                        "orig" => "auth",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "method",
                        "orig" => "method",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "method",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "api" => {
          "fields" => [
            {
              "name" => "message",
              "title" => "Message",
              "type" => "`$STRING`",
              "short" => "Success message",
            },
            {
              "name" => "success",
              "title" => "Success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "api",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                  ],
                  "parts" => [
                    "api",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "method",
                        "orig" => "method",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "method",
                    ],
                  },
                  "body" => {
                    "alternatives" => [
                      {
                        "fields" => [
                          {
                            "name" => "value",
                          },
                        ],
                        "kind" => "form",
                        "media" => "application/x-www-form-urlencoded",
                      },
                    ],
                    "kind" => "json",
                    "media" => "application/json",
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MultifonClientFeatures.make_feature(name)
  end
end
