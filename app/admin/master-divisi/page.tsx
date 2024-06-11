"use client"

import BreadCrumb from "@/components/breadcrumb";
import { DivisiClient } from "@/components/tables/divisi-tables/client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Divisi } from "@/constants/data";


const breadcrumbItems = [{ title: "Master Divisi", link: "/admin/master-divisi" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function DivisiPage({ searchParams }: paramsProps) {
    const [divisi, setDivisi]: any = useState([]);
    const [totalData, setTotalData] = useState(0);

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';

    console.log(page, 'page')

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi" + `?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : ''));
            const data = response.data.data;
            
            setTotalData(response.data.total_data);
            setDivisi(data);
        } catch (error) {
            console.error("Fetch Divisi Error", error);
        }
    }

    useEffect(() => {
        fetchDivisi();
    }, [name, limit, offset, page]);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <DivisiClient data={divisi} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    );
}