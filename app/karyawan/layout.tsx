"use client"

import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { karyawanItems } from "@/constants/data";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth";
import { useEffect } from "react";
import { metadataKaryawan } from "@/services/metadata";

export default function PresensiLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
        return null;
    }

    useEffect(() => {
        if (auth.user.roleId !== 2) {
            router.push('/error');
        }
        if (auth.token === null) {
            router.push("/");
        }
    });
    return (
        <>
            <Header link="http://localhost:3000/karyawan/dashboard" items={karyawanItems} />
            <div className="flex h-full">
                <Sidebar items={karyawanItems} />
                <main className="w-full pt-16 h-full">{children}</main>
            </div>
        </>
    );
}