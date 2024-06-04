"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Presensi } from "@/constants/data";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createPresensiColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintPresensi } from "./presensi-pdf";

interface ProductsClientProps {
    data: Presensi[];
    path: string
}

export const PresensiClient = ({ data, path }: ProductsClientProps) => {
    const router = useRouter();
    const presensiColumns = createPresensiColumns(path);
    const downloadPDF = () => {
        handlePrintPresensi({ data });
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Presensi  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                {path.includes('supervisor') && (
                <Button
                    className="bg-[#6DBE45] text-xs md:text-sm"
                    onClick={downloadPDF}
                >
                    <Icons.download className="mr-2 h-4 w-4" /> Download
                </Button>)}
            </div>
            <Separator />
            <DataTable searchKey="" columns={presensiColumns} data={data} />
        </>
    );
};