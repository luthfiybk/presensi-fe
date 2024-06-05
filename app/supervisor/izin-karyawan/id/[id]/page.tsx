"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import PDFReader from "@/components/pdf";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DialogProps {
    link: string
}

function Modal({ link }: DialogProps) {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button className="bg-blue-500 hover:bg-blue-400">
                        <Eye className="mr-4" />
                        Lihat File
                    </Button>
                </DialogTrigger>
                <DialogContent className="h-5/6 w-full sm:h-3/4" suppressHydrationWarning>
                    <div className="mt-5 pb-28 h-1/4">
                        <PDFReader fileUrl={link} />
                    </div>
                    <DialogClose>
                        <Button className="bg-red-500 hover:bg-red-400">
                            <X className="mr-4" />
                            Tutup
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default function DetailIzinPage() {
    const [izin, setIzin]: any = useState({})
    const { id } = useParams()
    const router = useRouter()

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
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id + "/approve", {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("authToken")}`,
                    }
                }
            )
            console.log(response)
            toast.success("Izin berhasil disetujui")
            router.push("/supervisor/izin-karyawan")
        } catch (error) {
            console.error("Approve izin error", error)
        }
    }

    const handleReject = async () => {
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id + "/reject", {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                }
            })
            console.log(response)
            toast.success("Izin berhasil ditolak")
            router.push("/supervisor/izin-karyawan")
        } catch (error) {
            console.error("Reject izin error", error)
        }
    
    }

    useEffect(() => {
        fetchIzin()
    }, [])

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
                        <Modal link={izin?.[0]?.file_link} />
                    </div>
                </div>
            </div>
            {izin?.[0]?.statusId === 4 && (
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