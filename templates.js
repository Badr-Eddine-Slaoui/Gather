export const list_worker = (worker) => {
    return `
        <div id="remove-worker" class="absolute top-1 right-1 rounded-md w-[2vh] h-[2vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[.8rem] cursor-pointer">x</div>
        <img src="${worker.photo}" alt="${worker.name}" class="w-[5vh] h-[5vh] rounded-full"></img>
        <div>
            <p class="text-slate-500 w-[25vh] text-[1.2rem] font-bold truncate overflow-hidden text-ellipsis capitalize">${worker.name}</p>
            <p class="text-[1rem] font-bold truncate overflow-hidden text-ellipsis capitalize">${worker.role}</p>
        </div>
        <div id="edit-worker" class="absolute bottom-1 right-1 rounded-md w-[5vh] h-[2vh] bg-orange-400 text-white flex justify-center items-center font-extrabold text-[.8rem] cursor-pointer">Edit</div>
    `
}