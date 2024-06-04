"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Role } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createRoleColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";
import { PlusIcon } from "lucide-react";
import AddDialog from "@/components/AddDialog";

interface ProductsClientProps {
    data: Role[];
}

export const RoleClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();

    const roleColumns = createRoleColumns()

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Role  (${data.length})`}
                />
                <div className="space-x-3">
                <AddDialog name="nama_role" id="nama_role" title="Role" />
                </div>
            </div>
            <Separator />
            <DataTable searchKey="role" columns={roleColumns} data={data} />
        </>
    );
};