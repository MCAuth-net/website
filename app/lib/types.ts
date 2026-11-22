export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    name: string | null;
    uuids: {
        uuid: string;
        name: string;
    };
    displayName: string | null;
    color: string;
    session: string;
}

export type ServerResponse = {
    success: boolean;
    message?: string;
    key?: string;
}