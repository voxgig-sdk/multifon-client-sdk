-- Typed models for the MultifonClient SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AccountManagement

---@class AccountManagementLoadMatch
---@field auth? string
---@field method string

---@class Api
---@field message? string
---@field success? boolean

---@class ApiCreateData
---@field method string
---@field message? string
---@field success? boolean

local M = {}

return M
