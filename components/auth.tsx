"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"

type AuthContextType = {
    token: string | null;
    user: any;
    login: (token: any) => void;
    logout: () => void;
    fetchUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [token, setToken] = useState(Cookies.get("authToken") || null);
    const [user, setUser] = useState(null);

    const login = (token: any) => {
        setToken(token);
        Cookies.set("authToken", token, { expires: 7 });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        Cookies.remove("authToken");
        localStorage.removeItem("user");
    };

    const fetchUser = async () => {
        if (token && !user) {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL +  "/auth/session", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status}`);
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
        };

        fetchData();
    }, [token]); // Only fetch user data when the token changes

    return (
        <AuthContext.Provider value={{ token, user, login, logout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};