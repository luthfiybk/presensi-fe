"use client"

import BreadCrumb from "@/components/breadcrumb";
import { RoleClient } from "@/components/tables/role-tables/client";
import { useState, useEffect } from "react";
import axios from "axios"

const breadcrumbItems = [{ title: "Master Role", link: "/admin/master-role" }];
export default function RolePage() {
    const [role, setRole] = useState([]);

    const fetchRole = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/role/");
            const data = response.data;
            setRole(data);
        } catch (error) {
            console.error("Fetch Role Error", error);
        }
    }

    useEffect(() => {
        fetchRole();
    }, []);


    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <RoleClient data={role} />
            </div>
        </>
    );
}