import axiosClient from "../axios.client";

export const loginUser = async (
    email,
    password
) => {
    try {
        const response = await axiosClient.post("login", { email, password });
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        return data;

    } catch( error ) {
        console.error('Login failed:', error);
    }
   
}
