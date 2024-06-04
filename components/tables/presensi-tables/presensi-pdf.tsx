import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Presensi } from "@/constants/data";

interface PresensiPdfProps {
    data: Presensi[];
}

export const handlePrintPresensi = ({ data }: PresensiPdfProps) => {
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
                            content: "Rekap Presensi",
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
                                "Nama",
                                "Tanggal",
                                "Jam Masuk",
                                "Keterangan",
                            ],
                        ],
                        body: data.map((item, index) => [
                                index + 1,
                                item.nama,
                                item.tanggal,
                                item.jamMasuk,
                                item.status
                        ]),
                    theme: "plain",
                });
                    
        doc.save("RekapPresensi.pdf");
}