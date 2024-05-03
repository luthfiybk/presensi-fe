import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { adminItems } from "@/constants/data";

export const metadata: Metadata = {
    title: "Presensi - Admin",
    description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
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