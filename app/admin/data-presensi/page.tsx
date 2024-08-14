"use client"

import BreadCrumb from "@/components/breadcrumb";
import { PresensiClient } from "@/components/tables/presensi-tables/client";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const breadcrumbItems = [{ title: "Data Presensi", link: "/admin/data-presensi" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function DataPresensiPage({ searchParams }: paramsProps) {
    const [presensi, setPresensi] = useState([])
    const [totalData, setTotalData] = useState(0)
    const pathname = usePathname()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const date = searchParams.date || '';
    const status = Number(searchParams.status) || '';
    const divisi = Number(searchParams.division) || '';

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/presensi?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : '') + (date ? `&date=${date}` : '') + (status ? `&status=${status}` : '') + (divisi ? `&division=${divisi}` : ''))
            const data = response.data.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                }
            })

            setTotalData(response.data.total_data)
            setPresensi(mappedData)
        } catch (error) {
            console.error("Fetch presensi error", error)
        }
    }

    useEffect(() => {
        fetchPresensi()

        document.title = "Data Presensi"
    }, [name, date, status, divisi, limit, offset])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <PresensiClient data={presensi} path={pathname} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    )
}