package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAccountManagementEntityFunc func(client *MultifonClientSDK, entopts map[string]any) MultifonClientEntity

var NewApiEntityFunc func(client *MultifonClientSDK, entopts map[string]any) MultifonClientEntity

