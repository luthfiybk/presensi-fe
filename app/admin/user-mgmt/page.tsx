"use client"

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const breadcrumbItems = [{ title: "User Management", link: "/admin/user-mgmt" }];
export default function UserManagementPage() {
    const [user, setUser] = useState([])
    const pathname = usePathname()
    
    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/")
            const data = response.data
            setUser(data)
        } catch (error) {
            console.error("Fetch user error", error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserClient data={user} path={pathname} />
            </div>
        </>
    );
}