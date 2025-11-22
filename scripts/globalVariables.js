export let available_roles = [
    "it",
    "security",
    "manager",
    "cleaner",
    "visiter",
    "receptionist"
];

export let available_rooms = [
    "meeting-room",
    "reception-room",
    "servers-room",
    "security-room",
    "rest-room",
    "archive-room"
];

export let room_limits = {
    "meeting-room": 6,
    "reception-room": 6,
    "servers-room": 4,
    "security-room": 1,
    "rest-room": 2,
    "archive-room": 2
};

export let room_by_roles = {
    "meeting-room": ["manager", "receptionist", "cleaner"],
    "reception-room": ["receptionist", "visiter", "manager", "cleaner"],
    "servers-room": ["it", "manager", "cleaner"],
    "security-room": ["security", "manager", "cleaner"],
    "rest-room": ["cleaner", "visiter", "manager", "receptionist", "it", "security"],
    "archive-room": ["manager", "receptionist"]
};

export let worker_list = document.getElementById("worker-list");
export let no_worker_in_list = document.getElementById("no-worker-in-list");
export let add_worker_btn = document.getElementById("add-worker-btn");
export let add_worker_modal = document.getElementById("add-worker-modal");
export let close_add_worker_modal = add_worker_modal.querySelector("#close-modal");
export let add_worker_form = document.getElementById("add-worker-form");
export let add_experience_btn = document.getElementById("add-experience-btn");
export let experiences = document.getElementById("experiences");
export let img = document.querySelector("#add-worker-modal #photo");
export let plan = document.getElementById("plan");
export let room_btns = plan.querySelectorAll(".add-worker-btn");
export let search = document.getElementById("search");
export let filter = document.getElementById("filter");
export let randomize = document.getElementById("randomize");


export let fakeData = [
    {
        id: 1763297001001,
        name: "Imane Rami",
        age: "24",
        role: "manager",
        email: "imane.rami@example.com",
        phone: "0612345678",
        enter_date: "2025-10-01T09:00",
        leave_date: "2026-04-01T17:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Assistant Manager",
            company: "Maroc Telecom",
            start_date: "2023-03-01T09:00",
            end_date: "2024-02-10T17:00",
            },
        ],
    },
    {
        id: 1763297001002,
        name: "Youssef Idrissi",
        age: "27",
        role: "it",
        email: "youssef.idrissi@example.com",
        phone: "0678994411",
        enter_date: "2025-09-12T10:00",
        leave_date: "2026-05-02T18:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "IT Support",
            company: "Inwi",
            start_date: "2023-02-01T09:00",
            end_date: "2025-08-20T17:00",
            },
        ],
    },
    {
        id: 1763297001003,
        name: "Sara Kabbaj",
        age: "22",
        role: "receptionist",
        email: "sara.kabbaj@example.com",
        phone: "0700112233",
        enter_date: "2025-09-01T08:00",
        leave_date: "2025-12-20T16:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Front Desk Assistant",
            company: "Atlas Hotels",
            start_date: "2024-04-01T08:00",
            end_date: "2024-09-10T17:00",
            },
        ],
    },
    {
        id: 1763297001004,
        name: "Omar Benali",
        age: "29",
        role: "security",
        email: "omar.benali@example.com",
        phone: "0677445566",
        enter_date: "2025-03-01T06:00",
        leave_date: "2025-12-01T14:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Security Guard",
            company: "Marjane",
            start_date: "2021-01-01T06:00",
            end_date: "2023-05-10T15:00",
            },
        ],
    },
    {
        id: 1763297001005,
        name: "Amina Fadili",
        age: "23",
        role: "cleaner",
        email: "amina.fadili@example.com",
        phone: "0622113344",
        enter_date: "2025-04-20T07:00",
        leave_date: "2026-01-01T14:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Cleaning Staff",
            company: "Hospital Privé",
            start_date: "2023-01-01T07:00",
            end_date: "2024-02-10T16:00",
            },
        ],
    },
    {
        id: 1763297001006,
        name: "Adil Benhani",
        age: "26",
        role: "it",
        email: "adil.benhani@example.com",
        phone: "0699887766",
        enter_date: "2025-07-01T09:00",
        leave_date: "2026-02-01T17:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Network Technician",
            company: "OCP",
            start_date: "2022-11-01T09:00",
            end_date: "2024-07-15T17:00",
            },
            {
            title: "System Admin",
            company: "CGI",
            start_date: "2024-08-01T09:00",
            end_date: "2025-06-20T17:00",
            },
        ],
    },
    {
        id: 1763297001007,
        name: "Nadia Toumi",
        age: "30",
        role: "visiter",
        email: "nadia.toumi@example.com",
        phone: "0655443322",
        enter_date: "2025-11-10T14:00",
        leave_date: "2025-11-10T17:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [],
    },
    {
        id: 1763297001009,
        name: "Aya El Fassi",
        age: "25",
        role: "receptionist",
        email: "aya.fassi@example.com",
        phone: "0700332211",
        enter_date: "2025-09-15T08:00",
        leave_date: "2026-01-10T17:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Receptionist",
            company: "Ibis",
            start_date: "2023-03-01T08:00",
            end_date: "2024-07-01T17:00",
            },
        ],
    },
    {
        id: 1763297001010,
        name: "Khalid Marzouki",
        age: "32",
        role: "cleaner",
        email: "khalid.marzouki@example.com",
        phone: "0644332211",
        enter_date: "2025-01-05T07:00",
        leave_date: "2025-08-28T15:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Building Cleaner",
            company: "Aradei Group",
            start_date: "2021-06-01T07:00",
            end_date: "2024-12-01T15:00",
            },
        ],
    },
    {
        id: 1763297001008,
        name: "Hassan El Idrissi",
        age: "32",
        role: "security",
        email: "hassan.idrissi@example.com",
        phone: "0644556677",
        enter_date: "2025-01-05T07:00",
        leave_date: "2025-11-28T15:00",
        photo: "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg",
        status: "unassigned",
        experiences_arr: [
            {
            title: "Logistics Security",
            company: "Aramex",
            start_date: "2020-02-01T07:00",
            end_date: "2023-09-10T15:00",
            },
        ],
    },
];