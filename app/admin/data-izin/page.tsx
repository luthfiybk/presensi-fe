"use client"

import BreadCrumb from "@/components/breadcrumb"
import { IzinClient } from "@/components/tables/izin-tables/client"
import { izin } from "@/constants/data"
import axios from 'axios'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const breadcrumbItems = [{ title: "Izin Karyawan", link: "/admin/data-izin" }];
export default function IzinPage() {
    const [izin, setIzin] = useState([])
    const path = usePathname()

    const fetchIzin = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/izin/")
            const data = response.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                }
            })
            setIzin(mappedData)
        } catch (error) {
            console.error("Fetch izin error", error)
        }
    }

    useEffect(() => {
        fetchIzin()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <IzinClient data={izin} path={path} />
            </div>
        </>
    )
}