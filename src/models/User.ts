export type UserProfile = {
    name: string;
    email: string;
}

export type LoginResponse = {
    token: string;
    user: UserProfile;
}