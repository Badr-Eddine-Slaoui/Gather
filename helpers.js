import { no_worker_in_list, worker_list } from "./globalVariables.js";
import { show_edit_worker_modal, worker_list_arr } from "./script.js";
import { available_workers, delete_modal, experience_template, list_worker, profile, room_worker } from "./templates.js";

export const add_experience = (arr, parent, class_name) => {

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

export const add_worker_to_list = (worker) => {
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

export const show_worker_profile = (worker) => {
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

export const load_worker_list = (arr = worker_list_arr) => {
    if (arr.length > 0) {
        no_worker_in_list.classList.add("hidden");
        arr.forEach((worker) => {
        add_worker_to_list(worker);
        });
    } else {
        no_worker_in_list.classList.remove("hidden");
    }
};

export const update_worker_list = (arr = worker_list_arr) => {
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

export const show_available_workers_list = (workers, room) => {
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

export const room_btn_handler = (e) => {
    let id = e.target.parentElement.parentElement.id;
    let workers = worker_list_arr.filter((worker) => room_by_roles[id].includes(worker.role));
    show_available_workers_list(workers, id);
};