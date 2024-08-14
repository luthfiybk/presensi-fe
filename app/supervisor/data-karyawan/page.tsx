"use client"

import BreadCrumb from "@/components/breadcrumb";
import { KaryawanClient } from "@/components/tables/karyawan-tables/client";
// import { users } from "@/constants/data";
import axios from "axios"
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const breadcrumbItems = [{ title: "Karyawan", link: "/supervisor/karyawan" }];
type paramsProps = {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
export default function DataKaryawanPage({ searchParams }: paramsProps) {
    const [karyawan, setKaryawan] = useState([])
    const [totalData, setTotalData] = useState(0)
    const pathname = usePathname()

    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 10;
    const offset = (page - 1) * limit;
    const name = searchParams.search || '';

    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/supervisor/karyawan?limit=${limit}&offset=${offset}` + (name ? `&search=${name}` : ''), {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                }
            })
            const data = response.data.data

            setTotalData(response.data.total_data)
            setKaryawan(data)
        } catch (error) {
            console.error("Fetch karyawan error", error)
        }
    }

    useEffect(() => {
        fetchKaryawan()

        document.title = "Data Karyawan"
    }, [name])

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <KaryawanClient data={karyawan} path={pathname} searchParams={searchParams} total_data={totalData} />
            </div>
        </>
    );
}