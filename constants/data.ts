import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
    id: string;
    nip: string
    nama: string;
    email?: string;
    role?: string;
    divisi?: string;
    status: string;
};

export type Izin = {
    id: number;
    nama: string;
    keterangan: string;
    tanggal: string;
    status: string;

};

export type Presensi = {
    id: string;
    nama: string;
    tanggal: string;
    jamMasuk: string;
    jamKeluar: string;
    latitude: number;
    longitude: number;
    status: string;
};

export type Divisi = {
    id: number;
    nama_divisi: string;
};

export type Role = {
    id: number;
    nama_role: string;
};

export type Status = {
    id: string;
    nama_status: string;
};

export type Titik = {
    id: number;
    nama_titik: string;
    latitude: number;
    longitude: number;
    radius: number;
}

export type Employee = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string; // Consider using a proper date type if possible
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    longitude?: number; // Optional field
    latitude?: number; // Optional field
    job: string;
    profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const karyawanItems: NavItem[] = [
    {
        title: "Presensi",
        href: "/karyawan",
        icon: "login",
        label: "Presensi",
    },
    {
        title: "Pengajuan Izin",
        href: "/karyawan/pengajuan-izin",
        icon: "page",
        label: "Pengajuan Izin",
    }
];

export const adminItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "User Management",
        href: "/admin/user-mgmt",
        icon: "employee",
        label: "User Management",
    },
    {
        title: "Data Izin",
        href: "/admin/data-izin",
        icon: "post",
        label: "Data Izin",
    },
    {
        title: "Data Presensi",
        href: "/admin/data-presensi",
        icon: "page",
        label: "Data Presensi",
    },
    {
        title: "Master Status",
        href: "/admin/master-status",
        icon: "bookCopy",
        label: "Master Status",
    },
    // {
    //     title: "Master Role",
    //     href: "/admin/master-role",
    //     icon: "userCog",
    //     label: "Master Role"
    // },
    {
        title: "Master Divisi",
        href: "/admin/master-divisi",
        icon: "shieldHalf",
        label: "Master Divisi"
    },
    {
        title: "Master Titik",
        href: "/admin/master-titik",
        icon: "mapPin",
        label: "Master Titik"
    }
];


export const supervisorItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/supervisor/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {   
        title: "Data Karyawan",
        href: "/supervisor/data-karyawan",
        icon: "employee",
        label: "Data Karyawan",
    },
    {
        title: "Data Presensi Karyawan",
        href: "/supervisor/presensi-karyawan",
        icon: "login",
        label: "Presensi",
    },
    {
        title: "Data Izin Karyawan",
        href: "/supervisor/izin-karyawan",
        icon: "page",
        label: "Pengajuan Izin",
    }
];