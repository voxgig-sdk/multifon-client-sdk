# frozen_string_literal: true

# Typed models for the MultifonClient SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AccountManagement entity data model.
class AccountManagement
end

# Match filter for AccountManagement#load (any subset of AccountManagement fields).
class AccountManagementLoadMatch
end

# Api entity data model.
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Api = Struct.new(
  :message,
  :success,
  keyword_init: true
)

# Match filter for Api#create (any subset of Api fields).
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ApiCreateData = Struct.new(
  :message,
  :success,
  keyword_init: true
)

