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