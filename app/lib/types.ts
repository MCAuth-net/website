export type Account = {
    id: number;
    email: string | null;
    uuid: string | null;
    name: string | null;
    password: boolean;
    pfp: boolean | null;
    uuids: Record<string, string>;
    "2fa": string[];
    sudo: boolean;
    display_name: string | null;
    color: string;
};

export type ServerResponse = {
    success: boolean;
    error?: string;
    "2fa": boolean;
}
