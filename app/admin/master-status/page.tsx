"use client"

import BreadCrumb from "@/components/breadcrumb";
import { StatusClient } from "@/components/tables/status-tables/client";
import { Status } from "@/constants/data";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Status", link: "/admin/master-status" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function StatusPage({ searchParams }: paramsProps) {
    const [status, setStatus] = useState([]);

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const group_status = searchParams.group || '';

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/status" + `?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : '') + (group_status ? `&group=${group_status}` : ''))
            const data = response.data;
            setStatus(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchStatus();
    }, [name, group_status]);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <StatusClient data={status} searchParams={searchParams} />
            </div>
        </>
    );
}