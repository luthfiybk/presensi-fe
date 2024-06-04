"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

interface DialogCompProps {
    id: any;
    name: string;
    placeholder?: string;
    defaultValue: string;
    update: (e: any) => void;
    changes?: (e: any) => void;
    isOpen: any; 
    isClose: any;
    latitude?: any;
    longitude?: any;
    radius?: any
    onMapClick: (lat: number, lng: number) => void;
}

const Map = dynamic(() => import('./admin-gmaps'), {ssr: false})

export default function DialogComp({id, name, placeholder, defaultValue, update, changes, isOpen, isClose, radius, latitude, longitude, onMapClick }: DialogCompProps) {
    const path = usePathname();
    const title = path.includes('/admin/master-status') ? 'Status' : path.includes('/admin/master-role') ? 'Role' : path.includes('/admin/master-divisi') ? 'Divisi' : 'Titik';

    return (
        <>
            <Dialog onOpenChange={isClose} open={isOpen} modal>
                <DialogTrigger asChild>
                    <Button className="bg-orange-400 hover:bg-orange-300">
                        <Edit className=" h-3 w-3" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="flex items-center mb-2">
                        <Label className="text-lg">Edit {title}</Label>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-5">
                        <Label>Edit Nama {title}</Label>
                        <Input name={name} id={id} placeholder={placeholder} defaultValue={defaultValue} onChange={changes} />
                        {title === 'Titik' && (
                            <>
                                <Input name="latitude" id="latitude" placeholder="Latitude" defaultValue={latitude} onChange={changes} type="hidden" />
                                <Input name="longitude" id="longitude" placeholder="Latitude" defaultValue={longitude} onChange={changes} type="hidden" />
                                <Input name="radius" id="radius" placeholder="Radius" defaultValue={radius} onChange={changes} />
                                <Map onMapClick={onMapClick} latitude={latitude} longitude={longitude} />
                            </>
                        )}
                        <div className="flex gap-3">
                            <Button onClick={update} className="bg-orange-500 hover:bg-orange-400">
                                Edit
                            </Button>
                            <DialogClose asChild>
                                <Button className="bg-gray-500 hover:bg-gray-400 ">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}