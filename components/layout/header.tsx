import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { NavItem } from "@/types";

interface IHeaderProps {
    link: string;
    items: NavItem[];
}

export default function Header({ link, items }: IHeaderProps) {
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <Link
                        href={link}
                    >
                        <img src="/assets/logo-wpi.png" width={"45px"} />
                    </Link>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar items={items} />
                </div>

                <div className="flex items-center gap-2">
                    {/* <UserNav /> */}
                </div>
            </nav>
        </div>
    );
}