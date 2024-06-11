"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { Divisi } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createDivisiColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Divisi[];
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const DivisiClient = ({ data, searchParams, total_data }: ProductsClientProps) => {
    const router = useRouter();
    const divisiColumns = createDivisiColumns();

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    
    const total_pages = Math.ceil(total_data / limit);

    console.log(total_data)
    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Divisi  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <div>
                    <AddDialog name="nama_divisi" id="nama_divisi" title="Divisi" />
                </div>
            </div>
            <Separator />
            <DataTable searchKey="nama" 
                columns={divisiColumns} 
                data={data}
                pageNo={page}
                totalData={total_data}
                pageCount={total_pages}
            />
        </>
    );
};