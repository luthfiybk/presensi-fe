"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import PDFReader from "@/components/pdf";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Gmaps from "@/components/gmaps";
import { Badge } from "@/components/ui/badge";

export default function DetailPresensiPage() {
    const [presensi, setPresensi]: any = useState({})
    const { id } = useParams()

    const fetchPresensi = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/presensi/" + id);
            const data = response.data;
            setPresensi(data);
        } catch (error) {
            console.error("Fetch Status Error", error);
        }
    }

    useEffect(() => {
        fetchPresensi();

        document.title = "Detail Presensi"
    }, [])

    console.log(presensi)

    return (
        <>
            <div className="flex mt-10 mx-10">
                <Label className="text-2xl">
                    Detail Presensi
                </Label>
            </div>
            <div className="flex flex-col pt-10 items-start mx-10">
                <div className="flex flex-col gap-7 w-3/4">
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            NIP
                        </Label>
                        <Label className="text-md">{presensi?.[0]?.nip}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Nama
                        </Label>
                        <Label className="text-md">{presensi?.[0]?.nama}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Tanggal Presensi
                        </Label>
                        <Label className="text-md">{presensi?.[0]?.tanggal}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Jam Masuk
                        </Label>
                        <Label className="text-md">{presensi?.[0]?.jamMasuk}</Label>
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Status
                        </Label>
                        <Badge className={presensi?.[0]?.status === "Tepat Waktu" ? "bg-green-500" : presensi?.[0]?.status === "Terlambat" ? "bg-yellow-500" : 'bg-red-500'}>{presensi?.[0]?.status}</Badge>
                        {/* <Label className="text-md">{presensi?.[0]?.status}</Label> */}
                    </div>
                    <div className="flex justify-start">
                        <Label className="text-md w-1/2">
                            Titik Absensi
                        </Label>
                        <Gmaps width="400px" height="200px" latitude={presensi?.[0]?.latitude} longitude={presensi?.[0]?.longitude} />
                    </div>
                </div>
            </div>
        </>
    )
}