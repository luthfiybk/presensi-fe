"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { status, Status } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { statusColumns } from "../columns";
import { Heading } from "@/components/ui/heading";

interface ProductsClientProps {
    data: Status[];
}

export const StatusClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Status  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <Button
                    className="text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/user/new`)}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="status" columns={statusColumns} data={data} />
        </>
    );
};