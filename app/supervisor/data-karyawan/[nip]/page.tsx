"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { Edit } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function DetailKaryawanPage() {
    const [karyawan, setKaryawan]: any = useState({})
    const [divisi, setDivisi]: any = useState([])
    const [role, setRole]: any = useState([])
    const { nip } = useParams()

    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user/" + nip)
            const data = response.data
            setKaryawan(data)
        } catch (error) {
            console.error("Fetch karyawan error", error)
        }
    }

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/")
            const data = response.data
            setDivisi(data)
        } catch (error) {
            console.error("Fetch divisi error", error)
        }
    }

    const fetchRole = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/role/")
            const data = response.data
            setRole(data)
        } catch (error) {
            console.error("Fetch role error", error)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            nip: karyawan?.[0]?.nip,
            nama: karyawan?.[0]?.nama,
            email: karyawan?.[0]?.email,
            role: karyawan?.[0]?.nama_role,
            divisi: karyawan?.[0]?.nama_divisi
        }

        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/user/" + nip, data)
            console.log(response.data)
        } catch (error) {
            console.error("Update karyawan error", error)
        }
    
    }

    useEffect(() => {
        fetchKaryawan()
        fetchDivisi()
        fetchRole()
    }, [])
    
    console.log(karyawan)

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl"> Detail Data User </Label>
            </div>
            <div className="flex flex-col pt-10 items-center justify-center">
                <form onSubmit={handleSubmit} className="w-3/4">
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-start">
                            <Label className="text-md w-1/5">
                                NIP
                            </Label>
                            <Label className="text-md">{karyawan?.[0]?.nip}</Label>
                        </div>
                        <div className="flex justify-start">
                            <Label className="text-md w-1/5">
                                Nama
                            </Label>
                            <Label className="text-md">{karyawan?.[0]?.nama}</Label>
                        </div>
                        <div className="flex justify-start">
                            <Label className="text-md w-1/5">
                                Email
                            </Label>
                            <Label className="text-md">{karyawan?.[0]?.email}</Label>
                        </div>
                        <div className="flex justify-start">
                            <Label className="text-md w-1/5 flex-start">
                                Role
                            </Label>
                            <Label className="text-md">{karyawan?.[0]?.nama_role}</Label>
                        </div>
                        <div className="flex justify-start">
                            <Label className="text-md w-1/5">
                                Divisi
                            </Label>
                            <Label className="text-md">{karyawan?.[0]?.nama_divisi}</Label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}