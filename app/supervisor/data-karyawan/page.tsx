"use client"

import BreadCrumb from "@/components/breadcrumb";
import { KaryawanClient } from "@/components/tables/karyawan-tables/client";
// import { users } from "@/constants/data";
import axios from "axios"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const breadcrumbItems = [{ title: "Karyawan", link: "/supervisor/karyawan" }];
export default function DataKaryawanPage() {
    const [karyawan, setKaryawan] = useState([])
    const pathname = usePathname()

    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/supervisor/karyawan")
            const data = response.data
            setKaryawan(data)
        } catch (error) {
            console.error("Fetch karyawan error", error)
        }
    }

    useEffect(() => {
        fetchKaryawan()
    }, [])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <KaryawanClient data={karyawan} path={pathname} />
            </div>
        </>
    );
}