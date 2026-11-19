export type User = {
    uuid: string;
    token: string;
}

export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    release: number;
}

export type ServerResponse = {
    success: boolean;
    message?: string;
}