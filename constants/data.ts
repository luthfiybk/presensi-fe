import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};

export type Izin = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};

export type Presensi = {
    id: number;
    name: string;
    company: string;
    role: string;
    verified: boolean;
    status: string;
};

export type Divisi = {
    id: number;
    nama: string;
};

export type Role = {
    id: number;
    name: string;
};

export type Status = {
    id: string;
    nama: string;
};

export const status: Status[] = [
    {
        id: "1",
        nama: "Tepat Waktu",
    },
    {
        id: "2",
        nama: "Terlambat",
    },
    {
        id: "3",
        nama: "Alpha",
    },
    {
        id: "4",
        nama: "Izin Diajukan",
    },
    {
        id: "5",
        nama: "Izin Disetujui",
    },
    {
        id: "6",
        nama: "Izin Ditolak",
    }
];

export const users: User[] = [
    {
        id: 1,
        name: "Candice Schiner",
        company: "Dell",
        role: "Frontend Developer",
        verified: false,
        status: "Active",
    },
    {
        id: 2,
        name: "John Doe",
        company: "TechCorp",
        role: "Backend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 3,
        name: "Alice Johnson",
        company: "WebTech",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 4,
        name: "David Smith",
        company: "Innovate Inc.",
        role: "Fullstack Developer",
        verified: false,
        status: "Inactive",
    },
    {
        id: 5,
        name: "Emma Wilson",
        company: "TechGuru",
        role: "Product Manager",
        verified: true,
        status: "Active",
    },
    {
        id: 6,
        name: "James Brown",
        company: "CodeGenius",
        role: "QA Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 7,
        name: "Laura White",
        company: "SoftWorks",
        role: "UX Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 8,
        name: "Michael Lee",
        company: "DevCraft",
        role: "DevOps Engineer",
        verified: false,
        status: "Active",
    },
    {
        id: 9,
        name: "Olivia Green",
        company: "WebSolutions",
        role: "Frontend Developer",
        verified: true,
        status: "Active",
    },
    {
        id: 10,
        name: "Robert Taylor",
        company: "DataTech",
        role: "Data Analyst",
        verified: false,
        status: "Active",
    },
];

export const role: Role[] = [
    {
        id: 1,
        name: "Admin",
    },
    {
        id: 2,
        name: "Karyawan",
    },
    {
        id: 3,
        name: "Supervisor",
    },

];

export const divisi: Divisi[] = [
    {
        id: 1,
        nama: "IT",
    },
    {
        id: 2,
        nama: "HRD",
    },
    {
        id: 3,
        nama: "Finance",
    },
    {
        id: 4,
        nama: "Marketing",
    },
    {
        id: 5,
        nama: "Operasional",
    },
];

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
        title: "Dashboard",
        href: "/karyawan/dashboard",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "Presensi",
        href: "/karyawan/presensi",
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
    {
        title: "Master Role",
        href: "/admin/master-role",
        icon: "userCog",
        label: "Master Role"
    },
    {
        title: "Master Divisi",
        href: "/admin/master-divisi",
        icon: "shieldHalf",
        label: "Master Divisi"
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