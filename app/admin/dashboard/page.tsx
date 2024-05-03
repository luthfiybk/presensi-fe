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

export default function DashboardPage() {
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5 md:p-8 pt-16">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Hi, Luthfi 👋
                    </h2>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="flex flex-col gap-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-md font-medium ">
                                        Jumlah User
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold ">20</div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col gap-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-md font-medium">
                                        Jumlah Karyawan
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">10</div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col gap-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-md font-medium">
                                        Jumlah Karyawan yang Presensi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">0</div>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col gap-1">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-md font-medium ">
                                        Jumlah Karyawan yang Izin
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold ">1</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex max-w-full md:grid-cols-2 lg:grid-cols-7">
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle>Jam</CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-end">
                                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} className="text-5xl font-extrabold" />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
    );
}