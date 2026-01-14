export type User = {
    name: string
    email: string
    age: number
    status: 'Verified' | 'Pending'
}

export const users: User[] = [
    {
        name: 'Mohamed Ahmed',
        email: 'mo.ahmed@example.com',
        age: 30,
        status: 'Verified',
    },
    {
        name: 'Nada Ali',
        email: 'nada.ali@example.com',
        age: 28,
        status: 'Verified',
    },
]
