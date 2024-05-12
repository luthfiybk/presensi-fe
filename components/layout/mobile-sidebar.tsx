"use client";

import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { NavItem } from "@/types";
import { useAuth } from "@/components/auth";
import axios from "axios";
import Cookies from "js-cookie";

interface IMobileSidebarProps {
    items: NavItem[]
}

export function MobileSidebar({ items }: IMobileSidebarProps) {
    const [open, setOpen] = useState(false);

    const auth = useAuth()

    const handleLogout = (e: any) => {
        try {
            const response = axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`
                }
            })

            auth.logout()
        } catch (error) {
            alert("Logout gagal")
        }
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="space-y-1">
                                <DashboardNav items={items} setOpen={setOpen} />
                            </div>
                        </div>
                        <div className="px-3 py-2">
                            <div className="space-y-1 absolute bottom-5">
                                <Link
                                        href={"/"}
                                        onClick={handleLogout}
                                    >
                                    <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground text-red-500">
                                        <Icons.logout className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}