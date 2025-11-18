export const list_worker = (worker) => {
    return `
        <div id="remove-worker-${worker.id}" class="close absolute top-1 right-1 rounded-md w-[2vh] h-[2vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[.8rem] cursor-pointer">x</div>
        <img src="${worker.photo}" alt="${worker.name}" class="w-[5vh] h-[5vh] rounded-full"></img>
        <div>
            <p class="name text-slate-500 w-[25vh] text-[1.2rem] font-bold truncate overflow-hidden text-ellipsis capitalize">${worker.name}</p>
            <p class="role text-[1rem] font-bold truncate overflow-hidden text-ellipsis capitalize">${worker.role}</p>
        </div>
        <div id="edit-worker-${worker.id}" class="edit absolute bottom-1 right-1 rounded-md w-[5vh] h-[2vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[.8rem] cursor-pointer">Edit</div>
    `
}

export const experience_template = (index) => {
  return `
        <div id="close-experience-${index}" class="absolute top-1 right-1 rounded-md w-[3vh] h-[3vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[1rem] cursor-pointer">x</div>
        <div class="w-full flex justify-between items-center">
            <div class="w-[40%] flex flex-col gap-y-2">
                <label for="title-${index}" class="text-[1.2rem] font-bold text-slate-500">Title:</label>
                <input type="text" name="title-${index}" id="title-${index}" class="border border-slate-500 rounded-md p-2">
                <p id="title_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
            </div>
            <div class="w-[40%] flex flex-col gap-y-2">
                <label for="company-${index}" class="text-[1.2rem] font-bold text-slate-500">Company:</label>
                <input type="text" name="company-${index}" id="company-${index}" class="border border-slate-500 rounded-md p-2">
                <p id="company_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
            </div>
        </div>
        <div class="w-full flex justify-between items-center">
            <div class="w-[40%] flex flex-col gap-y-2">
                <label for="start-date-${index}" class="text-[1.2rem] font-bold text-slate-500">Start Date:</label>
                <input type="datetime-local" name="start-date-${index}" id="start-date-${index}" class="border border-slate-500 rounded-md p-2">
                <p id="start_date_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
            </div>
            <div class="w-[40%] flex flex-col gap-y-2">
                <label for="end-date-${index}" class="text-[1.2rem] font-bold text-slate-500">End Date:</label>
                <input type="datetime-local" name="end-date-${index}" id="end-date-${index}" class="border border-slate-500 rounded-md p-2">
                <p id="end_date_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
            </div>
        </div>
    `;
}

