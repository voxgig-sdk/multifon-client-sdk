# MultifonClient SDK

Manage Multifon (MegaFon) phone accounts: routing, lines, status, password, balance and profile

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Multifon Client API

Multifon is a Russian VoIP / multi-device calling service operated by [MegaFon](https://www.megafon.ru/). The Client API lets a subscriber programmatically manage their Multifon account at `https://sm.megafon.ru/sm/client/`, using their phone number as the login and their Multifon password.

What you get from the API:

- **Routing** — switch incoming calls between GSM, SIP, or combined mode.
- **Calling lines** — set the number of concurrent SIP lines (in the 2–20 range).
- **Status** — check whether the account is active or blocked.
- **Password** — update the account password.
- **Balance** — read the current account balance.
- **Profile** — fetch the full account profile.

Requests can be made as either GET (with `login` and `password` URL parameters) or POST (form data). The service is HTTP-based, returns simple XML responses, and is intended for use by the account owner — there is no separate API key or OAuth flow.

## Try it

**TypeScript**
```bash
npm install multifon-client
```

**Python**
```bash
pip install multifon-client-sdk
```

**PHP**
```bash
composer require voxgig/multifon-client-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/multifon-client-sdk/go
```

**Ruby**
```bash
gem install multifon-client-sdk
```

**Lua**
```bash
luarocks install multifon-client-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MultifonClientSDK } from 'multifon-client'

const client = new MultifonClientSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o multifon-client-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "multifon-client": {
      "command": "/abs/path/to/multifon-client-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AccountManagement** | Operations on the subscriber's own Multifon account — routing, calling lines, status, password, balance and profile — under `https://sm.megafon.ru/sm/client/`. | `/api` |
| **Api** | Generic catch-all grouping for the Multifon Client HTTP endpoints exposed at `sm.megafon.ru/sm/client/`. | `/api` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from multifonclient_sdk import MultifonClientSDK

client = MultifonClientSDK({})


# Load a specific accountmanagement
accountmanagement, err = client.AccountManagement(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'multifonclient_sdk.php';

$client = new MultifonClientSDK([]);


// Load a specific accountmanagement
[$accountmanagement, $err] = $client->AccountManagement(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/multifon-client-sdk/go"

client := sdk.NewMultifonClientSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "MultifonClient_sdk"

client = MultifonClientSDK.new({})


# Load a specific accountmanagement
accountmanagement, err = client.AccountManagement(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("multifon-client_sdk")

local client = sdk.new({})


-- Load a specific accountmanagement
local accountmanagement, err = client:AccountManagement(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MultifonClientSDK.test()
const result = await client.AccountManagement().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MultifonClientSDK.test(None, None)
result, err = client.AccountManagement(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MultifonClientSDK::test(null, null);
[$result, $err] = $client->AccountManagement(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AccountManagement(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MultifonClientSDK.test(nil, nil)
result, err = client.AccountManagement(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AccountManagement(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Multifon Client API

- Upstream: [https://sm.megafon.ru](https://sm.megafon.ru)
- API docs: [https://sm.megafon.ru/sm/client/](https://sm.megafon.ru/sm/client/)

---

Generated from the Multifon Client API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
