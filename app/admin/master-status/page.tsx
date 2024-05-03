import BreadCrumb from "@/components/breadcrumb";
import { StatusClient } from "@/components/tables/status-tables/client";
import { status } from "@/constants/data";

const breadcrumbItems = [{ title: "Master Status", link: "/admin/master-status" }];
export default function StatusPage() {
    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <StatusClient data={status} />
            </div>
        </>
    );
}