/**
 * Вспомогательный интерфейс для объекта "пост"
 */
export interface PostDTO {
    userId: number
    id: number
    title: string
    body: string
};

/**
 * Вспомогательный интерфейс для объекта "комментарий"
 */
export interface CommentDTO {
    postId: number
    id: number
    name: string 
    email: string
    body: string
};

/**
 * Вспомогательный интерфейс для объекта "пользователь"
 */
export interface UserDTO {
    id: number
    name: string
    username: string
    email: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
        geo: {
            lat: string
            lng: string
        }
    }
    phone: string
    website: string
    company: {
        name: string
        catchPhrase: string
        bs: string
    }
};

/**
 * Класс для работы с АПИ, который необходимо немного доработать
 */
export class Api {
    basePath = "";

    constructor() {
        this.basePath = "https://jsonplaceholder.typicode.com/";
    }

    /**
     * 
     * Базовый и минимально достаточный метод для выполнения запросов к Api 
     * 
     * @example Пример использования:
     * ```typescript
     * methodForGetSomeVeryImportantData() {
     *      return this.baseFetch('endpointForVeryImportantData');
     * }
     * ```
     * 
     * @param url Путь, по которому выполняется запрос, он должен быть относительным к this.basePath
     * @param method Метод запроса, по умлочанию `GET`
     * @param body (Опционально) Тело запроса в виде объекта
     * @returns Данные типа `T`, чтобы быть уверенным в том какие данные должны прийти необходимо использовать следующим образом: `this.baseFetch<PostDTO[]>` - данная конструкция означает, что метод `baseFetch` вернёт массив объектов с типом PostDTO
     * @throws Текст ошибки
     */
    async baseFetch<T> (
        url: string,
        method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'GET',
        body?: Record<string, unknown>
    ): Promise<T> {

        const fetchParams: RequestInit = { method };

        if (body) {
            fetchParams.body = JSON.stringify(body);
            fetchParams.headers = { 'Content-Type': 'application/json' };
        }

        const response = await fetch(this.basePath + url, fetchParams);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }

        return response.json();
    } 

    getPosts(): Promise<PostDTO[]> {
        return this.baseFetch<PostDTO[]>('posts');
    };

    getPostByPostId(postId: number): Promise<PostDTO> {
        return this.baseFetch<PostDTO>(`posts/${postId}`);
    };

    createPost(post: PostDTO): Promise<{id: number}> {
        return this.baseFetch<{id: number}>('posts', 'POST', { ...post });
    };

    getComments(): Promise<CommentDTO[]> {
        return this.baseFetch<CommentDTO[]>('comments');
    };
    
    getCommentByCommentId(commentId: number): Promise<CommentDTO> {
        return this.baseFetch<CommentDTO>(`comments/${commentId}`);
    };

    getUsers(): Promise<UserDTO[]> {
        return this.baseFetch<UserDTO[]>('users');
    };
};