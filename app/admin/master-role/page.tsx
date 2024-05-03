import BreadCrumb from "@/components/breadcrumb";
import { RoleClient } from "@/components/tables/role-tables/client";
import { role } from "@/constants/data";

const breadcrumbItems = [{ title: "Master Role", link: "/admin/master-role" }];
export default function RolePage() {
    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <RoleClient data={role} />
            </div>
        </>
    );
}