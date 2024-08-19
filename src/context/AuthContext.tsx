import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginResponse, UserProfile } from "../models/User";
import axiosClient from "../axios.client";

type AuthContextType = {
    user: UserProfile | null;
    token: string | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: () => boolean;
}

type Props = { children: React.ReactNode }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await axiosClient.post<LoginResponse>("auth/login", { email, password });
            const { token, user: responseUser } = response.data;
    
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(responseUser));
    
            setToken(token);
            setUser(responseUser);
    
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;

        }
    };
    

    const registerUser = async (name: string, email: string, password: string, confirm_password: string): Promise<boolean> => {
        try {
            const response = await axiosClient.post<LoginResponse>("auth/signup", { name, email, password, confirm_password });
            const { token, user: responseUser } = response.data;
    
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(responseUser));
    
            setToken(token);
            setUser(responseUser);
    
            return true;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };
    

    const isAuthenticated = () => !!token;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, registerUser, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
