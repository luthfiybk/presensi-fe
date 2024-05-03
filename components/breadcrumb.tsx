import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import Link from "next/link";
import React from "react";

type BreadCrumbType = {
    title: string;
    link: string;
};

interface BreadCrumbPropsType  {
    items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
    return (
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
                href={"/karyawan/dashboard"}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
                Dashboard
            </Link>
            {items?.map((item: BreadCrumbType, index: number) => (
                <React.Fragment key={item.title}>
                    <Icons.chevronRight className="h-4 w-4" />
                    <Link
                        href={item.link}
                        className={cn(
                        "font-medium",
                        index === items.length - 1
                            ? "text-foreground pointer-events-none"
                            : "text-muted-foreground",
                        )}
                    >
                        {item.title}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    );
}