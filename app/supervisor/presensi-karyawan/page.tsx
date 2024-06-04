"use client"

import BreadCrumb from "@/components/breadcrumb";
import { PresensiClient } from "@/components/tables/presensi-tables/client";
import axios from "axios"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PresensiKaryawanPage() {
    const [presensi, setPresensi] = useState([])
    const pathname = usePathname()

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/supervisor/presensi")
            const data = response.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                }
            })
            setPresensi(mappedData)
        } catch (error: any) {
            console.error("Fetch presensi error", error.message)
        }
    }

    useEffect(() => {
        fetchPresensi()
    }, [])

    console.log(presensi)

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={[{ title: "Presensi Karyawan", link: "/supervisor/presensi-karyawan" }]} />
                <PresensiClient data={presensi} path={pathname} />
            </div>
        </>
    )
}