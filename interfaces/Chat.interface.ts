export interface IncomingChatModel{
    sid: string,
    rid: string,
    text: string
}

export interface OutgoingChatModel{
    id: number
    sid: string,
    rid: string,
    text: string,
    createdat: Date,
    updatedat: Date
}