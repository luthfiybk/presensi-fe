"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { Titik } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createTitikColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Titik[];
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
    total_data: number
}

export const TitikClient = ({ data, searchParams, total_data }: ProductsClientProps) => {
    const router = useRouter();
    const titikColumns = createTitikColumns();

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    

    const total_pages = Math.ceil(total_data / limit);

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Titik  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <div className="space-x-3">
                    <AddDialog name="nama_titik" id="nama_titik" title="Titik" />
                </div>
            </div>
            <Separator />
            <DataTable 
                searchKey="nama" 
                columns={titikColumns} 
                data={data} 
                pageNo={page}
                totalData={total_data}
                pageCount={total_pages}
            />
        </>
    );
};