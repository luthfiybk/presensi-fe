"use client"

import BreadCrumb from "@/components/breadcrumb";
import { TitikClient } from "@/components/tables/titik-tables/client";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Titik", link: "/admin/master-titik" }];
export default function TitikPage() {
    const [titik, setTitik] = useState([]);

    const fetchTitik = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/titik/");
            const data = response.data;
            setTitik(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchTitik();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <TitikClient data={titik} />
            </div>
        </>
    );
}