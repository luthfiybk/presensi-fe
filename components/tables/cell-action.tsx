"use client";

import DetailKaryawanPage from "@/app/supervisor/data-karyawan/[nip]/page";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    User,
    Izin,
    Presensi,
    Divisi,
    Role,
    Status
} from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Children, useState } from "react";


interface CellActionProps {
    data: User | Izin | Presensi | Divisi | Role | Status;
    link?: string;
}

export const CellAction = ({ data, link }: CellActionProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            {/* <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        onClick={() => router.push(`${link}/${data.id ?? (data as User).nip}`)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            <div className="flex flex-column md:flex-row gap-1 items-center justify-center">
                <Button className="bg-orange-400 hover:bg-orange-300" onClick={() => router.push(`${link}/${data.id ?? (data as User).nip}`)}>
                    <Edit className=" h-3 w-3" />
                </Button>
                <Button className="bg-red-500 hover:bg-red-400" onClick={() => setOpen(true)}>
                    <Trash className=" h-3 w-3" />
                </Button>
            </div>
        </>
    );
};