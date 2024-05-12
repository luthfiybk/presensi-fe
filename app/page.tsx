"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth"

export default function Login() {
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    })

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const auth = useAuth()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            identifier: formData.identifier,
            password: formData.password,
        }

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", data)
            console.log(response.data)
            const token = response.data.token

            auth.login(token)

            await auth.fetchUser()

            if(response.data.roleId === 1) {
                router.push("/admin/dashboard")
            } else if (response.data.roleId === 2) {
                router.push("/karyawan")
            } else if (response.data.roleId === 3) {
                router.push("/supervisor/dashboard")
            } else {
                router.push("/login")
            }
        } catch (error) {
            alert("Login gagal")
        }
    }

    
    return (
        <div className="flex w-full max-h-full justify-center mt-40">
            <Card className="w-[350px] bg-slate-50">
                <CardHeader>
                    <img src="/assets/logo-wpi.png" width={"50px"} height={"50px"}/>
                    <CardTitle>Selamat Datang</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="identifier">NIP atau Email</Label>
                                <Input name="identifier" onChange={handleChange} id="identifier" placeholder="" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" onChange={handleChange} id="password" name="password" placeholder="" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    {/* <a className="text-xs" href="/register">Forgot password?</a> */}
                    <Button onClick={handleSubmit} type="submit" className="bg-[#6DBE45] hover:bg-[#91C539]">Login</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
