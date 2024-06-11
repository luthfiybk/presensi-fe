"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table-new";
import { Separator } from "@/components/ui/separator";
import { Status } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createStatusColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Status[];
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

export const StatusClient = ({ data, searchParams }: ProductsClientProps) => {
    const router = useRouter();
    const statusColumns = createStatusColumns()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    

    const total_data = data.length;
    const total_pages = Math.ceil(total_data / limit);

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Status  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <div className="space-x-3">
                    {/* <AddDialog name="nama_status" id="nama_status" title="Status" /> */}
                </div>
            </div>
            <Separator />
            <DataTable 
                searchKey="nama" 
                columns={statusColumns} 
                data={data} 
                pageNo={page}
                pageCount={total_pages}
                totalData={total_data}
            />
        </>
    );
};