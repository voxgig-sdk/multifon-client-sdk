
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MultifonClientSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MultifonClientSDK.test()
    equal(testsdk instanceof MultifonClientSDK, true,
      'MultifonClientSDK.test() must return a client synchronously')
  })

})
