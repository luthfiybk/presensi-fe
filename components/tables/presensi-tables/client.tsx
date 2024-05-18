"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Presensi } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { presensiColumns, statusColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";

interface ProductsClientProps {
    data: Presensi[];
}

export const PresensiClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Presensi  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <Button
                    className="bg-[#6DBE45] text-xs md:text-sm"
                    onClick={() => router.push(`/dashboard/user/new`)}
                >
                    <Icons.download className="mr-2 h-4 w-4" /> Download
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="" columns={presensiColumns} data={data} />
        </>
    );
};