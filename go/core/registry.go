package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAccountManagementEntityFunc func(client *MultifonClientSDK, entopts map[string]any) MultifonClientEntity

var NewApiEntityFunc func(client *MultifonClientSDK, entopts map[string]any) MultifonClientEntity

