"use client"

import BreadCrumb from "@/components/breadcrumb";
import { TitikClient } from "@/components/tables/titik-tables/client";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Titik", link: "/admin/master-titik" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function TitikPage({ searchParams }: paramsProps) {
    const [titik, setTitik] = useState([]);
    const [totalData, setTotalData] = useState(0);

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';


    const fetchTitik = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/titik" + `?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : ''));
            const data = response.data.data;
            setTotalData(response.data.total_data);
            setTitik(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchTitik();

        document.title = "Master Titik"
    }, [name]);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <TitikClient data={titik} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    );
}