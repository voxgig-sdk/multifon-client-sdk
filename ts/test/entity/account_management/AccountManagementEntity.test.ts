

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"account_management","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"auth","orig":"auth","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"method","orig":"method","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api","json":"{\"operationId\":\"getAccountInfo\",\"parameters\":[{\"description\":\"The method to retrieve specific information\",\"in\":\"query\",\"name\":\"method\",\"required\":true,\"schema\":{\"enum\":[\"getRouting\",\"getCallingLines\",\"getStatus\",\"getBalance\",\"getProfile\"],\"type\":\"string\"}},{\"description\":\"Authentication token or credentials\",\"in\":\"query\",\"name\":\"auth\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"routing\":{\"properties\":{\"enabled\":{\"description\":\"Whether routing is enabled\",\"type\":\"boolean\"},\"rules\":{\"items\":{\"properties\":{\"destination\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"priority\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},{\"properties\":{\"lines\":{\"items\":{\"properties\":{\"active\":{\"description\":\"Whether the line is active\",\"type\":\"boolean\"},\"name\":{\"description\":\"Line name or label\",\"type\":\"string\"},\"number\":{\"description\":\"Phone number\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},{\"properties\":{\"lastUpdated\":{\"description\":\"Last status update timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"status\":{\"description\":\"Current account status\",\"enum\":[\"active\",\"inactive\",\"suspended\"],\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"balance\":{\"description\":\"Current account balance\",\"format\":\"double\",\"type\":\"number\"},\"currency\":{\"description\":\"Currency code\",\"example\":\"RUB\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Last balance update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"profile\":{\"properties\":{\"email\":{\"description\":\"Email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"description\":\"User full name\",\"type\":\"string\"},\"phoneNumber\":{\"description\":\"Primary phone number\",\"type\":\"string\"},\"registrationDate\":{\"description\":\"Account registration date\",\"format\":\"date-time\",\"type\":\"string\"},\"userId\":{\"description\":\"User identifier\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}]}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Authentication required or failed\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BasicAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key authentication via query parameter\",\"in\":\"query\",\"name\":\"auth\",\"type\":\"apiKey\"},\"BasicAuth\":{\"description\":\"Basic HTTP authentication\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api","segments":[{"lit":"api"}],"select":{"exist":["auth","method"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account_management","name__orig":"account_management","Name":"AccountManagement","name_":"account_management","name-":"account-management","NAME":"ACCOUNT_MANAGEMENT","index$":0}, {"active":true,"entity":"account_management","key$":"BasicAccountManagementFlow","kind":"basic","name":"BasicAccountManagementFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"account_management_ref01","srcdatavar":"account_management_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_management_ref01"}}],"index$":0}]}, 'AccountManagement')
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
  
