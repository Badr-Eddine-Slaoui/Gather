import { add_experience_btn, add_worker_btn, add_worker_form, add_worker_modal, available_rooms, close_add_worker_modal, experiences, img, room_btns, room_limits, no_worker_in_list, room_by_roles, worker_list } from "./globalVariables.js";
import { available_workers, delete_modal, experience_template, list_worker, profile, room_worker,update_modal } from "./templates.js";
import { validate_age, validate_email, validate_enter_date, validate_experiences, validate_leave_date, validate_name, validate_phone, validate_role } from "./validators.js";

let worker_list_arr = JSON.parse(localStorage.getItem("worker_list_arr") || "[]");

//Helpers
const add_experience = (arr, parent, class_name) => {

    if(arr.length === 0) {
        parent.classList.toggle("hidden");
        parent.classList.toggle("flex");
    }

    let index = arr.length + 1;

    let experience = document.createElement("div");
    experience.className = class_name + " w-full flex flex-col gap-y-5 py-5 border-b border-slate-500 relative";

    experience.innerHTML = experience_template(index);

    let remove_experience = experience.querySelector(`#close-experience-${index}`);

    remove_experience.addEventListener("click", () => {
        experience.remove();
        if(document.querySelectorAll(`.${class_name}`).length === 0) {
            parent.classList.toggle("flex");
            parent.classList.toggle("hidden");
        }
    });

    parent.appendChild(experience);
}

const add_worker_to_list = (worker) => {
    let div = document.createElement("div");
    div.setAttribute("draggable", "true");
    div.id = `worker-${worker.id}`;
    div.className = "worker w-10/12 mx-auto h-[9vh] flex gap-x-3 p-1 px-2 items-center rounded-lg shadow-lg bg-white border border-orange-400 cursor-pointer relative";
    div.title = worker.role;
    div.innerHTML = list_worker(worker);

    div.addEventListener("click", () => {
        show_worker_profile(worker);
    });

    let edit_worker = div.querySelector(`#edit-worker-${worker.id}`);
    edit_worker.addEventListener("click", (e) => {
        e.stopPropagation();
        show_edit_worker_modal(worker, div);
    });

    let remove_worker = div.querySelector(`#remove-worker-${worker.id}`);
    remove_worker.addEventListener("click", (e) => {
        e.stopPropagation();
        show_delete_worker_modal(worker, div);
    });

    worker_list.appendChild(div);
};

const show_worker_profile = (worker) => {
    let worker_profile = document.createElement("div");
    worker_profile.className = "w-screen h-screen bg-black absolute top-0 left-0 bg-opacity-60 flex justify-center items-center";
    worker_profile.id = "worker-profile-modal";
    worker_profile.innerHTML = profile(worker);

    let close_modal = worker_profile.querySelector("#close-modal");
    close_modal.addEventListener("click", () => {
        worker_profile.remove();
    });

    document.body.appendChild(worker_profile);
};

const load_worker_list = (arr = worker_list_arr) => {
    if (arr.length > 0) {
        no_worker_in_list.classList.add("hidden");
        arr.forEach((worker) => {
        add_worker_to_list(worker);
        });
    } else {
        no_worker_in_list.classList.remove("hidden");
    }
};

const update_worker_list = (arr = worker_list_arr) => {
    let workers = worker_list.querySelectorAll(".worker");
    workers.forEach((worker) => {
        worker.remove();
    });
    load_worker_list(arr);
};

const show_delete_worker_modal = (worker, div) => {
    let delete_worker_modal = document.createElement("div");
    delete_worker_modal.className = "w-screen h-screen bg-black absolute top-0 left-0 bg-opacity-60 flex justify-center items-center";
    delete_worker_modal.id = "delete-worker-modal";
    delete_worker_modal.innerHTML = delete_modal();

    let delete_worker_btn = delete_worker_modal.querySelector("#delete-worker-btn")
    delete_worker_btn.addEventListener("click", () => {
        let index = worker_list_arr.findIndex((w) => w.id === worker.id);
        worker_list_arr.splice(index, 1);
        localStorage.setItem("worker_list_arr",JSON.stringify(worker_list_arr));
        div.remove();
        if (worker_list_arr.length === 0) {
            no_worker_in_list.classList.remove("hidden");
        }
        delete_worker_modal.remove();
    });

    let cancel_delete_worker_btn = delete_worker_modal.querySelector("#cancel-delete-worker-btn");
    cancel_delete_worker_btn.addEventListener("click", () => {
        delete_worker_modal.remove();
    });

    document.body.appendChild(delete_worker_modal);
};

