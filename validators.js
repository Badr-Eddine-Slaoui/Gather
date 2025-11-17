import { available_roles } from "./globalVariables.js";

export const validate_name = (name, id) => {
    let name_err = document.getElementById(id);
    console.log(name_err);
    
    let name_regex = /^[a-zA-Z\s]{3,}$/;
    if (!name) {
        name_err.classList.remove("hidden");
        name_err.textContent = "Name is required";
        return false;
    } else {
        if (!name_regex.test(name)) {
            name_err.classList.remove("hidden");
            name_err.textContent =
            "Name must contain just letters, spaces, and at least 3 characters";
            return false;
        } else {
            name_err.classList.add("hidden");
            return true;
        }
    }
}

export const validate_age = (age, id) => {
    let age_err = document.getElementById(id);
    let age_regex = /^[0-9]{2,3}$/;
    if (!age) {
        age_err.classList.remove("hidden");
        age_err.textContent = "Age is required";
        return false;
    } else {
        if(!age_regex.test(age)) {
            age_err.classList.remove("hidden");
            age_err.textContent = "Age must contain just numbers, at least 2 characters";
            return false;
        } else {
            if(age < 18 || age > 100) {
                age_err.classList.remove("hidden");
                age_err.textContent = "Age must be between 18 and 100";
                return false;
            } else {
                age_err.classList.add("hidden");
                return true;
            }
        }
    }
}

export const validate_role = (role, id) => {
    let role_err = document.getElementById(id);
    if (!role) {
        role_err.classList.remove("hidden");
        role_err.textContent = "Role is required";
        return false;
    } else {
        if(!available_roles.includes(role)) {
            role_err.classList.remove("hidden");
            role_err.textContent = "Role is not available";
            return false;
        } else {
            role_err.classList.add("hidden");
            return true;
        }
    }
}

export const validate_email = (email, id) => {
    let email_err = document.getElementById(id);
    let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
        email_err.classList.remove("hidden");
        email_err.textContent = "Email is required";
        return false;
    } else {
        if(!email_regex.test(email)) {
            email_err.classList.remove("hidden");
            email_err.textContent = "Email is not valid";
            return false;
        } else {
            email_err.classList.add("hidden");
            return true;
        }
    }
}