"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Role } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { roleColumns } from "../columns";
import { Heading } from "@/components/ui/heading";
import { Icons } from "@/components/icons";

interface ProductsClientProps {
    data: Role[];
}

export const RoleClient = ({ data }: ProductsClientProps) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={`Role  (${data.length})`}
                    // description="Manage users (Client side table functionalities.)"
                />
            </div>
            <Separator />
            <DataTable searchKey="role" columns={roleColumns} data={data} />
        </>
    );
};