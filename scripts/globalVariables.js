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
        id: 1763842169735,
        name: "Badr Eddine Slaoui",
        age: "21",
        role: "manager",
        email: "badrslaoui8@gmail.com",
        phone: "0680981007",
        enter_date: "2025-11-23",
        leave_date: "2025-11-30",
        photo: "https://i.redd.it/zjathgn8ix1c1.jpeg",
        experiences_arr: [{
                title: "Devloper",
                company: "Bleutiful Communication",
                start_date: "2024-11-01",
                end_date: "2024-12-31"
            },
            {
                title: "Devloper",
                company: "BC SKills",
                start_date: "2024-04-01",
                end_date: "2024-04-30"
            },
            {
                title: "Devloper",
                company: "Tighaline",
                start_date: "2024-03-05",
                end_date: "2024-05-11"
            }
        ],
        status: "unassigned",
    },
    {
        id: 1763298002001,
        name: "Monkey D. Luffy",
        age: "19",
        role: "manager",
        email: "luffy@strawhats.com",
        phone: "0600000001",
        enter_date: "2025-01-01",
        leave_date: "2026-01-01",
        photo: "https://wallpapers-clan.com/wp-content/uploads/2022/06/one-piece-monkey-d-luffy-pfp-31.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Captain",
            company: "Straw Hat Pirates",
            start_date: "2020-01-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002002,
        name: "Roronoa Zoro",
        age: "21",
        role: "security",
        email: "zoro@strawhats.com",
        phone: "0600000002",
        enter_date: "2025-02-01",
        leave_date: "2026-02-01",
        photo: "https://preview.redd.it/cbu71mr9w1h91.jpg?width=640&crop=smart&auto=webp&s=e628992df1ce3dc4db7e912f301646cb7b7cbab9",
        status: "unassigned",
        experiences_arr: [{
            title: "Combat Specialist",
            company: "Straw Hat Pirates",
            start_date: "2020-03-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002003,
        name: "Nami",
        age: "20",
        role: "receptionist",
        email: "nami@strawhats.com",
        phone: "0600000003",
        enter_date: "2025-03-01",
        leave_date: "2026-03-01",
        photo: "https://i.pinimg.com/originals/24/94/28/24942852087a4ec2ee794a6a2269c346.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Navigator",
            company: "Straw Hat Pirates",
            start_date: "2021-04-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002004,
        name: "Usopp",
        age: "19",
        role: "it",
        email: "usopp@strawhats.com",
        phone: "0600000004",
        enter_date: "2025-04-01",
        leave_date: "2026-04-01",
        photo: "https://i.pinimg.com/originals/78/7a/56/787a56451ea923cf8b6c4eecd6f3c62e.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Sniper & Engineer",
            company: "Straw Hat Pirates",
            start_date: "2020-06-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002005,
        name: "Sanji",
        age: "21",
        role: "cleaner",
        email: "sanji@strawhats.com",
        phone: "0600000005",
        enter_date: "2025-05-01",
        leave_date: "2026-05-01",
        photo: "https://staticg.sportskeeda.com/editor/2025/03/3da09-17434089186098.png",
        status: "unassigned",
        experiences_arr: [{
            title: "Chef",
            company: "Baratie / Straw Hats",
            start_date: "2021-01-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002006,
        name: "Tony Tony Chopper",
        age: "17",
        role: "visiter",
        email: "chopper@strawhats.com",
        phone: "0600000006",
        enter_date: "2025-06-01",
        leave_date: "2025-06-01",
        photo: "https://avatars.pfptown.com/742/chopper-pfp-4271.png",
        status: "unassigned",
        experiences_arr: [],
    },
    {
        id: 1763298002007,
        name: "Nico Robin",
        age: "30",
        role: "manager",
        email: "robin@strawhats.com",
        phone: "0600000007",
        enter_date: "2025-07-01",
        leave_date: "2026-07-01",
        photo: "https://i.pinimg.com/originals/9d/d6/a1/9dd6a123c87058f4cb74beb2d469fe8c.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Archaeologist",
            company: "Straw Hat Pirates",
            start_date: "2020-05-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002008,
        name: "Franky",
        age: "36",
        role: "it",
        email: "franky@strawhats.com",
        phone: "0600000008",
        enter_date: "2025-08-01",
        leave_date: "2026-08-01",
        photo: "https://images4.alphacoders.com/769/thumb-440-769823.webp",
        status: "unassigned",
        experiences_arr: [{
            title: "Shipwright",
            company: "Sunny Engineering",
            start_date: "2019-01-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002009,
        name: "Jinbe",
        age: "46",
        role: "security",
        email: "jinbe@strawhats.com",
        phone: "0600000009",
        enter_date: "2025-09-01",
        leave_date: "2026-09-01",
        photo: "https://ih1.redbubble.net/image.4952891276.2292/fposter,small,wall_texture,square_product,600x600.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Helmsman / Defender",
            company: "Sun Pirates / Straw Hat Crew",
            start_date: "2015-05-01",
            end_date: "2025-01-01",
        }, ],
    },
    {
        id: 1763298002010,
        name: "Yamato",
        age: "22",
        role: "manager",
        email: "yamato@strawhats.com",
        phone: "0600000010",
        enter_date: "2025-10-01",
        leave_date: "2026-10-01",
        photo: "https://wallpaperbat.com/img/1302325-yamato-one-piece-anime-image-board.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Warrior / Allied Leader",
            company: "Kozuki Clan / Straw Hat Allies",
            start_date: "2019-03-01",
            end_date: "2025-01-01",
        },
        ]
    },

    {
        id: 1763298002011,
        name: "Brook",
        age: "90",
        role: "receptionist",
        email: "brook@strawhats.com",
        phone: "0600000011",
        enter_date: "2025-09-01",
        leave_date: "2026-09-01",
        photo: "https://i.pinimg.com/originals/f5/01/d1/f501d162da3bc47657cebe5fd5e6c05b.jpg",
        status: "unassigned",
        experiences_arr: [{
            title: "Musician",
            company: "Rumbar Pirates",
            start_date: "1800-01-01",
            end_date: "2025-01-01",
        }, ]
    }
];
