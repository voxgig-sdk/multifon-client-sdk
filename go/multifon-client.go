package voxgigmultifonclientsdk

import (
	"github.com/voxgig-sdk/multifon-client-sdk/go/core"
	"github.com/voxgig-sdk/multifon-client-sdk/go/entity"
	"github.com/voxgig-sdk/multifon-client-sdk/go/feature"
	_ "github.com/voxgig-sdk/multifon-client-sdk/go/utility"
)

// Type aliases preserve external API.
type MultifonClientSDK = core.MultifonClientSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MultifonClientEntity = core.MultifonClientEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MultifonClientError = core.MultifonClientError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAccountManagementEntityFunc = func(client *core.MultifonClientSDK, entopts map[string]any) core.MultifonClientEntity {
		return entity.NewAccountManagementEntity(client, entopts)
	}
	core.NewApiEntityFunc = func(client *core.MultifonClientSDK, entopts map[string]any) core.MultifonClientEntity {
		return entity.NewApiEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMultifonClientSDK = core.NewMultifonClientSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewMultifonClientSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *MultifonClientSDK  { return NewMultifonClientSDK(nil) }
func Test() *MultifonClientSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
