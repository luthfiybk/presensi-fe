import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { User } from "@/constants/data";

interface KaryawanPdfProps {
    data: User[];
}

export const handlePrintKaryawan = ({ data }: KaryawanPdfProps) => {
    const doc = new jsPDF();
    
        autoTable(doc, {
            body: [
                    [
                        {
                            content: "PT Warung Pangan Indonesia",
                            styles: {
                            halign: "left",
                            fontSize: 15,
                            textColor: [0, 128, 0],
                            },
                        },
                        {
                            content: "Rekap Karyawan Divisi " + data[0].divisi ,
                            styles: {
                            halign: "right",
                            fontSize: 15,
                            },
                        },
                    ],
                ],
                theme: "plain",
            });
        
            autoTable(doc, {
                body: [
                        [
                            {
                                content:
                                "Tanggal Cetak : " +
                                new Date().getDate().toString().padStart(2, "0") +
                                " " +
                                [
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec",
                                ][new Date().getMonth()] +
                                " " +
                                new Date().getFullYear() +
                                " " +
                                new Date().getHours().toString().padStart(2, "0") +
                                ":" +
                                new Date().getMinutes().toString().padStart(2, "0"),
                                styles: {
                                halign: "left",
                                fontSize: 10,
                                },
                            },
                        ],
                    ],
                    theme: "plain",
                });
            
                autoTable(doc, {
                    head: [
                            [
                                "No",
                                "NIP",
                                "Nama",
                                "Email"
                            ],
                        ],
                        body: data.map((item, index) => [
                                index + 1,
                                item.nip || '',
                                item.nama || '',
                                item.email || ''
                        ]),
                    theme: "plain",
                });
                    
        doc.save(`RekapKaryawanDivisi${data[0].divisi}.pdf`);
}