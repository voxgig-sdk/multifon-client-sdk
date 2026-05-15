# MultifonClient SDK feature factory

from feature.base_feature import MultifonClientBaseFeature
from feature.test_feature import MultifonClientTestFeature


def _make_feature(name):
    features = {
        "base": lambda: MultifonClientBaseFeature(),
        "test": lambda: MultifonClientTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
