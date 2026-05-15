package = "voxgig-sdk-multifon-client"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/multifon-client-sdk.git"
}
description = {
  summary = "MultifonClient SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["multifon-client_sdk"] = "multifon-client_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
