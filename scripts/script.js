import { add_experience_btn, add_worker_btn, add_worker_form, add_worker_modal, available_rooms, close_add_worker_modal, experiences, img, room_btns, room_limits, no_worker_in_list, room_by_roles, worker_list, search, filter, randomize, fakeData,} from "./globalVariables.js";
import { available_workers, available_workers_class_name, delete_modal, delete_modal_class_name, experience_class, experience_template, list_worker, list_worker_class_name, profile, profile_class_name, room_btn_class_name, room_worker, room_worker_class_name, update_modal, update_modal_class_name, } from "./templates.js";
import { validate_age, validate_email, validate_enter_date, validate_experiences, validate_leave_date, validate_name, validate_phone, validate_role, } from "./validators.js";

const save = () => localStorage.setItem("worker_list_arr", JSON.stringify(worker_list_arr));

const load = () => JSON.parse(localStorage.getItem("worker_list_arr") || "[]");

let worker_list_arr = load();

const get_room_array = r => JSON.parse(localStorage.getItem(`${r}-workers`) || "[]");

const set_room_array = (r, arr) => localStorage.setItem(`${r}-workers`, JSON.stringify(arr));

if (worker_list_arr.length === 0) {
    let all_arrays_are_empty = available_rooms.every(r => get_room_array(r).length === 0);

    if (all_arrays_are_empty) {
        localStorage.clear();
        localStorage.setItem("worker_list_arr", JSON.stringify(fakeData));
        worker_list_arr = fakeData;
        location.reload();
    }
}

//Helpers
const add_experience = (arr, parent, class_name) => {
    if (arr.length === 0) parent.classList.replace("hidden", "flex");

    let index = arr.length + 1;

    let experience = document.createElement("div");
    experience.className = experience_class(class_name);
    experience.innerHTML = experience_template(index);

    experience.querySelector(`#close-experience-${index}`)
        .addEventListener("click", () => {
            experience.remove();
            if (parent.querySelectorAll(`.${class_name}`).length === 0) parent.classList.replace("flex", "hidden");
        });

    parent.appendChild(experience);
};

const handle_inlist_worker_drag = (e, worker) => {
    const ghostCard = e.currentTarget.cloneNode(true);
    ghostCard.style.width = `${e.currentTarget.offsetWidth / 1.6}px`;
    ghostCard.style.height = `${e.currentTarget.offsetHeight}px`;

    document.body.appendChild(ghostCard);

    e.dataTransfer.setDragImage(
        ghostCard,
        ghostCard.offsetWidth / 2,
        ghostCard.offsetHeight / 2
    );

    setTimeout(() => ghostCard.remove(), 0);

    handle_drag_start(e, worker);
};

const add_worker_to_list = (worker) => {
    let div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.id = `worker-${worker.id}`;
    div.className = list_worker_class_name();
    div.title = worker.role;
    div.innerHTML = list_worker(worker);

    div.addEventListener("click", () => show_worker_profile(worker));

    div.querySelector(`#edit-worker-${worker.id}`)
        .addEventListener("click", (e) => show_edit_worker_modal(e, worker, div));

    div.querySelector(`#remove-worker-${worker.id}`)
        .addEventListener("click", (e) => show_delete_worker_modal(e, worker, div));

    div.addEventListener("dragstart", (e) => handle_inlist_worker_drag(e, worker));

    div.addEventListener("dragend", handle_drag_end);

    worker_list.appendChild(div);
};

const show_worker_profile = (worker) => {
    let worker_profile = document.createElement("div");
    worker_profile.className = profile_class_name();
    worker_profile.id = "worker-profile-modal";
    worker_profile.innerHTML = profile(worker);

    worker_profile.querySelector("#close-modal")
        .addEventListener("click", () => worker_profile.remove());

    document.body.appendChild(worker_profile);
};

const load_worker_list = (arr = worker_list_arr) => {
    if (arr.length > 0) {
        no_worker_in_list.classList.add("hidden");
        arr.forEach( worker => add_worker_to_list(worker));
    } else no_worker_in_list.classList.remove("hidden"); 
};

const update_worker_list = (arr = worker_list_arr) => {
    worker_list.querySelectorAll(".worker")
        .forEach( worker => worker.remove());
    load_worker_list(arr);
};

const show_delete_worker_modal = (e, worker, div) => {
    e.stopPropagation();
    let delete_worker_modal = document.createElement("div");
    delete_worker_modal.className = delete_modal_class_name();
    delete_worker_modal.id = "delete-worker-modal";
    delete_worker_modal.innerHTML = delete_modal();

    delete_worker_modal.querySelector("#delete-worker-btn")
        .addEventListener("click", () => {
            worker_list_arr.splice(worker_list_arr.findIndex(w => w.id === worker.id), 1);
            save();
            div.remove();
            if (worker_list_arr.length === 0) no_worker_in_list.classList.remove("hidden");
            delete_worker_modal.remove();
        });

    delete_worker_modal.querySelector("#cancel-delete-worker-btn")
        .addEventListener("click", () => delete_worker_modal.remove());

    document.body.appendChild(delete_worker_modal);
};

