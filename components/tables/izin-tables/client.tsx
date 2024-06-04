"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Izin } from "@/constants/data";
import { useRouter } from "next/navigation";
import { createIzinColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintIzin } from "./izin-pdf";

interface ProductsClientProps {
    data: Izin[];
    path: string
}

export const IzinClient = ({ data, path }: ProductsClientProps) => {
    const izinColumns = createIzinColumns(path)
    const downloadPDF = () => {
        handlePrintIzin({ data });
    };

    console.log(data)

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Izin  (${data.length})`}
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
            <DataTable searchKey="izin" columns={izinColumns} data={data} />
        </>
    );
};