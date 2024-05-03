import BreadCrumb from "@/components/breadcrumb";
import { DivisiClient } from "@/components/tables/divisi-tables/client";
import { divisi } from "@/constants/data";

const breadcrumbItems = [{ title: "Master Divisi", link: "/admin/master-divisi" }];
export default function DivisiPage() {
    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <DivisiClient data={divisi} />
            </div>
        </>
    );
}