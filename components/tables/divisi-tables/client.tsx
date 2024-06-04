"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Divisi } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createDivisiColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Divisi[];
}

export const DivisiClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();
    const divisiColumns = createDivisiColumns();

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
            <DataTable searchKey="divisi" columns={divisiColumns} data={data} />
        </>
    );
};