"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Status } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createStatusColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Status[];
}

export const StatusClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();
    const statusColumns = createStatusColumns()

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
            <DataTable searchKey="status" columns={statusColumns} data={data} />
        </>
    );
};