const show_available_workers_list = (workers, room) => {
    let div = document.createElement("div");
    div.id = "available-workers-list";
    div.className = available_workers_class_name();
    div.innerHTML = available_workers(workers);

    div.querySelector("#close-modal")
        .addEventListener("click", () => div.remove());

    div.querySelectorAll(".worker")
        .forEach((worker, i) => {
            worker.addEventListener("click", () => {
                add_worker_to_room(workers[i], room);
                div.remove();
            });
        });

    document.body.appendChild(div);
};

const room_btn_handler = (e) => {
    let id = e.target.parentElement.parentElement.id;
    show_available_workers_list(worker_list_arr.filter( w => room_by_roles[id].includes(w.role)), id);
};

const switch_worker_with_btn = (worker, room, container, btn) => {
    let worker_div = document.createElement("div");
    worker_div.setAttribute("draggable", "true");
    worker_div.id = `worker-${worker.id}`;
    worker_div.className = room_worker_class_name();
    worker_div.innerHTML = room_worker(worker);

    worker_div.querySelector(`#remove-worker-${worker.id}`)
        .addEventListener("click", (e) => {
            e.stopPropagation();
            container.insertBefore(btn, worker_div);
            worker_div.remove();
            worker.status = "unassigned";
            add_worker_to_list(worker);
            set_room_array(room, get_room_array(room).filter((w) => w.id !== worker.id));
            if (worker_list_arr.length === 0) no_worker_in_list.classList.add("hidden");
            worker_list_arr.push(worker);
            save();
        });

    worker_div.addEventListener("click", () => show_worker_profile(worker));
    worker_div.addEventListener("dragstart", e => handle_drag_start(e, worker, room));
    worker_div.addEventListener("dragend", handle_drag_end);

    container.insertBefore(worker_div, btn);
    btn.remove();
};

const add_worker_to_room = (worker, room) => {
    let room_arr = get_room_array(room);

    let room_btns_container = document.querySelector(`.${room}-btns`);
    let first_room_btn = room_btns_container.querySelector(".add-worker-btn");

    switch_worker_with_btn(worker, room, room_btns_container, first_room_btn);
    worker_list.querySelector(`#worker-${worker.id}`).remove();

    if (worker_list_arr.length === 0) no_worker_in_list.classList.add("hidden");

    worker_list_arr = worker_list_arr.filter((w) => w.id !== worker.id);
    save();

    if (worker_list_arr.length === 0) no_worker_in_list.classList.remove("hidden");

    worker.status = room;
    room_arr.push(worker);
    set_room_array(room, room_arr);
};

const load_room_workers = (room, limit) => {
    let room_btns_container = document.querySelector(`.${room}-btns`);
    room_btns_container.innerHTML = "";
    let room_arr = get_room_array(room);

    for (let i = 0; i < limit; i++) {
        let room_btn = document.createElement("button");
        room_btn.className = room_btn_class_name();
        room_btn.textContent = "+";
        room_btn.addEventListener("click", room_btn_handler);
        room_btns_container.appendChild(room_btn);

        if (i < room_arr.length) switch_worker_with_btn(room_arr[i], room, room_btns_container, room_btn);
    }
};

const filter_workers = (search = "", role = "") => {
    let filtered_workers = worker_list_arr;

    if (search) filtered_workers = filtered_workers.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    if (role) filtered_workers = filtered_workers.filter(w => w.role === (role === "all" ? w.role : role));
    
    return filtered_workers;
};

const randomize_workers_in_rooms = () => {
    worker_list_arr = [...worker_list_arr, ...available_rooms.map((r) => get_room_array(r)).flat()];
    save();

    update_worker_list(worker_list_arr);

    available_rooms.forEach((r) => {
        set_room_array(r, []);
        load_room_workers(r, room_limits[r]);
    });

    let skiped = [];

    do {
        let random_worker = worker_list_arr[Math.floor(Math.random() * worker_list_arr.length)];
        let random_room = "";
        let accessible_rooms = available_rooms.filter( r => room_by_roles[r].includes(random_worker.role));

        if (accessible_rooms.length === 0) {
            let index = worker_list_arr.findIndex((w) => w.id === random_worker.id);
            skiped.push(worker_list_arr[index]);
            worker_list_arr.splice(index, 1);
            continue;
        }

        let empty_rooms = accessible_rooms.filter( r => get_room_array(r).length < room_limits[r]);

        if (empty_rooms.length === 0) {
            let index = worker_list_arr.findIndex((w) => w.id === random_worker.id);
            skiped.push(worker_list_arr[index]);
            worker_list_arr.splice(index, 1);
            continue;
        }

        random_room = empty_rooms[Math.floor(Math.random() * empty_rooms.length)];

        add_worker_to_room(random_worker, random_room);
    } while (worker_list_arr.length > 0);

    worker_list_arr = [...worker_list_arr, ...skiped];
    save();

    update_worker_list(worker_list_arr);
};

