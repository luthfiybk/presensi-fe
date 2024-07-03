"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogHeader } from "./ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { LoaderComponent } from "next/dynamic";


interface AddDialogProps {
    title: string
    name: string
    id: string
}

const Map = dynamic(() => import('./admin-gmaps'), {ssr: false})

export default function AddDialog({ title, name, id }: AddDialogProps ) {
    const [value, setValue] = useState({
        [name]: '',
        latitude: '',
        longitude: '',
        radius: ''
    })

    const router = useRouter();
    const path = usePathname()

    const handleChange = (e: any) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handleMapClick = (lat: number, lng: number) => {
        setValue({ ...value, latitude: lat.toString(), longitude: lng.toString()});
    };


    const handleAdd = async () => {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/${title.toLowerCase()}/`, value)

            toast.success('Data berhasil ditambahkan')
            window.location.reload()
        } catch (error) {
            toast.error('Data gagal ditambahkan')
        }
    }

    console.log(value, 'value')

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-400 text-xs md:text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Label className="text-lg text-center">
                        Nama {title} Baru
                    </Label>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <Input name={name} id={id} onChange={handleChange} placeholder="Nama" />
                    {title === 'Titik' ? (
                        <>
                            <Input name="latitude" id="latitude" value={value.latitude} onChange={handleChange} placeholder="latitude"/>
                            <Input name="longitude" id="longitude" value={value.longitude} onChange={handleChange} placeholder="longitude" />
                            <Input name="radius" id="radius" onChange={handleChange} placeholder="Radius" />
                        </>
                    ) : (<></>)}
                </div>
                {title === 'Titik' && <Map onMapClick={handleMapClick} />}
                <div className="flex justify-center space-x-3">
                    <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-400">
                        Tambah
                    </Button>
                    <DialogClose asChild>
                        <Button className="bg-gray-500 hover:bg-gray-400">
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}