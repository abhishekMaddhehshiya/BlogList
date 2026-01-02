
const BASE_URL = "http://localhost:3000/api/v1"

interface createBlogInputs {
    title: string,
    content: string,
}
interface generalOutputs{
    success: boolean,
    message: string
}

export interface getAllPostsOutputs {
    success: boolean,
    posts: ({
        author: {
            name: string | null;
        };
    } & {
        id: number;
        title: string;
        content: string | null;
        published: boolean;
        authorId: number;
    })[]


}
export interface getBlogOutputs {
    success: boolean,
    post: ({
        author: {
            name: string | null;
        };
    } & {
        id: number;
        title: string;
        content: string | null;
        published: boolean;
        authorId: number;
    })


}
interface getMyPostsOutputs {
    success: boolean,
    myPosts: {
        id: number;
        title: string;
        content: string | null;
        published: boolean;
        authorId: number;
    }[]

}

interface idData {
    postId: number
}



export async function CreateBlog(data: createBlogInputs,   token: string): Promise<generalOutputs>{
    const res = await fetch(`${BASE_URL}/post/create-post`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        authorization:"Bearer "+token || ""
        },
        credentials: "include",
        body: JSON.stringify(data),
    })
    const result = await res.json();
    if (!result.success) {
        throw new Error(result.message || "Can`t created!")
    }

    return result
}
export async function getAllBlogs(token: string): Promise<getAllPostsOutputs>{
    const res = await fetch(`${BASE_URL}/post/get-all-posts`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        authorization:"Bearer "+token || ""
        },
        credentials: "include",
    })
    const result = await res.json();
    
    if (!result.success) {
        throw new Error(result.message || "Something went wrong")
    }

    return result
}

export async function getBlog(token:string, id: string): Promise<getBlogOutputs>{
    const res = await fetch(`${BASE_URL}/post/get-post/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        authorization:"Bearer "+token || ""
        },
        credentials: "include",
    })
    const result = await res.json();
    
    if (!result.success) {
        throw new Error(result.message || "Something went wrong")
    }

    return result
}

export async function getMyBlogs(token: string): Promise<getMyPostsOutputs>{
    const res = await fetch(`${BASE_URL}/post/my-posts`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
    authorization:"Bearer "+token || ""
        },
        credentials: "include",
    })
    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message || "Something went wrong")
    }

    return result
}

export async function publishBlog(data: idData,   token: string): Promise<generalOutputs>{
    const res = await fetch(`${BASE_URL}/post/publish-post`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
         authorization:"Bearer "+token || ""
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message || "Something went wrong")
    }

    return result
}
export async function deleteBlog(data: idData,   token: string): Promise<generalOutputs>{
    const res = await fetch(`${BASE_URL}/post/delete-post`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
         authorization:"Bearer "+token || ""
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message || "Something went wrong")
    }

    return result
}

