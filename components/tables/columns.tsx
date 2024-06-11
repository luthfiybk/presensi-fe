"use client";

import { ColumnDef, flexRender } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { 
    User,
    Izin,
    Presensi,
    Divisi,
    Role,
    Status,
    Titik
} from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../ui/badge";

export const createUserColumns = (dynamicLink: string) => {
    const userColumns: ColumnDef<User>[] = [
        {
            accessorKey: "no",
            header: "NO",
            cell: ({ row }) => <>{row.index + 1}</>,
        },
        {
            accessorKey: "nama",
            header: "NAMA",
        },
        {
            accessorKey: "role",
            header: "ROLE",
            cell: ({ row }: any) => <Badge variant="secondary">{row.original.role}</Badge>,
        },
        {
            accessorKey: "divisi",
            header: "DIVISI",
            cell: ({ row }: any) => <>{row.original.divisi !== null ? row.original.divisi : '-'}</>,
        },
        {
            accessorKey: "email",
            header: "EMAIL",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        },
    ];

    return userColumns
}

export const createStatusColumns = () => {
    const statusColumns: ColumnDef<Status>[] = [
        {
            header: "NO",
            id: "no",
            cell: ({ row }) => <>{row.index + 1}</>,
        },
        {
            accessorKey: "nama",
            header: "NAMA STATUS",
        },
        {
            accessorKey: "group_status",
            header: "GROUP STATUS",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original}  />,
        }
    ]

    return statusColumns

}

export const createRoleColumns = () => {
    const roleColumns: ColumnDef<Role>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "nama_role",
            header: "NAMA ROLE",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />,
        }
    ]

    return roleColumns

}

export const createDivisiColumns = () => {
    const divisiColumns: ColumnDef<Divisi>[] = [
        {
            header: "NO",
            id: "no",
            cell: ({ row }) => <>{row.index + 1}</>,
        },
        {
            accessorKey: "nama",
            header: "NAMA DIVISI",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />,
        }
    ]

    return divisiColumns


}

export const createPresensiColumns = (dynamicLink: string) => {
    const presensiColumns: ColumnDef<Presensi>[] = [
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "nama",
            header: "NAMA",
        },
        {
            accessorKey: "tanggal",
            header: "TANGGAL",
        },
        {
            accessorKey: "jamMasuk",
            header: "JAM MASUK",
        },
        {
            accessorKey: "status",
            header: "STATUS",
            cell: ({ row }: any) => <Badge variant="secondary" className={row.original.statusId === 1 ? `bg-green-500 text-white hover:bg-green-500` : row.original.statusId === 3 ? `bg-red-500 text-white hover:bg-red-500` : row.original.statusId === 2 ? `bg-yellow-500 text-white hover:bg-yellow-500` : `bg-blue-500 text-white hover:bg-blue-500`} >{row.original.status}</Badge>,
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        }
    ]

    return presensiColumns

}

export const createIzinColumns = (dynamicLink: string) => {
    const izinColumns: ColumnDef<Izin>[] = [
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "nama",
            header: "NAMA",
        },
        {
            accessorKey: "keterangan",
            header: "KETERANGAN",
        },
        {
            accessorKey: "tanggal",
            header: "TANGGAL",
        },
        {
            accessorKey: "status",
            header: "STATUS",
            cell: ({ row }: any) => <Badge variant="secondary" className={row.original.statusId === 4 ? `text-black` : row.original.statusId === 5 ? `bg-green-500 text-white hover:bg-green-500` : `bg-red-500 text-white hover:bg-red-500`} >{row.original.status}</Badge>,
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        }
    ]

    return izinColumns
}



export const createTitikColumns = () => {
    const titikColumns: ColumnDef<Titik>[] = [
        {
            header: "NO",
            id: "no",
            cell: ({ row }) => <>{row.index + 1}</>,
        },
        {
            accessorKey: "nama",
            header: "NAMA TITIK",
        },
        {
            accessorKey: "latitude",
            header: "Latitude",
        },
        {
            accessorKey: "longitude",
            header: "Longitude",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} />,
        }
    ]

    return titikColumns

}

export const createKaryawanColumns = (dynamicLink: string) => {
    const karyawanColumns: ColumnDef<User>[] = [
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "nama",
            header: "Nama Karyawan",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "divisi",
            header: "Divisi",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        }
    ]

    return karyawanColumns
}