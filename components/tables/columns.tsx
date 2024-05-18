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
    Gedung
} from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../ui/badge";

export const createUserColumns = (dynamicLink: string) => {
    const userColumns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "nama",
            header: "NAMA",
        },
        {
            accessorKey: "nama_role",
            header: "ROLE",
            cell: ({ row }: any) => <Badge variant="secondary">{row.original.nama_role}</Badge>,
        },
        {
            accessorKey: "nama_divisi",
            header: "DIVISI",
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        },
    ];

    return userColumns
}

export const statusColumns: ColumnDef<Status>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nama_status",
        header: "NAMA STATUS",
    },
    {
        header: "ACTIONS",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    }
];


export const roleColumns: ColumnDef<Role>[] = [
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
        cell: ({ row }) => <CellAction data={row.original}  />,
    }
];

export const divisiColumns: ColumnDef<Divisi>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nama_divisi",
        header: "NAMA DIVISI",
    },
    {
        header: "ACTIONS",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    }
];


export const presensiColumns: ColumnDef<Presensi>[] = [
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
];

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
            accessorKey: "nama_status",
            header: "STATUS",
            cell: ({ row }: any) => <Badge variant="secondary" className={row.original.statusId === 4 ? `text-black` : row.original.statusId === 5 ? `bg-green-500 text-white hover:bg-green-500` : `bg-red-500 text-white hover:bg-red-500`} >{row.original.nama_status}</Badge>,
        },
        {
            header: "ACTIONS",
            id: "actions",
            cell: ({ row }) => <CellAction data={row.original} link={dynamicLink} />,
        }
    ]

    return izinColumns
}



export const gedungColumns: ColumnDef<Gedung>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nama_gedung",
        header: "NAMA GEDUNG",
    },
    {
        accessorKey: "latitude",
        header: "Latitude",
    },
    {
        accessorKey: "longitude",
        header: "Longitude",
    }
]

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
            accessorKey: "nama_divisi",
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