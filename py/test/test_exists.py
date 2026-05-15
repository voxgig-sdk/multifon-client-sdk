# ProjectName SDK exists test

import pytest
from multifonclient_sdk import MultifonClientSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MultifonClientSDK.test(None, None)
        assert testsdk is not None
