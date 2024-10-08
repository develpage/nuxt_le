export type Post = {
    id: number,
    url: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    UserId: number,
    User?: PostUser,
}

export type PostUser = {
    id: number,
    login: string,
}

export type NewPost = Pick<Post, 'content' | 'url' | 'title' >
