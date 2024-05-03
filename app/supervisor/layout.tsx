import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { supervisorItems } from "@/constants/data";

export const metadata: Metadata = {
    title: "Presensi - Supervisor",
    description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
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