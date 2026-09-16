

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


describe('ApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MULTIFON_CLIENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MULTIFON_CLIENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MultifonClientSDK.test()
    const ent = testsdk.Api()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MULTIFON_CLIENT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"message","req":false,"short":"Success message","type":"`$STRING`","index$":0},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":1}],"name":"api","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"method","orig":"method","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /api","json":"{\"operationId\":\"updateAccountSettings\",\"parameters\":[{\"description\":\"The method to set specific settings\",\"in\":\"query\",\"name\":\"method\",\"required\":true,\"schema\":{\"enum\":[\"setRouting\",\"setCallingLines\",\"setStatus\",\"setPassword\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"enabled\":{\"description\":\"Enable or disable routing\",\"type\":\"boolean\"},\"rules\":{\"items\":{\"properties\":{\"destination\":{\"type\":\"string\"},\"priority\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"enabled\"],\"type\":\"object\"},{\"properties\":{\"lines\":{\"items\":{\"properties\":{\"active\":{\"type\":\"boolean\"},\"number\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"lines\"],\"type\":\"object\"},{\"properties\":{\"status\":{\"description\":\"New account status\",\"enum\":[\"active\",\"inactive\"],\"type\":\"string\"}},\"required\":[\"status\"],\"type\":\"object\"},{\"properties\":{\"currentPassword\":{\"description\":\"Current password\",\"format\":\"password\",\"type\":\"string\"},\"newPassword\":{\"description\":\"New password\",\"format\":\"password\",\"type\":\"string\"}},\"required\":[\"currentPassword\",\"newPassword\"],\"type\":\"object\"}]}},\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"value\":{\"description\":\"The value to set for the specified method\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Success message\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successfully updated settings\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters or data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Authentication required or failed\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]},{\"BasicAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key authentication via query parameter\",\"in\":\"query\",\"name\":\"auth\",\"type\":\"apiKey\"},\"BasicAuth\":{\"description\":\"Basic HTTP authentication\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api","segments":[{"lit":"api"}],"select":{"exist":["method"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api","name__orig":"api","Name":"Api","name_":"api","name-":"api","NAME":"API","index$":1}, {"active":true,"entity":"api","key$":"BasicApiFlow","kind":"basic","name":"BasicApiFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"api_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Api')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_ref01_ent = client.Api()
    let api_ref01_data = setup.data.new.api['api_ref01']

    api_ref01_data = (await api_ref01_ent.create(api_ref01_data)).data()
    assert(null != api_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api/ApiTestData.json')

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
    ['api01','api02','api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MULTIFON_CLIENT_TEST_API_ENTID': idmap,
    'MULTIFON_CLIENT_TEST_LIVE': 'FALSE',
    'MULTIFON_CLIENT_TEST_EXPLAIN': 'FALSE',
    'MULTIFON_CLIENT_APIKEY': '',
  })

  idmap = env['MULTIFON_CLIENT_TEST_API_ENTID']

  const live = 'TRUE' === env.MULTIFON_CLIENT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MULTIFON_CLIENT_TEST_API_ENTID']
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
  
