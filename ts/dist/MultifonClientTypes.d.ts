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
    currentPassword?: any;
    enabled?: any;
    lines?: any;
    newPassword?: any;
    rules?: any;
    status?: any;
}
