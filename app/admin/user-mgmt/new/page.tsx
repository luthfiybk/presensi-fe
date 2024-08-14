"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {  PlusIcon } from "lucide-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function DetailUserPage() {
    const [user, setUser]: any = useState({
        nip: "",
        nama: "",
        email: "",
        password: "",
        roleId: null,
        divisiId: null
    })
    const [role, setRole]: any = useState([])
    const [divisi, setDivisi]: any = useState([])
    const [divisiValue, setDivisiValue]: any = useState(null)
    const [selectedDivisiName, setSelectedDivisiName]: any = useState('')
    const router = useRouter()

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/")
            setDivisi(response.data.data)
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

    const handleChange = async (e: any) => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }

    const handleValueChange = (value: any) => {
        const selectedDivisi = divisi.find((item: any) => item.id === parseInt(value))
        setDivisiValue(value)
        console.log(selectedDivisi)
        setSelectedDivisiName(selectedDivisi?.nama || '')
        setUser({...user, divisiId: parseInt(value)})
    }

    const handleAdd = async (e: any) => {
        try {
            e.preventDefault()
            const form = {
                nip: user.nip,
                nama: user.nama,
                email: user.email,
                password: user.password,
                roleId: parseInt(user.roleId),
                divisiId: parseInt(user.divisiId) || null
            }

            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/create", form)

            toast.success('Berhasil menambahkan user')
            router.push('/admin/user-mgmt')
        } catch (error: any) {
            toast.error('Gagal menambahkan user')
            console.error(error.message)
        }
    }

    console.log(divisi)

    useEffect(() => {
        fetchDivisi()
        fetchRole()

        document.title = "Tambah User"
    }, [])

    console.log(selectedDivisiName)

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl"> Tambah User </Label>
            </div>
            <div className="flex flex-col pt-10 items-center justify-center">
                <form className="w-3/4" >
                    <div className="flex flex-col gap-7">
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                NIP
                            </Label>
                            <Input className="text-md" id="nip" name="nip" onChange={handleChange} />
                        </div>
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                Nama
                            </Label>
                            <Input className="font-medium text-md" id="nama" name="nama" onChange={handleChange} />
                        </div>
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                Email
                            </Label>
                            <Input className="font-medium text-md" id="email" name="email" onChange={handleChange} />
                        </div>
                        <div className="flex justify-center items-center gap-7">
                            <Label className="text-md w-1/3">
                                Password
                            </Label>
                            <Input type="password" className="font-medium text-md" id="password" name="password" onChange={handleChange} />
                        </div>
                        <div className="flex justify-normal items-center">
                            <Label className="text-md w-1/3 flex-start">
                                Role
                            </Label>
                            <RadioGroup onChange={handleChange} id="roleId" name="roleId">
                                {role.map((item: any) => (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id={item.id} value={item.id} />
                                        <Label htmlFor={item.id}>{item.nama_role}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        {parseInt(user.roleId) !== 1 && (
                            <div className="flex justify-center items-center gap-7">
                                <Label className="text-md w-1/3">
                                    Divisi
                                </Label>
                                <Select onValueChange={handleValueChange}>
                                    <SelectTrigger>
                                        <SelectValue /> {selectedDivisiName || "Pilih Divisi"}
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {divisi.map((item: any) => (
                                                <SelectItem key={item.id} value={item.id}>{item.nama}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <Button onClick={handleAdd} className="mt-5 bg-blue-500 hover:bg-blue-400">
                        <PlusIcon size={24} className="mr-2" />
                        Tambah
                    </Button>
                </form>
            </div>
        </>
    )
}