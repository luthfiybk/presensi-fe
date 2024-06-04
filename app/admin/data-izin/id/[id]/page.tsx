"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Cookies from "js-cookie";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";

export default function DetailIzinPage() {
    const [izin, setIzin]: any = useState({})
    const [status, setStatus]: any = useState([])
    const { id } = useParams()

    const fetchIzin = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id)
            const data = response.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: new Date(item.tanggal).toLocaleDateString(),
                    nama_status: item.status === 1 ? "Disetujui" : item.status === 2 ? "Ditolak" : "Menunggu"
                }
            })
            setIzin(mappedData)
        } catch (error) {
            console.error("Fetch izin error", error)
        }
    }

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/izin/")
            const data = response.data
            setStatus(data)
        } catch (error) {
            console.error("Fetch status error", error)
        }
    
    }



    useEffect(() => {
        fetchIzin()
        fetchStatus()
    }, [])

    console.log(izin)

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl">
                    Detail Izin
                </Label>
            </div>
            <div className="flex flex-col pt-10 items-start mx-10">
                <div className="flex flex-col gap-7 w-3/4">
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            NIP
                        </Label>
                        <Label className="text-md">{izin?.[0]?.nip}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Nama
                        </Label>
                        <Label className="text-md">{izin?.[0]?.nama}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Tanggal Izin
                        </Label>
                        <Label className="text-md">{izin?.[0]?.tanggal}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Keterangan
                        </Label>
                        <Label className="text-md">{izin?.[0]?.keterangan}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            File
                        </Label>
                        <Button className="bg-gray-600 hover:bg-gray-400">
                            <Eye className="mr-4" />
                            Lihat File
                        </Button>
                    </div>
                </div>
            </div>
                <div className="flex flex-col gap-5 m-10">
                    <Label className="text-md">
                        Ingin rubah status izin?
                    </Label>
                    <Button className="bg-green-500 hover:bg-green-400">
                        Ya
                    </Button>
                </div>
        </>
    )
}