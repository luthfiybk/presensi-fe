"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth"
import React, { useEffect } from "react"

interface PrivateRouteProps {
    element: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { user, fetchUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser()
        }

        fetchData()
    }, [fetchUser])


    if (!user) {
        router.push('/');
        return null;
    }
    
    return element;
}

export default PrivateRoute