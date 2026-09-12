export interface AccountManagement {
}
export interface AccountManagementLoadMatch {
    auth?: string;
    method: string;
}
export interface Api {
    message?: string;
    success?: boolean;
}
export interface ApiCreateData {
    method: string;
    message?: string;
    success?: boolean;
}
