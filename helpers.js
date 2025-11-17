import { worker_list } from "./globalVariables.js";
import { experience_template, list_worker, profile } from "./templates.js";

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