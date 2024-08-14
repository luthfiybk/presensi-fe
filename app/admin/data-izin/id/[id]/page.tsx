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
import toast from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import PDFReader from "@/components/pdf";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";

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
    const [status, setStatus]: any = useState([])
    const [state, setState] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [changes, setChanges] = useState({
        statusId: null
    })

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
                }
            })
            setIzin(mappedData)
        } catch (error) {
            console.error("Fetch izin error", error)
        }
    }

    const fetchStatus = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/status/")
            const filteredResponse = response.data.filter((item: any) => item.group_status === 'Izin')
            console.log(filteredResponse)

            setStatus(filteredResponse)
        } catch (error) {
            console.error("Fetch status error", error)
        }
    }

    const handleValueChange = (value: any) => {
        const selectedStatus = status.find((item: any) => item.id === parseInt(value))
        setChanges({
            statusId: value
        })
        setSelectedStatus(selectedStatus?.nama_status || '')
    }

    const updateIzin = async () => {
        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/izin/" + id, changes)

            toast.success("Status izin berhasil diubah")
            router.push("/admin/data-izin")
        } catch (error) {
            console.error("Update izin error", error)
        }
    }

    useEffect(() => {
        fetchIzin()
        fetchStatus()

        document.title = "Detail Izin"
    }, [])

    console.log(changes)

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
                    <div className="flex justify-start items-center">
                        <Label className="text-md w-1/2">
                            File
                        </Label>
                        <Modal link={izin?.[0]?.file_link} />
                    </div>
                </div>
            </div>
            {state === false ? (
                <div className="flex flex-col gap-5 m-10">
                    <Label className="text-md">
                        Ingin rubah status izin?
                    </Label>
                    <Button onClick={() => setState(true)} className="bg-green-500 hover:bg-green-400">
                        Ya
                    </Button>
                </div>
            ) : (
                <>
                    <div className="flex justify-start items-center w-3/4 mx-10 mt-5 gap-7">
                        <Label className="text-md w-1/2">
                            Status
                        </Label>
                        <Select name="statusId" onValueChange={handleValueChange} defaultValue="">
                            <SelectTrigger>
                                <SelectValue placeholder={izin?.[0]?.nama_status}></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {status.map((item: any) => (
                                        <SelectItem key={item.id} value={item.id}>{item.nama}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={updateIzin} className="mx-10 mt-5 bg-orange-500 hover:bg-orange-400">
                        <Edit size={24} className="mr-2" />
                        Edit
                    </Button>
                </>
            )}
        </>
    )
}