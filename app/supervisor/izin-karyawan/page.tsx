"use client"

import BreadCrumb from "@/components/breadcrumb"
import { IzinClient } from "@/components/tables/izin-tables/client"
import { izin } from "@/constants/data"
import axios from "axios"
import { useState, useEffect } from "react"

export default function IzinKaryawanPage() {
    const [izin, setIzin] = useState([])

    const fetchIzin = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/supervisor/izin")
            const data = response.data
            setIzin(data)
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
                <IzinClient data={izin} />
            </div>
        </>
    )
}