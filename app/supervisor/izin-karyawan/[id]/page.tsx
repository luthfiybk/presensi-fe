"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Cookies from "js-cookie";

export default function DetailIzinPage() {
    const [izin, setIzin]: any = useState({})
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

    const handleApprove = async () => {
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id + "/approve", 
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("authToken")}`,
                    }
                }
            )
            console.log(response)
        } catch (error) {
            console.error("Approve izin error", error)
        }
    }

    const handleReject = async () => {
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id + "/reject")
            console.log(response)
        } catch (error) {
            console.error("Reject izin error", error)
        }
    
    }


    useEffect(() => {
        fetchIzin()
    }, [])

    console.log(izin)

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl">
                    Detail Izin
                </Label>
            </div>
            <div className="flex mx-10 pt-5">
                <div className="flex flex-col">
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            Nama Karyawan
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            NIP
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            Tanggal Izin
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            Keterangan
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            File
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            {izin?.[0]?.nama}
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            {izin?.[0]?.nip}
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            {izin?.[0]?.tanggal}
                        </Label>
                    </div>
                    <div className="flex mt-5 mx-10">
                        <Label className="text-md">
                            {izin?.[0]?.keterangan}
                        </Label>
                    </div>
                </div>
            </div>
            {izin?.[0]?.statusId === 5 || izin?.[0]?.statusId === 6 ? (
                <div></div>
            ) : (
                <div className="flex flex-row mx-20 mt-10 space-x-5">
                    <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-400">
                        <Check className="mr-2" />
                        Setujui
                    </Button>
                    <Button onClick={handleReject} className="bg-red-500 hover:bg-red-400">
                        <X className="mr-2" />
                        Tolak
                    </Button>
                </div>
            )}
        </>
    )
}