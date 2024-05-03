import BreadCrumb from "@/components/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const breadcrumbItems = [{ title: "Pengajuan Izin", link: "/karyawan/pengajuan-izin" }];
export default function PengajuanIzinPage() {
    return (
        <>
            <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <div className="flex max-w-full justify-start">
                    <div className="flex flex-col w-full gap-2 items-start">
                        <div className="flex flex-col w-full bg-white rounded-lg p-4 gap-3">
                            <h1 className="text-2xl font-bold text-center">Pengajuan Izin</h1>
                            <form className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="tanggal">Tanggal</Label>
                                    <Input type="date" id="tanggal" name="tanggal" className="border-black" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="keterangan">Keterangan</Label>
                                    <Textarea id="keterangan" name="keterangan" rows={4} className="border-black" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="tanggal">Bukti Izin</Label>
                                    <Input type="file" id="tanggal" name="tanggal" className="border-black" />
                                </div>
                                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">
                                    Ajukan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}