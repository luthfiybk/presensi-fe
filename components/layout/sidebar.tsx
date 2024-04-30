import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { MobileSidebar } from "./mobile-sidebar";

export default function Sidebar() {
    return (
        <div>
            <nav
                className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72 justify-between`)}
            > 
                <div className="space-y-4 py-4 h-full flex-col justify-between hidden lg:block">
                    <div className="px-3 py-2">
                        <div className="space-y-1">
                            <DashboardNav items={navItems} />
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <div className="space-y-1 absolute bottom-5">
                            <Link
                                    href={"/logout"}
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