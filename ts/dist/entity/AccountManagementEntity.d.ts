import { MultifonClientEntityBase } from '../MultifonClientEntityBase';
import type { MultifonClientSDK } from '../MultifonClientSDK';
import type { Control } from '../types';
import type { AccountManagement, AccountManagementLoadMatch } from '../MultifonClientTypes';
declare class AccountManagementEntity extends MultifonClientEntityBase<AccountManagement> {
    constructor(client: MultifonClientSDK, entopts: any);
    make(this: AccountManagementEntity): AccountManagementEntity;
    load(this: any, reqmatch?: AccountManagementLoadMatch, ctrl?: Control): Promise<AccountManagementEntity>;
}
export { AccountManagementEntity };