const handle_drag_start = (e, worker, room = "") => {
    e.dataTransfer.setData("worker", JSON.stringify(worker));
    e.dataTransfer.setData("room", room);
    available_rooms.forEach((r) => {
        let room = document.getElementById(r);
        let length = get_room_array(r).length;
        room.classList.add("bg-opacity-30");
        if (room_by_roles[room.id].includes(worker.role) && length < room_limits[r]) {
            room.classList.remove("bg-red-400");
            room.classList.add("bg-green-400");
        }
        else {
            room.classList.remove("bg-green-400");
            room.classList.add("bg-red-400");
        }
    });
};

const handle_drag_end = (e) => {
    e.preventDefault();
    available_rooms.forEach((r) => {
        let room = document.getElementById(r);
        room.classList.remove("bg-green-400", "bg-red-400", "bg-opacity-30");
    });
};

//Main Functions
add_worker_btn.addEventListener("click", () => {
    add_worker_modal.classList.replace("hidden", "flex");
});

add_experience_btn.addEventListener("click", () => {
    add_experience(document.querySelectorAll(".experience"), experiences, "experience");
});

add_worker_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = add_worker_form.name.value;
    let age = add_worker_form.age.value;
    let role = add_worker_form.role.value;
    let photo = add_worker_form.photo.value;
    let email = add_worker_form.email.value;
    let phone = add_worker_form.phone.value;
    let enter_date = add_worker_form.enter_date.value;
    let leave_date = add_worker_form.leave_date.value;

    if (!validate_name(name, "name_err")) return;
    if (!validate_age(age, "age_err")) return;
    if (!validate_role(role, "role_err")) return;
    if (!validate_email(email, "email_err")) return;
    if (!validate_phone(phone, "phone_err")) return;
    if (!validate_enter_date(enter_date, "enter_date_err")) return;
    if (!validate_leave_date(enter_date, leave_date, "leave_date_err")) return;

    const create_worker = (photo) => {
        let { all_experiences_valid, experiences_arr } = validate_experiences("experience");
    
        if (all_experiences_valid) {
            let worker = { id: Date.now(), name, age, role, email, phone, enter_date, leave_date, photo, experiences_arr, status: "unassigned"};
            worker_list_arr.push(worker);
            save();
            add_worker_modal.classList.replace("flex", "hidden");
            let preview = document.getElementById("img-preview");
            preview.src = "";
            preview.classList.add("hidden");
            add_worker_form.reset();
            experiences.classList.replace("flex", "hidden");
            document.querySelectorAll(".experience").forEach(e => e.remove());
            add_worker_to_list(worker);
            no_worker_in_list.classList.add("hidden");
        }
    }

    if(!photo) {
        create_worker("https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg");
    } else {
        const tempImg = new Image();
        tempImg.src = photo;
        tempImg.onerror = () => create_worker("https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg");
        tempImg.onload = () => create_worker(photo);
    }
});

close_add_worker_modal.addEventListener("click", () => {
    add_worker_modal.classList.replace("flex", "hidden");
    let preview = document.getElementById("img-preview");
    preview.src = "";
    preview.classList.add("hidden");
    add_worker_form.reset();
    experiences.classList.replace("flex", "hidden");
    document.querySelectorAll(".experience").forEach( e => e.remove() );
    document.querySelectorAll('p[id$="_err"]')
        .forEach( e => {
            e.classList.add("hidden");
            e.textContent = "";
        });
});

img.addEventListener("input", () => {
    let preview = document.getElementById("img-preview");
    preview.src = img.value;
    preview.classList.remove("hidden");
    if (img.value === "") {
        preview.classList.add("hidden");
        return;
    }
    preview.onerror = () => preview.src = "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg";
});

load_worker_list();

