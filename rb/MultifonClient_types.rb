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

# Request payload for AccountManagement#load.
#
# @!attribute [rw] auth
#   @return [String, nil]
#
# @!attribute [rw] method
#   @return [String]
AccountManagementLoadMatch = Struct.new(
  :auth,
  :method,
  keyword_init: true
)

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

# Request payload for Api#create.
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ApiCreateData = Struct.new(
  :method,
  :message,
  :success,
  keyword_init: true
)

