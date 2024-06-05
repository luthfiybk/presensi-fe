"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUserColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { handlePrintUsers } from "./user-pdf";

interface ProductsClientProps {
    data: User[];
    path: string
}

export const UserClient = ({ data, path }: ProductsClientProps) => {
    const router = useRouter();
    const userColumns = createUserColumns(path)
    const downloadPDF = () => {
        handlePrintUsers({ data });
    };

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Users (${data.length})`}
                />
                <div className="space-x-3">
                    <Button
                        className="bg-[#6DBE45] text-xs md:text-sm"
                        onClick={downloadPDF}
                    >
                        <Icons.download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-400 text-xs md:text-sm"
                        onClick={() => router.push(`${path}/new`)}
                    >
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={userColumns} data={data} />
        </>
    );
};