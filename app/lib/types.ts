export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    name: string | null;
    pfp: boolean | null;
    uuids: Record<string, string>;
    "2fa": Record<string, boolean>;
    display_name: string | null;
    color: string;
};

export type ServerResponse = {
    success: boolean;
    error?: string;
    "2fa": boolean;
}
