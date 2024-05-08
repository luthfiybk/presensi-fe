"use client"

import BreadCrumb from "@/components/breadcrumb";
import Gmaps from "@/components/gmaps";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Clock from 'react-live-clock';

const breadcrumbItems = [{ title: "Presensi", link: "/karyawan/presensi" }];
export default function PresensiPage() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            error => {
                console.error('Error getting user location:', error);
            }
        )
    }, []);

    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                {/* <BreadCrumb items={breadcrumbItems} /> */}
                <div className="flex w-full justify-center">
                    <div className="flex flex-col gap-2 items-center">
                        <p>Jam</p>
                        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Jakarta'} />
                        <Gmaps width="400px" height="300px"/>
                        <form>
                            <input type="text" placeholder="Lokasi" value={latitude} className="w-2/3 bg-gray-200" id="latitude" hidden required/>
                            <input type="text" placeholder="Lokasi" value={longitude} className="w-2/3 bg-gray-200" id="longitude" hidden required/>
                        </form>
                        <Button className="w-2/3 bg-green-500">
                            Presensi
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}