-- ProjectName SDK exists test

local sdk = require("multifon-client_sdk")

describe("MultifonClientSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
