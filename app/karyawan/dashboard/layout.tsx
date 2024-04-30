import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <div className="flex h-full">
                <Sidebar />
                <main className="w-full pt-16">{children}</main>
            </div>
        </>
    );
}