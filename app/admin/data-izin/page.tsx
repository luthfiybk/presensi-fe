"use client"

import BreadCrumb from "@/components/breadcrumb"
import { IzinClient } from "@/components/tables/izin-tables/client"
import axios from 'axios'
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const breadcrumbItems = [{ title: "Izin Karyawan", link: "/admin/data-izin" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function IzinPage({ searchParams }: paramsProps) {
    const [izin, setIzin] = useState([])
    const [totalData, setTotalData] = useState(0)
    const path = usePathname()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';
    const date = searchParams.date || '';
    const status = Number(searchParams.status) || '';
    const divisi = Number(searchParams.division) || '';

    const fetchIzin = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/izin?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : '') + (date ? `&date=${date}` : '') + (status ? `&status=${status}` : '') + (divisi ? `&division=${divisi}` : ''))
            const data = response.data.data
            const mappedData = data.map((item: any) => {
                return {
                    ...item,
                    tanggal: (item.tanggal.slice(0, 10)),
                }
            })

            setTotalData(response.data.total_data)
            setIzin(mappedData)
        } catch (error) {
            console.error("Fetch izin error", error)
        }
    }

    useEffect(() => {
        fetchIzin()
        document.title = "Data Izin"
    }, [name, date, status, divisi])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <IzinClient data={izin} path={path} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    )
}