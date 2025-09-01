# 🏫 SchoolSphere

SchoolSphere is a modern web application designed to simplify the management and presentation of school data.  
It allows schools to showcase their information, images, and details in an organized and user-friendly way.  

---

## 🚀 Features
- 📚 Add, edit, and manage school data with ease.  
- 🖼️ Upload and display school images.  
- 🌍 Multilingual support (future-ready).  
- ⚡ Fast, responsive, and optimized frontend.  
- 🔐 Secure MySQL database integration.  

---

## 🛠️ Tech Stack
- **Frontend**: Next.js, React, TailwindCSS  
- **Backend**: Node.js (API routes)  
- **Database**: MySQL (Dockerized)  
- **Hosting**: Vercel (frontend) & Docker for local DB  

---

## 🐳 Docker Setup

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/schoolsphere.git
cd schoolsphere
2. Configure environment variables
Create a .env file in the root folder:

env
Copy code
MYSQL_ROOT_PASSWORD=StrongRootPass123!
MYSQL_DATABASE=schools
MYSQL_USER=schooluser
MYSQL_PASSWORD=schoolpass
3. Start Docker services:
bash
Copy code
docker-compose up -d
This will spin up a MySQL container with the configured database.

▶️ Running the Project
Development (Localhost):
bash
Copy code
npm install
npm run dev
Open http://localhost:3000 in your browser.

Connects to the local Dockerized MySQL DB.

Production (Deployed on Vercel):
The frontend is hosted on Vercel.

For database access, you must use a cloud-hosted MySQL service (e.g., Railway, PlanetScale, Aiven, Supabase, etc.) instead of local Docker.

Add your production DB credentials in Vercel Environment Variables.

🔑 Environment Variables
Make sure to configure these both locally (.env) and in your hosting provider:

env
Copy code
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=schooluser
DATABASE_PASSWORD=schoolpass
DATABASE_NAME=schools
📷 Screenshots
(Add screenshots of your website UI here to make the README more attractive!)

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a pull request.

📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.
