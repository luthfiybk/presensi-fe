"use client"

import BreadCrumb from "@/components/breadcrumb";
import { GedungClient } from "@/components/tables/gedung-tables/client";
import { useState, useEffect } from "react";
import axios from "axios";

const breadcrumbItems = [{ title: "Master Gedung", link: "/admin/master-gedung" }];
export default function GedungPage() {
    const [gedung, setGedung] = useState([]);

    const fetchGedung = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/gedung/");
            const data = response.data;
            setGedung(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchGedung();
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <GedungClient data={gedung} />
            </div>
        </>
    );
}