"use client"

import BreadCrumb from "@/components/breadcrumb";
import { PresensiClient } from "@/components/tables/presensi-tables/client";
import axios from "axios"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function PresensiKaryawanPage({ searchParams }: paramsProps) {
    const [presensi, setPresensi] = useState([])
    const [totalData, setTotalData] = useState(0)
    const pathname = usePathname()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const status = searchParams.status || '';
    const date = searchParams.date || '';

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/supervisor/presensi?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : '') + (status ? `&status=${status}` : '') + (date ? `&date=${date}` : ''), {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                }
            })
            const data = response.data.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                }
            })

            setTotalData(response.data.total_data)
            setPresensi(mappedData)
        } catch (error: any) {
            console.error("Fetch presensi error", error.message)
        }
    }

    useEffect(() => {
        fetchPresensi()

        document.title = "Daftar Presensi Karyawan"
    }, [name, date, status])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={[{ title: "Presensi Karyawan", link: "/supervisor/presensi-karyawan" }]} />
                <PresensiClient data={presensi} path={pathname} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    )
}