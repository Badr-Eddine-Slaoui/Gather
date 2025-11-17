import { add_experience_btn, add_worker_btn, add_worker_form, add_worker_modal, close_add_worker_modal, experiences, img, no_worker_in_list, room_btns } from "./globalVariables.js";
import { add_experience, add_worker_to_list, load_worker_list, update_worker_list } from "./helpers.js";
import { update_modal } from "./templates.js";
import { validate_age, validate_email, validate_enter_date, validate_experiences, validate_leave_date, validate_name, validate_phone, validate_role } from "./validators.js";

export let worker_list_arr = JSON.parse(localStorage.getItem("worker_list_arr") || "[]");

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

export const show_edit_worker_modal = (worker) => {
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