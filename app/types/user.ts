export type UserAuthData = {
    login: string,
    password: string,
}

export type User = {
    id: number,
    login: string,
    createdAt: string,
    updatedAt: string,
}

export type LoginResponseData = {
    user: User,
    token: string,
}
