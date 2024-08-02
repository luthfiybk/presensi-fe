"use client"
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { supervisorItems } from "@/constants/data";
import { useEffect } from "react";
import { useAuth } from "@/components/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
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
        if (auth.user.roleId !== 3) {
            router.push('/error');
        }
        if (auth.token === null) {
            router.push("/");
        }
    });

    return (
        <>
            <Header link="http://localhost:3000/supervisor/dashboard" items={supervisorItems} />
            <div className="flex h-full">
                <Sidebar items={supervisorItems} />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
}