"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Divisi } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { divisiColumns } from "../columns";
import { Heading } from "@/components/ui/heading";

interface ProductsClientProps {
    data: Divisi[];
}

export const DivisiClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Divisi  (${data.length})`}
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
            <DataTable searchKey="divisi" columns={divisiColumns} data={data} />
        </>
    );
};