const show_available_workers_list = (workers, room) => {
    let div = document.createElement("div");
    div.id = "available-workers-list";
    div.className = "w-screen h-screen bg-black absolute top-0 left-0 bg-opacity-60 flex justify-center items-center"

    div.innerHTML = available_workers(workers);

    let close_modal = div.querySelector("#close-modal");
    close_modal.addEventListener("click", () => {
        div.remove();
    });

    let worker_containers = div.querySelectorAll(".worker");
    worker_containers.forEach((worker, i) => {
        worker.addEventListener("click", () => {
            add_worker_to_room(workers[i], room);
            div.remove();
        });
    });

    document.body.appendChild(div);
};

const room_btn_handler = (e) => {
    let id = e.target.parentElement.parentElement.id;
    let workers = worker_list_arr.filter((worker) => room_by_roles[id].includes(worker.role));
    show_available_workers_list(workers, id);
};

const switch_worker_with_btn = (worker, room, container, btn) => {
    let worker_div = document.createElement("div");
    worker_div.setAttribute("draggable", "true");
    worker_div.id = `worker-${worker.id}`;
    worker_div.className = "w-[15vh] h-[5.5vh] flex justify-around p-1 items-center rounded-lg shadow-lg bg-white border border-orange-400 cursor-pointer relative";
    worker_div.innerHTML = room_worker(worker);

    let remove_worker = worker_div.querySelector(`#remove-worker-${worker.id}`);
    remove_worker.addEventListener("click", (e) => {
        e.stopPropagation();
        container.insertBefore(btn, worker_div);
        worker_div.remove();
        add_worker_to_list(worker);
        let room_arr = JSON.parse(localStorage.getItem(`${room.replace("-", "_")}_workers`) || "[]");
        room_arr = room_arr.filter((w) => w.id !== worker.id);
        localStorage.setItem(`${room.replace("-", "_")}_workers`,JSON.stringify(room_arr));
        if (worker_list_arr.length === 0) {
            no_worker_in_list.classList.add("hidden");
        }
        worker_list_arr.push(worker);
        localStorage.setItem("worker_list_arr", JSON.stringify(worker_list_arr));
    });

    worker_div.addEventListener("click", () => {
        show_worker_profile(worker);
    });

    container.insertBefore(worker_div, btn);
    btn.remove();
};

const add_worker_to_room = (worker, room) => {
    let room_arr = JSON.parse(localStorage.getItem(`${room.replace("-", "_")}_workers`) || "[]");

    let room_btns_container = document.querySelector(`.${room}-btns`);
    let first_room_btn = room_btns_container.querySelector(".add-worker-btn");
    
    switch_worker_with_btn(worker, room, room_btns_container, first_room_btn);

    let worker_in_list = worker_list.querySelector(`#worker-${worker.id}`);
    worker_in_list.remove();

    if (worker_list_arr.length === 0) {
        no_worker_in_list.classList.add("hidden");
    }

    worker_list_arr = worker_list_arr.filter((w) => w.id !== worker.id);
    localStorage.setItem("worker_list_arr", JSON.stringify(worker_list_arr));

    if (worker_list_arr.length === 0) {
        no_worker_in_list.classList.remove("hidden");
    }

    room_arr.push(worker);
    localStorage.setItem(`${room.replace("-", "_")}_workers`, JSON.stringify(room_arr));
};

const load_room_workers = (room, limit) => {
    let room_btns_container = document.querySelector(`.${room}-btns`);
    room_btns_container.innerHTML = "";
    let room_arr = JSON.parse(localStorage.getItem(`${room.replace("-", "_")}_workers`) || "[]");
    for (let i = 0; i < limit; i++) {

        let room_btn = document.createElement("button")
        room_btn.className = "add-worker-btn w-[5vh] h-[5vh] rounded-md shadow-lg flex justify-center items-center bg-blue-500 text-white font-extrabold text-[2rem]";
        room_btn.textContent = "+";
        room_btn.addEventListener("click", room_btn_handler);
        room_btns_container.appendChild(room_btn);

        if (i < room_arr.length) {
            let worker = room_arr[i];
            switch_worker_with_btn(worker, room, room_btns_container, room_btn);
        }
    }
};


//Main Functions
add_worker_btn.addEventListener("click", () => {
    add_worker_modal.classList.remove("hidden");
    add_worker_modal.classList.add("flex");
});

