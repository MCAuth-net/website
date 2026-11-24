export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    name: string | null;
    pfp: boolean | null;
    uuids: Record<string, string>;
    display_name: string | null;
    color: string;
    session?: string;
};

export type ServerResponse = {
    success: boolean;
    message?: string;
    key?: string;
}