"use client"

import BreadCrumb from "@/components/breadcrumb";
import { PresensiClient } from "@/components/tables/presensi-tables/client";
import { presensi } from "@/constants/data";
import axios from "axios"
import { useState, useEffect } from "react";

export default function PresensiKaryawanPage() {
    const [presensi, setPresensi] = useState([])

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/supervisor/presensi")
            const data = response.data
            setPresensi(data)
        } catch (error: any) {
            console.error("Fetch presensi error", error.message)
        }
    }

    useEffect(() => {
        fetchPresensi()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={[{ title: "Presensi Karyawan", link: "/supervisor/presensi-karyawan" }]} />
                <PresensiClient data={presensi} />
            </div>
        </>
    )
}