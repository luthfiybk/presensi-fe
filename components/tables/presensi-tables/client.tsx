"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { Presensi } from "@/constants/data";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createPresensiColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintPresensi } from "./presensi-pdf";
import { useEffect, useState } from "react";
import axios from "axios";

interface ProductsClientProps {
    data: Presensi[];
    path: string
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const PresensiClient = ({ data, path, searchParams, total_data }: ProductsClientProps) => {
    const router = useRouter();
    const presensiColumns = createPresensiColumns(path);
    const downloadPDF = () => {
        handlePrintPresensi({ data });
    }

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const statusId = searchParams.status || '';
    const date = searchParams.date || '';

    const total_pages = Math.ceil(total_data / limit);

    const [status, setStatus] = useState([])
    const  [divisi, setDivisi] = useState([])

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/status/")
            const mappedResponse = response.data.filter((item: any) => item.group_status === 'Presensi')
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
                    title={`Presensi  (${total_data})`}
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
                columns={presensiColumns}
                totalData={total_data}
                pageCount={total_pages}
                pageNo={page}
                data={data}
                status={status} 
                divisions={divisi}
            />
        </>
    );
};