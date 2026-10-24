-- MultifonClient SDK error

local json = require("dkjson")

local MultifonClientError = {}
MultifonClientError.__index = MultifonClientError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function MultifonClientError.new(code, msg, ctx)
  local self = setmetatable({}, MultifonClientError)
  self.is_sdk_error = true
  self.sdk = "MultifonClient"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function MultifonClientError:context()
  return CONTEXT[self]
end


function MultifonClientError:error()
  return self.msg
end


function MultifonClientError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function MultifonClientError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function MultifonClientError:to_json()
  return json.encode(self:to_table())
end


function MultifonClientError:__tostring()
  return self.msg
end


function MultifonClientError.__tojson(self)
  return self:to_json()
end


return MultifonClientError