const edit_worker = (e, id) => {

    e.preventDefault();

    let edit_worker_form = document.querySelector("#edit-worker-form");
    let name = edit_worker_form.querySelector("#worker-name").value;
    let age = edit_worker_form.querySelector("#worker-age").value;
    let role = edit_worker_form.querySelector("#worker-role").value;
    let photo = edit_worker_form.querySelector("#worker-photo").value;
    let email = edit_worker_form.querySelector("#worker-email").value;
    let phone = edit_worker_form.querySelector("#worker-phone").value;
    let enter_date = edit_worker_form.querySelector("#worker-enter-date").value;
    let leave_date = edit_worker_form.querySelector("#worker-leave-date").value;

    if (!validate_name(name, "worker_name_err")) return;

    if (!validate_age(age, "worker_age_err")) return;

    if (!validate_role(role, "worker_role_err")) return;

    if (!validate_email(email, "worker_email_err")) return;

    if (!validate_phone(phone, "worker_phone_err")) return;

    if (!validate_enter_date(enter_date, "worker_enter_date_err")) return;

    if (!validate_leave_date(enter_date, leave_date, "worker_leave_date_err")) return;

    const update_worker = (photo) => {
        let { all_experiences_valid, experiences_arr } = validate_experiences("worker-experience");

        if (all_experiences_valid) {
            let worker = worker_list_arr.find((worker) => worker.id == id);
            worker = { ...worker, name, age, role, email, phone, enter_date, leave_date, photo, experiences_arr};
            save();
            update_worker_list();
            document.getElementById("edit-worker-modal").remove();
        }
    }

    if(!photo) {
        update_worker("https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg");
    } else {
        const tempImg = new Image();
        tempImg.src = photo;
        tempImg.onerror = () => update_worker("https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg");
        tempImg.onload = () => update_worker(photo);
    }
}

const show_edit_worker_modal = (e, worker) => {
    e.stopPropagation();
    let edit_worker_modal = document.createElement("div");
    edit_worker_modal.className = update_modal_class_name();
    edit_worker_modal.id = "edit-worker-modal";
    edit_worker_modal.innerHTML = update_modal(worker);

    edit_worker_modal.querySelector("#close-modal")
        .addEventListener("click", () => edit_worker_modal.remove());

    edit_worker_modal.querySelector("#edit-worker-form")
        .addEventListener("submit", e => edit_worker(e, worker.id));

    edit_worker_modal.querySelector("#add-worker-experience-btn")
        .addEventListener("click", () => {
            let worker_experiences = document.querySelector("#worker-experiences");
            let experiences_arr = document.querySelectorAll(".worker-experience");
            add_experience(experiences_arr, worker_experiences, "worker-experience");
        });

    edit_worker_modal.querySelectorAll(".worker-experience")
        .forEach((worker_experience, i) => {
            worker_experience.querySelector(`#close-worker-experience-${i + 1}`)
                .addEventListener("click", () => {
                    worker_experience.remove();
                    if (document.querySelectorAll(".worker-experience").length === 0) {
                        let worker_experiences_container = edit_worker_modal.querySelector("#worker-experiences");
                        worker_experiences_container.classList.toggle("flex");
                        worker_experiences_container.classList.toggle("hidden");
                    }
            });
        });

    let img = edit_worker_modal.querySelector("#worker-photo");

    img.addEventListener("input", () => {
        let preview = edit_worker_modal.querySelector("#img-preview");
        preview.src = img.value;
        preview.classList.remove("hidden");
        if (img.value === "") {
            preview.classList.add("hidden");
            return;
        }
        preview.onerror = () => preview.src = "https://wallpapers.com/images/hd/straw-hat-pirates-0tmsc0p43nkng9rj.jpg";
    });

    document.body.appendChild(edit_worker_modal);
}

room_btns.forEach(b => b.addEventListener("click", room_btn_handler));

available_rooms.forEach(r => {
    let room = document.getElementById(r);

    load_room_workers(r, room_limits[r]);

    room.addEventListener("dragover", e => e.preventDefault());

    room.addEventListener("drop", e => {
        e.preventDefault();
        let room_arr = get_room_array(r);
        if (room_arr.length < room_limits[r]) {
            let worker = JSON.parse(e.dataTransfer.getData("worker"));
            if (room_by_roles[room.id].includes(worker.role)) {
                let room = e.dataTransfer.getData("room");
                if (room) {
                    document.getElementById(`remove-worker-${worker.id}`).click();
                }
                add_worker_to_room(worker, r);
            }
        }
    });
})

worker_list.addEventListener("dragover", e => e.preventDefault());

worker_list.addEventListener("drop", e => {
    e.preventDefault();
    let worker = JSON.parse(e.dataTransfer.getData("worker"));
    let room = e.dataTransfer.getData("room");
    if (room) document.getElementById(`remove-worker-${worker.id}`).click();
});

search.addEventListener("input", () => update_worker_list(filter_workers(search.value, filter.value)));

filter.addEventListener("change", () => update_worker_list(filter_workers(search.value, filter.value)));

randomize.addEventListener("click", randomize_workers_in_rooms);