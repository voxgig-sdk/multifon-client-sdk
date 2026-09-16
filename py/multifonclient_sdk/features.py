# MultifonClient SDK feature factory

from multifonclient_sdk.feature.base_feature import MultifonClientBaseFeature
from multifonclient_sdk.feature.ratelimit_feature import MultifonClientRatelimitFeature
from multifonclient_sdk.feature.retry_feature import MultifonClientRetryFeature
from multifonclient_sdk.feature.test_feature import MultifonClientTestFeature
from multifonclient_sdk.feature.timeout_feature import MultifonClientTimeoutFeature


_FEATURES = {
    "base": lambda: MultifonClientBaseFeature(),
    "ratelimit": lambda: MultifonClientRatelimitFeature(),
    "retry": lambda: MultifonClientRetryFeature(),
    "test": lambda: MultifonClientTestFeature(),
    "timeout": lambda: MultifonClientTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
