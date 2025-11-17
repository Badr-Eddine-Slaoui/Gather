import { add_experience_btn, add_worker_btn, add_worker_form, add_worker_modal, close_add_worker_modal, experiences, img, no_worker_in_list } from "./globalVariables.js";
import { add_experience, add_worker_to_list } from "./helpers.js";
import { validate_age, validate_email, validate_enter_date, validate_experiences, validate_leave_date, validate_name, validate_phone, validate_role } from "./validators.js";

let worker_list_arr = JSON.parse(localStorage.getItem("worker_list_arr") || "[]");

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

load_worker_list();