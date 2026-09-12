import { AccountManagementEntity } from './entity/AccountManagementEntity';
import { ApiEntity } from './entity/ApiEntity';
export type * from './MultifonClientTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MultifonClientEntityBase } from './MultifonClientEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MultifonClientSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AccountManagement(entopts?: Record<string, any>): AccountManagementEntity;
    Api(entopts?: Record<string, any>): ApiEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MultifonClientSDK;
    tester(testopts?: any, sdkopts?: any): MultifonClientSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MultifonClientSDK;
export { stdutil, config, BaseFeature, MultifonClientEntityBase, MultifonClientSDK, SDK, };
