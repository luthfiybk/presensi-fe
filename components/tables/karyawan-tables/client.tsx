"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createKaryawanColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintKaryawan } from "./karyawan-pdf";

interface ProductsClientProps {
    data: User[];
    path: string
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const KaryawanClient = ({ data, path, searchParams, total_data }: ProductsClientProps) => {
    const router = useRouter();
    const karyawanColumns = createKaryawanColumns(path)
    const isAdmin = path === 'admin'
    const downloadPDF = () => {
        handlePrintKaryawan({ data });
    }

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    
    const total_pages = Math.ceil(total_data / limit);

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Karyawan (${total_data})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <Button
                    className="bg-[#6DBE45] text-xs md:text-sm"
                    onClick={downloadPDF}
                >
                    <Icons.download className="mr-2 h-4 w-4" /> Download
                </Button>
            </div>
            <Separator />
            <DataTable 
                searchKey="nama" 
                columns={karyawanColumns} 
                data={data} 
                pageNo={page}
                pageCount={total_pages}
                totalData={total_data}
            />
        </>
    );
};