"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Edit } from "lucide-react"
import axios from "axios"
import { useParams } from "next/navigation"

export default function DetailUserPage() {
    const [user, setUser]: any = useState({})
    const [role, setRole]: any = useState([])
    const [divisi, setDivisi]: any = useState([])
    const [form, setForm]: any = useState([{
        nip: "",
        nama: "",
        email: "",
        roleId: "",
        divisiId: ""
    }])
    const { nip } = useParams()

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/")
            setDivisi(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRole = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/role/")
            setRole(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/user/${nip}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: any) => {
        setForm({ ...user, [e.target.name]: e.target.value })
    
    }

    useEffect(() => {
        fetchUser()
        fetchDivisi()
        fetchRole()
    }, [])

    console.log(form, 'form')

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl"> Detail Data User </Label>
            </div>
            <div className="flex flex-col pt-10 items-center justify-center">
                <form className="w-3/4">
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                NIP
                            </Label>
                            <Input className="text-md" name="nip" defaultValue={user?.[0]?.nip} onChange={handleChange} />
                        </div>
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                Nama
                            </Label>
                            <Input className="font-medium text-md" name="nama" defaultValue={user?.[0]?.nama} onChange={handleChange} />
                        </div>
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                Email
                            </Label>
                            <Input className="font-medium text-md" name="email" defaultValue={user?.[0]?.email} />
                        </div>
                        <div className="flex justify-normal items-center">
                            <Label className="text-md w-1/3 flex-start">
                                Role
                            </Label>
                            <RadioGroup defaultValue={user?.[0]?.roleId} onValueChange={handleChange}>
                                {role.map((item: any) => (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id={item.id} value={item.id} />
                                        <Label htmlFor={item.id}>{item.nama_role}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {user?.[0]?.nama_divisi !== null && (
                            <div className="flex justify-center items-center gap-7">
                                <Label className="text-md w-1/3">
                                    Divisi
                                </Label>
                                <Select name="divisiId">
                                    <SelectTrigger>
                                        <SelectValue  placeholder={user?.[0]?.nama_divisi} defaultValue={user?.[0]?.divisiId} onChange={handleChange}></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {divisi.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id}>{item.nama_divisi}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>   
                        )}
                    </div>
                    <Button className="mt-5 bg-orange-500 hover:bg-orange-400">
                        <Edit size={24} className="mr-2" />
                        Edit
                    </Button>
                </form>
            </div>
        </>
    )
}