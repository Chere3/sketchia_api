const endpoints = {
    auth: {
        register: "/v0/auth/register",
        login: "/v0/auth/login",
        profile: "/v0/auth/profile"
    },
    courses: {
        courses: "/v0/courses",
        course: "/v0/courses/:id",
        add_course: "/v0/courses/add",
        edit_course: "/v0/courses/edit",
        delete_course: "/v0/courses/delete"
    },
    index: {
        index: "/v0/",
        home: "/v0/home",
        not_found: "/v0/*"
    },
    users: {
        users: "/v0/users",
        user: "/v0/users/:id",
        add_user: "/v0/users/add",
        edit_user: "/v0/users/edit",
        delete_user: "/v0/users/delete"
    }
}

export type AcceptedFiles = string | NodeJS.ReadableStream | ArrayBuffer | ArrayBufferView | Blob | Buffer | File | FormData | ReadableStream<Uint8Array> | URLSearchParams


export type endpoints = typeof endpoints
export type valueOf<T> = T[keyof T]