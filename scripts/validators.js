import { available_roles } from "./globalVariables.js";

export const validate_name = (name, id) => {
  let name_err = document.getElementById(id);

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
};

export const validate_age = (age, id) => {
  let age_err = document.getElementById(id);
  let age_regex = /^[0-9]{2,3}$/;
  if (!age) {
    age_err.classList.remove("hidden");
    age_err.textContent = "Age is required";
    return false;
  } else {
    if (!age_regex.test(age)) {
      age_err.classList.remove("hidden");
      age_err.textContent =
        "Age must contain just numbers, at least 2 characters";
      return false;
    } else {
      if (age < 18 || age > 100) {
        age_err.classList.remove("hidden");
        age_err.textContent = "Age must be between 18 and 100";
        return false;
      } else {
        age_err.classList.add("hidden");
        return true;
      }
    }
  }
};

export const validate_role = (role, id) => {
  let role_err = document.getElementById(id);
  if (!role) {
    role_err.classList.remove("hidden");
    role_err.textContent = "Role is required";
    return false;
  } else {
    if (!available_roles.includes(role)) {
      role_err.classList.remove("hidden");
      role_err.textContent = "Role is not available";
      return false;
    } else {
      role_err.classList.add("hidden");
      return true;
    }
  }
};

export const validate_email = (email, id) => {
  let email_err = document.getElementById(id);
  let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    email_err.classList.remove("hidden");
    email_err.textContent = "Email is required";
    return false;
  } else {
    if (!email_regex.test(email)) {
      email_err.classList.remove("hidden");
      email_err.textContent = "Email is not valid";
      return false;
    } else {
      email_err.classList.add("hidden");
      return true;
    }
  }
};

export const validate_phone = (phone, id) => {
  let phone_err = document.getElementById(id);
  let phone_regex = /^[0-9]{10}$/;
  if (!phone) {
    phone_err.classList.remove("hidden");
    phone_err.textContent = "Phone is required";
    return false;
  } else {
    if (!phone_regex.test(phone)) {
      phone_err.classList.remove("hidden");
      phone_err.textContent = "Phone is not valid";
      return false;
    } else {
      phone_err.classList.add("hidden");
      return true;
    }
  }
};

export const validate_enter_date = (enter_date, id) => {
  let enter_date_err = document.getElementById(id);
  if (!enter_date) {
    enter_date_err.classList.remove("hidden");
    enter_date_err.textContent = "Enter Date is required";
    return false;
  } else {
    let now = new Date();
    let enter_date_obj = new Date(enter_date);
    if (enter_date_obj < now) {
      enter_date_err.classList.remove("hidden");
      enter_date_err.textContent = "Enter Date must be in the future";
      return false;
    } else {
      enter_date_err.classList.add("hidden");
      return true;
    }
  }
};

export const validate_leave_date = (enter_date, leave_date, id) => {
  let leave_date_err = document.getElementById(id);
  if (!leave_date) {
    leave_date_err.classList.remove("hidden");
    leave_date_err.textContent = "Leave Date is required";
    return false;
  } else {
    let enter_date_obj = new Date(enter_date);
    let leave_date_obj = new Date(leave_date);

    if (leave_date_obj < enter_date_obj) {
      leave_date_err.classList.remove("hidden");
      leave_date_err.textContent = "Leave Date must be after Enter Date";
      return false;
    } else {
      leave_date_err.classList.add("hidden");
      return true;
    }
  }
};

export const validate_experiences = (class_name) => {
  let experiences_arr = [];
  let all_experiences_valid = true;
  if (document.querySelectorAll(`.${class_name}`).length !== 0) {
    let experiences = Array.from(document.querySelectorAll(`.${class_name}`));
    experiences.map((experience, i) => {
      let title = experience.querySelector(`#title-${i + 1}`).value;
      let company = experience.querySelector(`#company-${i + 1}`).value;
      let start_date = experience.querySelector(`#start-date-${i + 1}`).value;
      let end_date = experience.querySelector(`#end-date-${i + 1}`).value;

      let title_err = experience.querySelector(`#title_err_${i + 1}`);
      let title_regex = /^[a-zA-Z0-9\s]{3,}$/;
      if (!title) {
        title_err.classList.remove("hidden");
        title_err.textContent = "Title is required";
        all_experiences_valid = false;
        return { all_experiences_valid, experiences_arr };
      } else {
        if (!title_regex.test(title)) {
          title_err.classList.remove("hidden");
          title_err.textContent =
            "Title must contain just letters, numbers, spaces, and at least 3 characters";
          all_experiences_valid = false;
          return { all_experiences_valid, experiences_arr };
        } else {
          title_err.classList.add("hidden");
        }
      }

      let company_err = experience.querySelector(`#company_err_${i + 1}`);
      let company_regex = /^[a-zA-Z0-9\s]{3,}$/;
      if (!company) {
        company_err.classList.remove("hidden");
        company_err.textContent = "Company is required";
        all_experiences_valid = false;
        return { all_experiences_valid, experiences_arr };
      } else {
        if (!company_regex.test(company)) {
          company_err.classList.remove("hidden");
          company_err.textContent =
            "Company must contain just letters, numbers, spaces, and at least 3 characters";
          all_experiences_valid = false;
          return { all_experiences_valid, experiences_arr };
        } else {
          company_err.classList.add("hidden");
        }
      }

      let start_date_err = experience.querySelector(`#start_date_err_${i + 1}`);
      if (!start_date) {
        start_date_err.classList.remove("hidden");
        start_date_err.textContent = "Start Date is required";
        all_experiences_valid = false;
        return { all_experiences_valid, experiences_arr };
      } else {
        let now = new Date();
        let start_date_obj = new Date(start_date);
        if (start_date_obj > now) {
          start_date_err.classList.remove("hidden");
          start_date_err.textContent = "Start Date must be in the past";
          all_experiences_valid = false;
          return { all_experiences_valid, experiences_arr };
        } else {
          start_date_err.classList.add("hidden");
        }
      }

      let end_date_err = experience.querySelector(`#end_date_err_${i + 1}`);
      if (!end_date) {
        end_date_err.classList.remove("hidden");
        end_date_err.textContent = "End Date is required";
        all_experiences_valid = false;
        return { all_experiences_valid, experiences_arr };
      } else {
        let start_date_obj = new Date(start_date);
        let end_date_obj = new Date(end_date);
        if (end_date_obj < start_date_obj) {
          end_date_err.classList.remove("hidden");
          end_date_err.textContent = "End Date must be after Start Date";
          all_experiences_valid = false;
          return { all_experiences_valid, experiences_arr };
        } else {
          end_date_err.classList.add("hidden");
        }
      }

      let experience_obj = { title, company, start_date, end_date };
      experiences_arr.push(experience_obj);
      all_experiences_valid = true;
    });
  }

  return { all_experiences_valid, experiences_arr };
};
