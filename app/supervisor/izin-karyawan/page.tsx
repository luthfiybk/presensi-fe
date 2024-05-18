"use client"

import BreadCrumb from "@/components/breadcrumb"
import { IzinClient } from "@/components/tables/izin-tables/client"
import { izin } from "@/constants/data"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function IzinKaryawanPage() {
    const [izin, setIzin] = useState([])
    const pathname = usePathname()

    const fetchIzin = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/supervisor/izin")
            const data = response.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10))
                }
            })
            setIzin(mappedData)
        } catch (error: any) {
            console.error("Fetch izin error", error.message)
        }
    }

    useEffect(() => {
        fetchIzin()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={[{ title: "Izin Karyawan", link: "/supervisor/izin-karyawan" }]} />
                <IzinClient data={izin} path={pathname} />
            </div>
        </>
    )
}