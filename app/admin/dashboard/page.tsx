"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Clock from 'react-live-clock';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth";

export default function DashboardPage() {
    const [response, setResponse] = useState([])
    const auth = useAuth()
    const [user, setUser]: any = useState(null)
    const [name, setName] = useState('')

    const fetchResponse = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/admin/")
            const data = response.data

            setResponse(data)
        } catch (error) {
            console.error("Fetch dashboard data error", error)
        }
    }

    useEffect(() => {
        fetchResponse()
        const nama = localStorage.getItem("user")?.slice(1, -1) ?? ""
        setName(nama)
    }, [])

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5 md:p-8 pt-16">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, {name} 👋
                    </h2>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {response.map((data: any) => (
                                <Card className="flex flex-col gap-1">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-md font-medium h-10">
                                            {data.kolom}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{data.total}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="flex max-w-full md:grid-cols-2 lg:grid-cols-7">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Jam</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-end">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} className="text-5xl font-extrabold" noSsr />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}