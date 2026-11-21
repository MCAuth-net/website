export type User = {
    uuid: string;
    token: string;
}

export type Account = {
    id: number;
    display: string;
    email: string | null;
    uuid: string | null;
    name: string | null;
    uuids: {
        uuid: string;
        name: string;
    };
    displayName: string | null;
    session: string;
}

export type ServerResponse = {
    success: boolean;
    message?: string;
    key?: string;
}