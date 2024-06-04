"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
}

export const TitikClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();
    const titikColumns = createTitikColumns();
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
            <DataTable searchKey="" columns={titikColumns} data={data} />
        </>
    );
};