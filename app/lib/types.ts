export type User = {
    uuid: string;
    token: string;
}

export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    session: string;
}

export type ServerResponse = {
    success: boolean;
    message?: string;
    key?: string;
}