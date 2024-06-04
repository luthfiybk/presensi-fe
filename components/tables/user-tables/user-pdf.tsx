import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { User } from "@/constants/data";

interface UserPdfProps {
    data: User[];
}

export const handlePrintUsers = ({data}: UserPdfProps) => {
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
                            content: "Daftar User",
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
                        "NIP",
                        "Nama User",
                        "Role",
                        "Divisi",
                        "Email",
                    ],
                ],
                body:
                    data.map((user) => [
                        user.nip || '',
                        user.nama || '',
                        user.role || '',
                        user.divisi || '',
                        user.email || '',
                    ]) || [],
                theme: "striped",
            });
    
        // Save the PDF
        doc.save("RekapUser.pdf");
};
