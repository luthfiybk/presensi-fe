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
    name: string;
    keterangan: string;
    tanggal: string;
    status: string;

};

export type Presensi = {
    id: string;
    nama: string;
    tanggal: string;
    jam_masuk: string;
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

export type Gedung = {
    id: number;
    nama_gedung: string;
    latitude: number;
    longitude: number;
}


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

// export const users: User[] = [
//     {
//         id: 1,
//         name: "Candice Schiner",
//         company: "Dell",
//         role: "Frontend Developer",
//         verified: false,
//         status: "Active",
//     },
//     {
//         id: 2,
//         name: "John Doe",
//         company: "TechCorp",
//         role: "Backend Developer",
//         verified: true,
//         status: "Active",
//     },
//     {
//         id: 3,
//         name: "Alice Johnson",
//         company: "WebTech",
//         role: "UI Designer",
//         verified: true,
//         status: "Active",
//     },
//     {
//         id: 4,
//         name: "David Smith",
//         company: "Innovate Inc.",
//         role: "Fullstack Developer",
//         verified: false,
//         status: "Inactive",
//     },
//     {
//         id: 5,
//         name: "Emma Wilson",
//         company: "TechGuru",
//         role: "Product Manager",
//         verified: true,
//         status: "Active",
//     },
//     {
//         id: 6,
//         name: "James Brown",
//         company: "CodeGenius",
//         role: "QA Engineer",
//         verified: false,
//         status: "Active",
//     },
//     {
//         id: 7,
//         name: "Laura White",
//         company: "SoftWorks",
//         role: "UX Designer",
//         verified: true,
//         status: "Active",
//     },
//     {
//         id: 8,
//         name: "Michael Lee",
//         company: "DevCraft",
//         role: "DevOps Engineer",
//         verified: false,
//         status: "Active",
//     },
//     {
//         id: 9,
//         name: "Olivia Green",
//         company: "WebSolutions",
//         role: "Frontend Developer",
//         verified: true,
//         status: "Active",
//     },
//     {
//         id: 10,
//         name: "Robert Taylor",
//         company: "DataTech",
//         role: "Data Analyst",
//         verified: false,
//         status: "Active",
//     },
// ];

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

export const presensi: Presensi[] = [
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-01",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-02",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-03",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-04",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-05",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-06",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-07",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-08",
        jam_masuk: "08:00:00",
    },
    {
        id: "123456789",
        nama: "Luthfi",
        tanggal: "2021-08-09",
        jam_masuk: "08:00:00",
    },
]

export const izin: Izin[] = [
    {
        id: 1,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-01",
        status: "Izin Diajukan",
    },
    {
        id: 2,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-02",
        status: "Izin Diajukan",
    },
    {
        id: 3,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-03",
        status: "Izin Diajukan",
    },
    {
        id: 4,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-04",
        status: "Izin Diajukan",
    },
    {
        id: 5,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-05",
        status: "Izin Diajukan",
    },
    {
        id: 6,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-06",
        status: "Izin Diajukan",
    },
    {
        id: 7,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-07",
        status: "Izin Diajukan",
    },
    {
        id: 8,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-08",
        status: "Izin Diajukan",
    },
    {
        id: 9,
        name: "Luthfi",
        keterangan: "Sakit",
        tanggal: "2021-08-09",
        status: "Izin Diajukan",
    },
]


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
    },
    {
        title: "Master Gedung",
        href: "/admin/master-gedung",
        icon: "building",
        label: "Master Gedung"
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