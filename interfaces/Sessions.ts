
export interface Sessions {
    IPAddress: string,
    userAgent: string,
    userId: string
}

export interface TokenPayload {
    userId: string,
    sessionId: string,
    iat: number,
    exp: number,
    iss: string
}