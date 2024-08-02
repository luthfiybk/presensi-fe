"use client"
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { adminItems } from "@/constants/data";
import { useAuth } from "@/components/auth";
import { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { metadataAdmin } from "@/services/metadata"; // Adjust the path if needed

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const auth = useAuth()
    const router = useRouter()

    if (!auth.user) {
        return null
    }

    useEffect(() => {
        if(auth.user.roleId !== 1) {
            return router.push('/error')
        }
        if(auth.token === null) {
            router.push('/')
        }
    })

    return (
        <>
            <Header link="http://localhost:3000/admin/dashboard" items={adminItems} />
            <div className="flex h-full">
                <Sidebar items={adminItems} />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
}
