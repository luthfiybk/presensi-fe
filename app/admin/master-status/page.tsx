"use client"

import BreadCrumb from "@/components/breadcrumb";
import { StatusClient } from "@/components/tables/status-tables/client";
import { status } from "@/constants/data";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Status", link: "/admin/master-status" }];
export default function StatusPage() {
    const [status, setStatus] = useState([]);

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/status/");
            const data = response.data;
            setStatus(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <StatusClient data={status} />
            </div>
        </>
    );
}