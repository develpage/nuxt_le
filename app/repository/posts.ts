import type { NewPost, Post } from '~/types/posts';

export const usePostsRepository = () => {
    async function getPostsAll() {
        const {data} = await useAPI<Post[]>('/posts');

        return data;
    } 

    async function getPostsMy() {
        const {data} = await useAPI<Post[]>('/posts/my');

        return data;
    } 

    async function getPost(id: string | number) {
        const {data} = await useAPI<Post>(`/posts/${id}`);

        return data;
    } 

    async function createPost(payload: NewPost) {
        const {data} = await useAPI<Post>('/posts/', {method: 'POST', body: JSON.stringify(payload)});

        return data;
    } 

    return {
        getPostsAll,
        getPostsMy,
        getPost,
        createPost,
    };
};

export interface LoginResponseData {
    user: UserData;
    token: string;
}

export interface UserData {
    id: number
    login: string
    createdAt: string
    updatedAt: string
}
  