add_experience_btn.addEventListener("click", () => {
    let experiences_arr = document.querySelectorAll(".experience");
    add_experience(experiences_arr, experiences, "experience");
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
    if (!validate_leave_date(leave_date, "leave_date_err")) return;

    if(!photo) {
        create_worker("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    } else {
        
        const tempImg = new Image();
        tempImg.src = photo;

        tempImg.onerror = () => {
            create_worker("https://cdn-icons-png.flaticon.com/512/149/149071.png");
        }

        tempImg.onload = () => {
            create_worker(photo);
        }
    }

    const create_worker = (photo) => {
        let { all_experiences_valid, experiences_arr } = validate_experiences("experience");
    
        if (all_experiences_valid) {
            let worker = { id: Date.now(), name, age, role, email, phone, enter_date, leave_date, photo, experiences_arr,};
            worker_list_arr.push(worker);
            localStorage.setItem("worker_list_arr", JSON.stringify(worker_list_arr));
            add_worker_modal.classList.remove("flex");
            add_worker_modal.classList.add("hidden");
            let preview = document.getElementById("img-preview");
            preview.src = "";
            preview.classList.add("hidden");
            add_worker_form.reset();
            experiences.classList.remove("flex");
            experiences.classList.add("hidden");
            document.querySelectorAll(".experience").forEach((experience) => {
                experience.remove();
            });
            add_worker_to_list(worker);
            no_worker_in_list.classList.add("hidden");
        }
    }
});

close_add_worker_modal.addEventListener("click", () => {
    add_worker_modal.classList.remove("flex");
    add_worker_modal.classList.add("hidden");
    let preview = document.getElementById("img-preview");
    preview.src = "";
    preview.classList.add("hidden");
    add_worker_form.reset();
    experiences.classList.remove("flex");
    experiences.classList.add("hidden");
    document.querySelectorAll(".experience").forEach((experience) => {
        experience.remove();
    });
    const allErrors = document.querySelectorAll('p[id$="_err"]');
    allErrors.forEach((error) => {
        error.classList.add("hidden");
        error.textContent = "";
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

    preview.onerror = () => {
        preview.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }
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

    if (!validate_leave_date(leave_date, "worker_leave_date_err")) return;

    if(!photo) {
        update_worker("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    } else {
        
        const tempImg = new Image();
        tempImg.src = photo;

        tempImg.onerror = () => {
            update_worker("https://cdn-icons-png.flaticon.com/512/149/149071.png");
        }

        tempImg.onload = () => {
            update_worker(photo);
        }
    }

    const update_worker = (photo) => {
        let { all_experiences_valid, experiences_arr } = validate_experiences("worker-experience");

        if (all_experiences_valid) {
            let worker = { id, name, age, role, email, phone, enter_date, leave_date, photo, experiences_arr,};

            let old_worker = worker_list_arr.findIndex((worker) => worker.id == id);
            worker_list_arr.splice(old_worker, 1, worker);
            localStorage.setItem("worker_list_arr", JSON.stringify(worker_list_arr));
            update_worker_list();
            document.getElementById("edit-worker-modal").remove();
        }
    }
}

const show_edit_worker_modal = (worker) => {
    let edit_worker_modal = document.createElement("div");
    edit_worker_modal.className ="w-screen h-screen bg-black absolute top-0 left-0 bg-opacity-60 flex justify-center items-center";
    edit_worker_modal.id = "edit-worker-modal";
    edit_worker_modal.innerHTML = update_modal(worker);

    let close_worker_modal = edit_worker_modal.querySelector("#close-modal");
    close_worker_modal.addEventListener("click", () => {
        edit_worker_modal.remove();
    });

    let edit_worker_form = edit_worker_modal.querySelector("#edit-worker-form");
    edit_worker_form.addEventListener("submit", e => {
        edit_worker(e, worker.id);
    });

    let add_worker_experience_btn = edit_worker_modal.querySelector("#add-worker-experience-btn");
    add_worker_experience_btn.addEventListener("click", () => {
        let worker_experiences = document.querySelector("#worker-experiences");
        let experiences_arr = document.querySelectorAll(".worker-experience");
        add_experience(experiences_arr, worker_experiences, "worker-experience");
    });

    let worker_experiences = edit_worker_modal.querySelectorAll(".worker-experience");
    worker_experiences.forEach((worker_experience, i) => {
        let close_worker_experience = worker_experience.querySelector(`#close-worker-experience-${i + 1}`);
        close_worker_experience.addEventListener("click", () => {
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

        preview.onerror = () => {
            preview.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        }
    
    });

    document.body.appendChild(edit_worker_modal);
}

room_btns.forEach(room_btn => {
    room_btn.addEventListener("click", room_btn_handler);
});

available_rooms.forEach(r => {
    load_room_workers(r, room_limits[r]);
})