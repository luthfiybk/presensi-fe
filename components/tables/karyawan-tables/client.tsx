"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createKaryawanColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintKaryawan } from "./karyawan-pdf";

interface ProductsClientProps {
    data: User[];
    path: string
}

export const KaryawanClient = ({ data, path }: ProductsClientProps) => {
    const router = useRouter();
    const karyawanColumns = createKaryawanColumns(path)
    const isAdmin = path === 'admin'
    const downloadPDF = () => {
        handlePrintKaryawan({ data });
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Karyawan (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
                <Button
                    className="bg-[#6DBE45] text-xs md:text-sm"
                    onClick={downloadPDF}
                >
                    <Icons.download className="mr-2 h-4 w-4" /> Download
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={karyawanColumns} data={data} />
        </>
    );
};