import type {$Fetch, NitroFetchRequest} from 'nitropack';
import type { NewPost, Post } from '~/types/posts';

export const createPostsRepository = <T>(appFetch: $Fetch<T, NitroFetchRequest>) => {
    return {
        getPostsAll() {
            return appFetch<Post[]>('/posts');
        },
        getPostsMy() {
            return appFetch<Post[]>('/posts/my');
        },
        getPost(id: string | number) {
            return appFetch<Post>(`/posts/${id}`);
        },
        createPost(payload: NewPost) {
            return appFetch<any>('/posts', {
                method: 'POST',
                body: payload,
            });
        },
    };
};
  
