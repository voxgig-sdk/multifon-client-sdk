

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MultifonClientSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AccountManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MULTIFON_CLIENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MULTIFON_CLIENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MultifonClientSDK.test()
    const ent = testsdk.AccountManagement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MULTIFON_CLIENT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account_management.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"account_management","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"auth","or":"auth","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"method","or":"method","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api","q":{"exist":["auth","method"]},"r":{},"s":[{"lit":"api"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account_management","name__orig":"account_management","Name":"AccountManagement","name_":"account_management","name-":"account-management","NAME":"ACCOUNT_MANAGEMENT","index$":0}, {"active":true,"entity":"account_management","key$":"BasicAccountManagementFlow","kind":"basic","name":"BasicAccountManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_management_ref01","srcdatavar":"account_management_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_management_ref01"}}],"index$":0}]}, 'AccountManagement', {"GET /api":{"protocol":"http","parameters":[{"name":"method","in":"query","description":"The method to retrieve specific information","required":true,"schema":{"type":"string","enum":["getRouting","getCallingLines","getStatus","getBalance","getProfile"]},"index$":0},{"name":"auth","in":"query","description":"Authentication token or credentials","required":false,"schema":{"type":"string"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_management_ref01_data = Object.values(setup.data.existing.account_management)[0] as any

    // LOAD
    const account_management_ref01_ent = client.AccountManagement()
    const account_management_ref01_match_dt0: any = {}
    const account_management_ref01_data_dt0 = (await account_management_ref01_ent.load(account_management_ref01_match_dt0)).data()
    assert(null != account_management_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/account_management/AccountManagementTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MultifonClientSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['account_management01','account_management02','account_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID': idmap,
    'MULTIFON_CLIENT_TEST_LIVE': 'FALSE',
    'MULTIFON_CLIENT_TEST_EXPLAIN': 'FALSE',
    'MULTIFON_CLIENT_APIKEY': '',
  })

  idmap = env['MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.MULTIFON_CLIENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MULTIFON_CLIENT_TEST_ACCOUNT_MANAGEMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MultifonClientSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.MULTIFON_CLIENT_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MULTIFON_CLIENT_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
