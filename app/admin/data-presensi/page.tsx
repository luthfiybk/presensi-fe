"use client"

import BreadCrumb from "@/components/breadcrumb";
import { PresensiClient } from "@/components/tables/presensi-tables/client";
import axios from "axios";
import { useState, useEffect } from "react";

const breadcrumbItems = [{ title: "Data Presensi", link: "/admin/data-presensi" }];
export default function DataPresensiPage() {
    const [presensi, setPresensi] = useState([])

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/presensi/")
            const data = response.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                    jamMasuk: (item.jamMasuk.slice(11, 16)),
                }
            })
            setPresensi(mappedData)
        } catch (error) {
            console.error("Fetch presensi error", error)
        }
    }

    useEffect(() => {
        fetchPresensi()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <PresensiClient data={presensi} />
            </div>
        </>
    )
}