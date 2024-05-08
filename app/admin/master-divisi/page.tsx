"use client"

import BreadCrumb from "@/components/breadcrumb";
import { DivisiClient } from "@/components/tables/divisi-tables/client";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Divisi", link: "/admin/master-divisi" }];
export default function DivisiPage() {
    const [divisi, setDivisi] = useState([]);

    const fetchDivisi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/divisi/");
            const data = response.data;
            setDivisi(data);
        } catch (error) {
            console.error("Fetch Divisi Error", error);
        }
    }

    useEffect(() => {
        fetchDivisi();
    }, []);

    console.log(divisi)

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <DivisiClient data={divisi} />
            </div>
        </>
    );
}