

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MultifonClientSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('ApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MULTIFON_CLIENT_TEST_LIVE=TRUE.
  afterEach(liveDelay('MULTIFON_CLIENT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MultifonClientSDK.test()
    const ent = testsdk.Api()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MultifonClientSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Api().create({"method":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MULTIFON_CLIENT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Success message","t":"`$STRING`","key$":"message","index$":0},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":1}},"name":"api","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["currentPassword","enabled","lines","newPassword","rules","status"],"co":{"id":"POST /api","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"method","or":"method","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/api","q":{"exist":["method"]},"r":{},"rb":{"alternatives":[{"fields":[{"name":"value"}],"kind":"form","media":"application/x-www-form-urlencoded"}],"kind":"json","media":"application/json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api","name__orig":"api","Name":"Api","name_":"api","name-":"api","NAME":"API","index$":1}, {"active":true,"entity":"api","key$":"BasicApiFlow","kind":"basic","name":"BasicApiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Api', {"POST /api":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"type":"object","required":["enabled"],"properties":{"enabled":{"type":"boolean","description":"Enable or disable routing"},"rules":{"type":"array","items":{"type":"object","properties":{}}}},"x-ref":"#/components/schemas/SetRoutingRequest"},{"type":"object","required":["lines"],"properties":{"lines":{"type":"array","items":{"type":"object","properties":{}}}},"x-ref":"#/components/schemas/SetCallingLinesRequest"},{"type":"object","required":["status"],"properties":{"status":{"type":"string","enum":["active","inactive"],"description":"New account status"}},"x-ref":"#/components/schemas/SetStatusRequest"},{"type":"object","required":["currentPassword","newPassword"],"properties":{"currentPassword":{"type":"string","format":"password","description":"Current password"},"newPassword":{"type":"string","format":"password","description":"New password"}},"x-ref":"#/components/schemas/SetPasswordRequest"}],"index$":1}},"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"value":{"type":"string","description":"The value to set for the specified method"}}}}}},"parameters":[{"name":"method","in":"query","description":"The method to set specific settings","required":true,"schema":{"type":"string","enum":["setRouting","setCallingLines","setStatus","setPassword"]},"index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
