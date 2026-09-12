import { MultifonClientEntityBase } from '../MultifonClientEntityBase';
import type { MultifonClientSDK } from '../MultifonClientSDK';
import type { Control } from '../types';
import type { Api, ApiCreateData } from '../MultifonClientTypes';
declare class ApiEntity extends MultifonClientEntityBase<Api> {
    constructor(client: MultifonClientSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    create(this: any, reqdata?: ApiCreateData, ctrl?: Control): Promise<ApiEntity>;
}
export { ApiEntity };
