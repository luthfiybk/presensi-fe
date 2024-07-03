"use client";

import { useState, useEffect } from "react";
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
    Status,
    Titik
} from "@/constants/data";
import { Edit, MoreHorizontal, Trash, EyeIcon } from "lucide-react";
import { useRouter, useParams, usePathname } from "next/navigation";
import DialogComp from "../dialog";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionProps {
    data: User | Izin | Presensi | Divisi | Role | Status | Titik;
    link?: string;
}

export const CellAction = ({ data, link }: CellActionProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const trashIcon = path.includes('/admin/user-mgmt') || path.includes('/admin/master-divisi') || path.includes('/admin/master-titik');
    const editIcon = path.includes('/admin/master-status') || path.includes('/admin/master-role') || path.includes('/admin/master-divisi') || path.includes('/admin/master-titik');
    const title = path.includes('/admin/master-status') ? 'Status' : path.includes('/admin/master-role') ? 'Role' : path.includes('/admin/master-divisi') ? 'Divisi' : path.includes('/admin/master-titik') ? 'Titik' : 'User';
    const [changes, setChanges] = useState({
        ['nama_' + title.toLowerCase()]: (data as Role).nama_role ?? (data as Divisi).nama_divisi ?? (data as Status).nama_status ?? (data as Titik).nama_titik,
        latitude: title.toLowerCase() !== 'titik' ? '' : (data as Titik).latitude.toString(),
        longitude: title.toLowerCase() !== 'titik' ? '' : ((data as Titik).longitude).toString(),
        radius: title.toLowerCase() !== 'titik' ? '' : ((data as Titik).radius).toString()
    });

    const handleChange = (e: any) => {
        setChanges({ ...changes, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e: any) => {
        e.preventDefault();
        const form = {
            ['nama_' + title.toLowerCase()]: changes['nama_' + title.toLowerCase()],
            latitude: changes.latitude,
            longitude: changes.longitude,
            radius: changes.radius
        };

        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/${title.toLowerCase()}/${data.id}`, form);
            if (response.status === 200) {
                toast.success('Data berhasil diubah');
                setOpen(false);
                router.refresh();
            }
        } catch (error) {
            toast.error('Gagal mengubah data');
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        setChanges({ ...changes, latitude: lat.toString(), longitude: lng.toString() });
    };

    const handleDelete = async (id: any, e: any) => {
        try {
            e.preventDefault()
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${title.toLowerCase()}/${id}`);
            if(response.status === 200) {
                toast.success('Data berhasil dihapus');
            }
            router.refresh();
        } catch (error) {
            toast.error('Gagal menghapus data');
        }
    };

    useEffect(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <>
            <div className="flex flex-column md:flex-row gap-1 items-center justify-center">
                {!editIcon && (
                    <Button className="bg-cyan-500 hover:bg-cyan-300" onClick={() => router.push(`${link}/id/${data.id ?? (data as User).nip}`)}>
                        <EyeIcon className="h-3 w-3" />
                    </Button>
                )}
                {editIcon && (
                    <DialogComp 
                        isOpen={open}
                        isClose={setOpen}
                        id={data.id} 
                        name={path.includes('/admin/master-status') ? 'nama_status' : path.includes('/admin/master-role') ? 'nama_role' : path.includes('/admin/master-divisi') ? 'nama_divisi' : 'nama_titik'} 
                        defaultValue={(data as Role).nama_role ?? (data as Divisi).nama ?? (data as Status).nama_status ?? (data as Titik).nama}
                        update={handleUpdate}
                        changes={handleChange}
                        onMapClick={handleMapClick}
                        latitude={(data as Titik).latitude}
                        longitude={(data as Titik).longitude}
                        radius={(data as Titik).radius}
                    />
                )}
                {trashIcon && (
                    <Button className="bg-red-500 hover:bg-red-400" onClick={(e) => handleDelete((data as User).nip || data.id, e)}>
                        <Trash className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </>
    );
};
