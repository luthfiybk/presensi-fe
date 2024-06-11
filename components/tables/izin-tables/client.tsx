"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { Izin } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createIzinColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintIzin } from "./izin-pdf";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProductsClientProps {
    data: Izin[];
    path: string
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const IzinClient = ({ data, path, searchParams, total_data }: ProductsClientProps) => {
    const izinColumns = createIzinColumns(path)
    const downloadPDF = () => {
        handlePrintIzin({ data });
    };

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const statusId = searchParams.status || '';
    
    const total_pages = Math.ceil(total_data / limit);

    const [status, setStatus] = useState([])
    const [divisi, setDivisi] = useState([])

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/status/")
            const mappedResponse = response.data.filter((item: any) => item.group_status === 'Izin')
            setStatus(mappedResponse)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/")
            setDivisi(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchStatus()
        fetchDivisi()
    }, [])

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Izin  (${total_data})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                {path.includes('supervisor') && (
                <Button
                    className="bg-[#6DBE45] text-xs md:text-sm"
                    onClick={downloadPDF}
                >
                    <Icons.download className="mr-2 h-4 w-4" /> Download
                </Button>)}
            </div>
            <Separator />
            <DataTable 
                searchKey="nama" 
                columns={izinColumns} 
                data={data} 
                pageNo={page}
                status={status}
                divisions={divisi}
                totalData={total_data}
                pageCount={total_pages}
            />
        </>
    );
};