"use client"

import { useState, useEffect, use } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent, SelectGroup } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Edit } from "lucide-react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function DetailUserPage() {
    const [user, setUser]: any = useState({})
    const [role, setRole]: any = useState([])
    const [divisi, setDivisi]: any = useState([])
    const [form, setForm]: any = useState([{
        nip: "",
        nama: "",
        email: "",
        roleId: null,
        divisiId: null
    }])
    const [divisiValue, setDivisiValue]: any = useState(null)
    const [selectedDivisiName, setSelectedDivisiName]: any = useState('')

    const { nip } = useParams()
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

    const fetchUser = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/user/${nip}`)
            setUser(response.data)
            setForm(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (e: any) => {
        const { name, value } = e.target
        setForm({ ...user[0], [name]: value })
    }

    const handleValueChange = (value: any) => {
        const selectedDivisi = divisi.find((item: any) => item.id === parseInt(value))
        setDivisiValue(value)
        setSelectedDivisiName(selectedDivisi?.nama || '')
    }

    const handleUpdate = async () => {
        try {
            const data = {
                nip: form.nip,
                nama: form.nama,
                email: form.email,
                roleId: parseInt(form.roleId),
                divisiId: parseInt(divisiValue) || null
            }

            const response = await axios.put(process.env.NEXT_PUBLIC_API_URL + `/user/${nip}`, data)

            toast.success('Berhasil mengupdate data user')
            router.push('/admin/user-mgmt')
        } catch (error) {
            toast.error('Gagal mengupdate data user')
        }
    }

    useEffect(() => {
        fetchUser()
        fetchDivisi()
        fetchRole()
    }, [])

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
                            <RadioGroup name="roleId" defaultValue={user?.[0]?.roleId} onChange={handleChange}>
                                {role.map((item: any) => (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem id={item.id} value={item.id} />
                                        <Label htmlFor={item.id}>{item.nama_role}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        {parseInt(form.roleId) !== 1 && (
                            <div className="flex justify-center items-center gap-7">
                                <Label className="text-md w-1/3">
                                    Divisi
                                </Label>
                                <Select name="divisiId" onValueChange={handleValueChange}>
                                    <SelectTrigger>
                                        <SelectValue /> {selectedDivisiName || user?.[0]?.nama_divisi || 'Pilih Divisi'}
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
                    <Button onClick={handleUpdate} className="mt-5 bg-orange-500 hover:bg-orange-400">
                        <Edit size={24} className="mr-2" />
                        Edit
                    </Button>
                </form>
            </div>
        </>
    )
}