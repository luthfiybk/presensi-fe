import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Izin } from "@/constants/data";

interface IzinPdfProps {
    data: Izin[];
}

export const handlePrintIzin = ({ data }: IzinPdfProps) => {
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
                            content: "Rekap Izin",
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
                                new Date().getMinutes().toString().padStart(2, "0") +
                                ":" +
                                new Date().getSeconds().toString().padStart(2, "0"),
                                styles: {
                                halign: "left",
                                },
                            },
                        ],
                    ],
                theme: "plain",
            });
    
            autoTable(doc, {
                head: [
                    [
                        "Nama",
                        "Keterangan",
                        "Tanggal",
                        "Status",
                    ],
                ],
                body:
                    data.map((izin) => [
                        izin.nama || '',
                        izin.keterangan || '',
                        izin.tanggal || '',
                        izin.status || '',
                    ]) || [],
                theme: "striped",
            });
    
        // Save the PDF
        doc.save("RekapIzin.pdf");
}