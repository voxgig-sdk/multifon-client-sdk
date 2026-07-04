# Typed models for the MultifonClient SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AccountManagement:
    pass


@dataclass
class AccountManagementLoadMatch:
    pass


@dataclass
class Api:
    message: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class ApiCreateData:
    message: Optional[str] = None
    success: Optional[bool] = None

