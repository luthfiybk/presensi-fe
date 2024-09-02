"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintUsers } from "./user-pdf";
import { useState, useEffect } from "react";
import axios from "axios"

interface ProductsClientProps {
    data: User[];
    path: string
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const UserClient = ({ data, path, searchParams, total_data }: ProductsClientProps) => {
    const router = useRouter();
    const userColumns = createUserColumns(path)
    const downloadPDF = () => {
        handlePrintUsers({ data });
    };

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    

    const total_pages = Math.ceil(total_data / limit);

    const [roles, setRoles] = useState([]);
    const [divisions,setDivisions] = useState([])

    const fetchRoles = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/role/")
            setRoles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDivisions = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/")
            setDivisions(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRoles()
        fetchDivisions()
    }, [])

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Users (${total_data - 1})`}
                />
                <div className="space-x-3">
                    <Button
                        className="bg-[#6DBE45] text-xs md:text-sm"
                        onClick={downloadPDF}
                    >
                        <Icons.download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-400 text-xs md:text-sm"
                        onClick={() => router.push(`${path}/new`)}
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable 
                searchKey="nama"
                pageNo={page}
                totalData={total_data}
                pageCount={total_pages}
                columns={userColumns}
                data={data}
                roles={roles}
                divisions={divisions} 
            />
        </>
    );
};