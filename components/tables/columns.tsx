"use client";

import { ColumnDef } from "@tanstack/react-table";
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

export const userColumns: ColumnDef<User>[] = [
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
        accessorKey: "name",
        header: "NAME",
    },
    {
        accessorKey: "company",
        header: "COMPANY",
    },
    {
        accessorKey: "role",
        header: "ROLE",
    },
    {
        accessorKey: "divisi",
        header: "DIVISI",
    },
    {
        header: "ACTIONS",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];

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
        cell: ({ row }) => <CellAction data={row.original} />,
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
        accessorKey: "id",
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
        accessorKey: "jam_masuk",
        header: "JAM MASUK",
    },
];

export const izinColumns: ColumnDef<Izin>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "NAMA",
    },
    {
        accessorKey: "keterangan",
        header: "KETERANGAN"
    },
    {
        accessorKey: "tanggal",
        header: "TANGGAL"
    },
    {
        accessorKey: "status",
        header: "STATUS"
    },
    {
        header: "ACTIONS",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    }
]


export const gedungColumns: ColumnDef<Gedung>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "nama_gedung",
        header: "NAMA GEDUNG"
    },
    {
        accessorKey: "latitude",
        header: "Latitude"
    },
    {
        accessorKey: "longitude",
        header: "Longitude"
    }
]

export const karyawanColumns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "NIP"
    },
    {
        accessorKey: "Nama",
        header: "Nama Karyawan"
    },
    {
        accessorKey: "divisi",
        header: "Divisi"
    },
    {
        header: "ACTIONS",
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    }
]