"use client"

import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { NavItem } from "@/types";
import axios from "axios"
import Cookies from "js-cookie";
import { useAuth } from "@/components/auth";

interface ISidebarProps {
    items: NavItem[]
}

export default function Sidebar({items}: ISidebarProps) {
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
        <div>
            <nav
                className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72 justify-between`)}
            > 
                <div className="space-y-4 py-4 h-full flex-col justify-between hidden lg:block">
                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            <DashboardNav items={items} />
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <div className="space-y-1 absolute bottom-5">
                            <Link
                                    href="/"   
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
            </nav>
        </div>
    );
}