export const profile = (worker) => {
    return `
        <div class="modal w-1/2 h-[90vh] bg-white rounded-lg flex flex-col items-center gap-y-5 overflow-y-scroll relative">
            <div id="close-modal" class="absolute top-1 right-1 rounded-lg w-[5vh] h-[5vh] bg-red-500 text-white flex justify-center items-center font-extrabold text-[1.5rem] cursor-pointer">x</div>
            <h1 class="text-[2rem] text-center mt-10 mb-5 font-extrabold text-orange-400">Worker Profile</h1>
            <div class="w-[90%] flex items-center gap-x-5">
                <img src="${worker.photo}" alt="${worker.name}" class="w-[15vh] h-[15vh] rounded-full"></img>
                <div class="flex flex-col gap-y-2">
                    <p class="name text-slate-500 text-[1.5rem] font-bold">${worker.name}</p>
                    <p class="age-role text-[1.2rem]">
                        <span>${worker.age} years</span> - <span>${worker.role}</span>
                    </p>
                </div>
            </div>
            <div class="row w-[90%] flex justify-between items-center text-[1.2rem]">
                <div class="w-full flex gap-x-2 text-[1.2rem]">
                    <p class="font-bold text-slate-500">Email:</p>
                    <p>${worker.email}</p>
                </div>
                <div class="w-full flex gap-x-2 text-[1.2rem]">
                    <p class="font-bold text-slate-500">Phone:</p>
                    <p>${worker.phone}</p>
                </div>
            </div>
            <div class="row w-[90%] flex justify-between items-center text-[1.2rem]">
                <div class="w-full flex gap-x-2 text-[1.2rem]">
                    <p class="font-bold text-slate-500">Start Date:</p>
                    <p>${new Date(worker.enter_date).toLocaleDateString("en-US")}</p>
                </div>
                <div class="w-full flex gap-x-2 text-[1.2rem]">
                    <p class="font-bold text-slate-500">End Date:</p>
                    <p>${new Date(worker.leave_date).toLocaleDateString("en-US")}</p>
                </div>
            </div>
            ${
                worker.experiences_arr.length > 0 ? `
                    <div class="w-[90%] border-t border-slate-500 flex flex-col gap-y-5">
                        <h2 class="text-[2rem] mt-10 mb-5 font-extrabold text-orange-400 text-center">Experiences</h2>
                        ${
                            worker.experiences_arr.map(experience => {
                                return `
                                    <div class="w-full flex flex-col gap-y-5 border-b border-slate-500 pb-5">
                                        <div class="row w-full flex justify-between items-center text-[1.2rem]">
                                            <div class="w-full flex gap-x-2 text-[1.2rem]">
                                                <p class="font-bold text-slate-500">Title:</p>
                                                <p>${experience.title}</p>
                                            </div>
                                            <div class="w-full flex gap-x-2 text-[1.2rem]">
                                                <p class="font-bold text-slate-500">Company:</p>
                                                <p>${experience.company}</p>
                                            </div>
                                        </div>
                                        <div class="row w-full flex justify-between items-center text-[1.2rem]">
                                            <div class="w-full flex gap-x-2 text-[1.2rem]">
                                                <p class="font-bold text-slate-500">Start Date:</p>
                                                <p>${new Date(experience.start_date).toLocaleDateString("en-US")}</p>
                                            </div>
                                            <div class="w-full flex gap-x-2 text-[1.2rem]">
                                                <p class="font-bold text-slate-500">End Date:</p>
                                                <p>${new Date(experience.end_date).toLocaleDateString("en-US")}</p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join("")
                        }
                    </div>
                `
                : ""
            }
        </div>
    `
}

export const update_modal = (worker) => {
    return `
        <div class="modal w-1/2 h-[90vh] bg-white rounded-lg relative">
            <div id="close-modal" class="absolute top-1 right-1 rounded-lg w-[5vh] h-[5vh] bg-red-500 text-white flex justify-center items-center font-extrabold text-[1.5rem] cursor-pointer">x</div>
            <h1 class="text-[3rem] my-10 font-extrabold text-orange-400 text-center">Update Worker</h1>
            <form id="edit-worker-form" class="w-full h-[70vh] flex items-center flex-col gap-5 overflow-y-scroll">
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-name" class="text-[1.2rem] font-bold text-slate-500">Name:</label>
                    <input type="text" value="${worker.name}" name="worker-name" id="worker-name" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_name_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-age" class="text-[1.2rem] font-bold text-slate-500">Age:</label>
                    <input type="text" value="${worker.age}" name="worker-age" id="worker-age" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_age_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-role" class="text-[1.2rem] font-bold text-slate-500">Role:</label>
                    <select class="border border-slate-500 rounded-md p-2" name="worker-role" id="worker-role">
                        <option value="">--Choose Role--</option>
                        <option value="receptionist" ${worker.role === "receptionist" ? "selected" : ""}>Receptionist</option>
                        <option value="it" ${worker.role === "it" ? "selected" : ""}>IT</option>
                        <option value="security" ${worker.role === "security" ? "selected" : ""}>Security guard</option>
                        <option value="manager" ${worker.role === "manager" ? "selected" : ""}>Manager</option>
                        <option value="cleaner" ${worker.role === "cleaner" ? "selected" : ""}>Cleaner</option>
                        <option value="visiter" ${worker.role === "visiter" ? "selected" : ""}>Visiter</option>
                    </select>
                    <p id="worker_role_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-photo" class="text-[1.2rem] font-bold text-slate-500">Photo (URL):</label>
                    <input type="text" value="${worker.photo}" name="worker-photo" id="worker-photo" class="border border-slate-500 rounded-md p-2">
                </div>
                <div class="w-[90%] flex justify-center items-center">
                    <img id="img-preview" src="${worker.photo}" alt="Preview" class="w-[20vh] h-[20vh] rounded-full">
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-email" class="text-[1.2rem] font-bold text-slate-500">Email:</label>
                    <input type="email" value="${worker.email}" name="worker-email" id="worker-email" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_email_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-phone" class="text-[1.2rem] font-bold text-slate-500">Phone:</label>
                    <input type="tel" value="${worker.phone}" name="worker-phone" id="worker-phone" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_phone_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-enter-date" class="text-[1.2rem] font-bold text-slate-500">Enter Date:</label>
                    <input type="datetime-local" value="${worker.enter_date}" name="worker-enter-date" id="worker-enter-date" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_enter_date_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                <div class="w-[90%] flex flex-col gap-y-2">
                    <label for="worker-leave-date" class="text-[1.2rem] font-bold text-slate-500">Leave Date:</label>
                    <input type="datetime-local" value="${worker.leave_date}" name="worker-leave-date" id="worker-leave-date" class="border border-slate-500 rounded-md p-2">
                    <p id="worker_leave_date_err" class="text-red-500 text-[1rem] hidden"></p>
                </div>
                    <div id="worker-experiences" class="w-[90%] border-t border-slate-500 flex-col gap-y-5 ${worker.experiences_arr.length === 0 ? "hidden" : ""}">
                        <h2 class="text-[2rem] mt-10 mb-5 font-extrabold text-orange-400 text-center">Experiences</h2>
                        ${
                            worker.experiences_arr.map((experience, i) => {
                                let index = i + 1;   
                                return `
                                    <div class="worker-experience w-full flex flex-col gap-y-5 py-5 border-b border-slate-500 relative">
                                        <div id="close-worker-experience-${index}" class="absolute top-1 right-1 rounded-md w-[3vh] h-[3vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[1rem] cursor-pointer">x</div>
                                        <div class="w-full flex justify-between items-center">
                                            <div class="w-[40%] flex flex-col gap-y-2">
                                                <label for="title-${index}" class="text-[1.2rem] font-bold text-slate-500">Title:</label>
                                                <input value="${experience.title}" type="text" name="title-${index}" id="title-${index}" class="border border-slate-500 rounded-md p-2">
                                                <p id="title_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
                                            </div>
                                            <div class="w-[40%] flex flex-col gap-y-2">
                                                <label for="company-${index}" class="text-[1.2rem] font-bold text-slate-500">Company:</label>
                                                <input value="${experience.company}" type="text" name="company-${index}" id="company-${index}" class="border border-slate-500 rounded-md p-2">
                                                <p id="company_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
                                            </div>
                                        </div>
                                        <div class="w-full flex justify-between items-center">
                                            <div class="w-[40%] flex flex-col gap-y-2">
                                                <label for="start-date-${index}" class="text-[1.2rem] font-bold text-slate-500">Start Date:</label>
                                                <input value="${experience.start_date}" type="datetime-local" name="start-date-${index}" id="start-date-${index}" class="border border-slate-500 rounded-md p-2">
                                                <p id="start_date_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
                                            </div>
                                            <div class="w-[40%] flex flex-col gap-y-2">
                                                <label for="end-date-${index}" class="text-[1.2rem] font-bold text-slate-500">End Date:</label>
                                                <input value="${experience.end_date}" type="datetime-local" name="end-date-${index}" id="end-date-${index}" class="border border-slate-500 rounded-md p-2">
                                                <p id="end_date_err_${index}" class="text-red-500 text-[1rem] hidden"></p>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            })
                        }
                    </div>
                <div class="w-[90%] flex justify-between items-center">
                    <button id="add-worker-experience-btn" type="button" class="bg-orange-400 py-3 px-5 text-[1.2rem] text-white font-bold rounded-md">Add Experience</button>
                    <button type="submit" class="bg-blue-400 py-3 px-5 text-[1.2rem] text-white font-bold rounded-md">Submit</button>
                </div>
            </form>
        </div>
    `
}

export const delete_modal = () => {
    return `
        <div class="modal w-1/3 h-[50vh] bg-white rounded-lg relative flex flex-col gap-y-20 justify-center items-center">
            <h2 class="text-center text-[2rem] font-extrabold">Are you sure you want to delete this worker?</h2>
            <div class="flex justify-between items-center gap-x-10">
                <button id="delete-worker-btn" class="bg-red-500 py-3 px-5 text-[1.2rem] text-white font-bold rounded-md">Delete</button>
                <button id="cancel-delete-worker-btn" class="bg-blue-500 py-3 px-5 text-[1.2rem] text-white font-bold rounded-md">Cancel</button>
            </div>
        </div>
    `
}

export const room_worker = (worker) => {
    return `
        <div id="remove-worker-${worker.id}" class="remove-btn absolute top-[2px] right-[2px] rounded-md w-[2vh] h-[2vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[.8rem] cursor-pointer">x</div>
        <img src="${worker.photo}" alt="${worker.name}" class="bg-red-500 w-[2vh] h-[2vh] rounded-full"></img>
        <p class="text-slate-500 w-[8vh] text-[0.8rem] font-bold truncate overflow-hidden text-ellipsis">${worker.name}</p>
    `;
}

export const available_workers = (workers) => {
    return `
        <div class="modal w-1/3 h-[90vh] bg-white rounded-lg relative">
            <div id="close-modal" class="absolute top-1 right-1 rounded-lg w-[5vh] h-[5vh] bg-red-500 text-white flex justify-center items-center font-extrabold text-[1.5rem] cursor-pointer">x</div>
            <div class="w-full h-[10vh] flex items-center justify-center gap-x-2 my-10">
                <h1 class="text-[2rem] font-extrabold text-slate-500">Available Workers</h1>
            </div>
            <div class="w-full h-[80vh] overflow-y-scroll">
                ${
                  workers.length > 0
                    ? workers
                        .map((worker) => {
                          return `
                            <div title="${worker.role}" class="worker w-[90%] mx-auto flex items-center gap-x-5 border border-slate-500 p-2 rounded-lg cursor-pointer my-5">
                                <img src="${worker.photo}" alt="${worker.name}" class="w-[8vh] h-[8vh] rounded-full"></img>
                                <div>
                                    <p class="text-slate-500 text-[1.5rem] font-bold">${worker.name}</p>
                                    <p class="text-[1rem] font-bold capitalize">${worker.role}</p>
                                </div>
                            </div>
                        `;
                        })
                        .join("")
                    : `<div class="w-full h-[10vh] flex justify-center items-center text-[2rem] font-extrabold text-slate-500">No workers found</div>`
                }
            </div>
        </div>
    `;
}