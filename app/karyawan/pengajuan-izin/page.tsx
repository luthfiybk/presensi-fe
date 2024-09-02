"use client"

import BreadCrumb from "@/components/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios"
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const breadcrumbItems = [{ title: "Pengajuan Izin", link: "/karyawan/pengajuan-izin" }];
export default function PengajuanIzinPage() {
    const [form, setForm] = useState({
        keterangan: "",
        file: null
    })

    const router = useRouter()

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e: any) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append("keterangan", form.keterangan);
        if (form.file) {
            formData.append("file", form.file);
        }

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/izin/apply", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                }
            })

            if (response.status === 201) {
                toast.success("Pengajuan berhasil")
                router.push("/karyawan/pengajuan-izin")
            }

        } catch (error: any) {
            // alert("Pengajuan gagal")
            toast.error("Pengajuan gagal")
        }
    }

    useEffect(() => {
        document.title = "Pengajuan Izin"
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex max-w-full justify-start">
                    <div className="flex flex-col w-full gap-2 items-start">
                        <div className="flex flex-col w-full bg-white rounded-lg p-4 gap-3">
                            <h1 className="text-2xl font-bold text-center">Pengajuan Izin</h1>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* <div className="flex flex-col gap-2">
                                    <Label htmlFor="tanggal">Tanggal</Label>
                                    <Input type="date" id="tanggal" name="tanggal" className="border-black" />
                                </div> */}
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="keterangan">Keterangan</Label>
                                    <Textarea id="keterangan" onChange={handleChange} name="keterangan" rows={4} className="border-black" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="file">Bukti Izin*</Label>
                                    <Input type="file" id="file" onChange={handleFileChange} name="file" className="border-black" />
                                    <Label htmlFor="file" className="text-xs text-gray-400 italic">*Mohon upload dalam bentuk PDF</Label>
                                </div>
                                <button onClick={handleSubmit} type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
                                    Ajukan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}