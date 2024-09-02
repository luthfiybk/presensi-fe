"use client"

import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const breadcrumbItems = [{ title: "User Management", link: "/admin/user-mgmt" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

export default function page({ searchParams }: paramsProps) {
    const [user, setUser] = useState([])
    const [totalData, setTotalData] = useState(0)
    const pathname = usePathname()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const role = Number(searchParams.role) || '';
    const divisi = Number(searchParams.division) || '';
    
    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user" + `?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : '') + (role ? `&role=${role}` : '') + (divisi ? `&division=${divisi}` : '' ), {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`
                }
            })
            const data = response.data.data

            setTotalData(response.data.total_data)
            setUser(data)
        } catch (error) {
            console.error("Fetch user error", error)
        }
    }

    useEffect(() => {
        fetchUser()

        document.title = "User Management"
    }, [limit, offset, name, role, divisi])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserClient data={user} path={pathname} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    );
}