-- MultifonClient SDK error

local MultifonClientError = {}
MultifonClientError.__index = MultifonClientError


function MultifonClientError.new(code, msg, ctx)
  local self = setmetatable({}, MultifonClientError)
  self.is_sdk_error = true
  self.sdk = "MultifonClient"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MultifonClientError:error()
  return self.msg
end


function MultifonClientError:__tostring()
  return self.msg
end


return MultifonClientError
