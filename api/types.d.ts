export interface ILinkMutation {
    shortUrl: string;
    originalUrl: string;
}

export interface ILink extends ILinkMutation {
    id: string;
}