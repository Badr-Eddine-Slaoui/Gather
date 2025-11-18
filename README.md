# WorkSphere — Visual & Interactive Staff Management

WorkSphere is a modern web application designed to manage workplace personnel directly on an interactive floor map.  
The goal is to provide a smooth, intuitive, and responsive interface where employees can be added, assigned to zones, moved, or removed in real-time while respecting business rules related to their roles.

---

## 🌐 Live Demo
- **GitHub Pages:** _link_here_
- **Vercel:** _link_here_

---

## 📌 Features

### 👩‍💼 Staff Management
- Add new employees via a modal form  
- Dynamic “Work Experience” fields  
- Real-time photo preview  
- Edit or remove employees (optional feature)  
- Search & filter by name or role (optional)

### 📍 Interactive Floor Plan
- 6 building zones:
  - Conference Room  
  - Reception  
  - Server Room  
  - Security Room  
  - Staff Room  
  - Archive Room  
- Assign employees according to access rules  
- Remove employees from zones (returns them to “Unassigned Staff”)  
- Visual highlights for mandatory-empty zones  
- Zone capacity limits  
- Optional Drag & Drop support  
- Optional automatic reorganization mode

### 🔒 Role-Based Access Logic
- **Reception →** Receptionists only  
- **Server Room →** IT Technicians only  
- **Security Room →** Security Agents only  
- **Manager →** Can be placed anywhere  
- **Cleaning →** Anywhere except Archive Room  
- **Others →** Free access except restricted zones  

### 📱 Fully Responsive UI
- Desktop (large + small)  
- Tablet (portrait + landscape)  
- Mobile (portrait + landscape)  
- Smooth CSS transitions and animations  
- Layout built using Flexbox & CSS Grid

---

## 🛠️ Tech Stack
- **HTML5**  
- **TailwindCSS**  
- **JavaScript (ES6 modules)**  
- **GitHub Projects** — Kanban Board  
- **GitHub Pages & Vercel** — Deployment

---

## 📂 Project Structure

```bash
/
├── images/
│ └── plan.jpg
├── node_modules/
├── scripts/
│ ├── globalVariables.js
│ ├── script.js
│ ├── template.js
│ └── validators.js
├── styles/
│ ├── input.css
│ └── style.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── tailwindcss.config.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/worksphere.git
cd worksphere
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run Tailwind watcher

```bash
npm run watch
```


### 4️⃣ Open the app

Open index.html in your browser or run a local development server.

## 📐 Design Principles

- Modern and minimalist UI

- Rounded shapes, soft edges

- Smooth animations

- Consistent color palette (green, orange, red for actions)

- Intuitive iconography

- Default placeholder image for staff without a photo

---

## 📦 Development Workflow

Agile / Scrum

- User Stories organized using GitHub Projects (Kanban)

- Tasks moved through: To Do → In Progress → Done

Version Control

- Optional branching strategy for features

- Clean, descriptive commit messages

Code Quality

- HTML & CSS validated with W3C Validator

- Modular JavaScript (ES6 imports)

- Clear and maintainable file structure

---

## 🚀 Deployment

The project is deployed using:

- GitHub Pages

- Vercel

Updates appear automatically after pushing to the main branch.

---

## ✨ Optional Bonus Features

- Drag & Drop employees between zones

- Auto-save layout state in localStorage

- Edit employee details

- Search & filtering

- Automatic employee redistribution

---

## 📄 License

This project is published under the MIT License.
