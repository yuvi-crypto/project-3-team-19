# 🔥 Full Stack Project: React + FastAPI

This is a full-stack web application combining:

- 🖥️ **Frontend**: React.js (in `client/`)
- 🐍 **Backend**: FastAPI (in `server/`)

---

## 📁 Folder Structure

project-root/
    ├── client/ # React frontend 
    │ ├── src/
    │ ├── public/ 
    │ └── package.json 
    ├── server/ # FastAPI backend 
    │ ├── app/ # Python app code 
    │ │ └── main.py 
    │ ├── requirements.txt 
    ├── .gitignore 
    └── README.md


---

## 🛠️ Prerequisites

- Node.js (v14+)
- Python 3.7+
- Git

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/project3-19.git
cd 

2️⃣ Setting Up the Backend (FastAPI)

cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

🦙 Install Ollama and Pull a Model
If Ollama isn't installed yet:

# macOS
brew install ollama

# Linux (Ubuntu/Debian)
curl -fsSL https://ollama.com/install.sh | sh

Pull Model in Local

ollama pull qwen2.5:7b

✅ Run the FastAPI server

uvicorn app.main:app --reload

The backend will start at: http://127.0.0.1:8000

3️⃣ Setting Up the Frontend (React)

cd client
npm install

✅ Start the React app
npm start

The frontend will start at: http://localhost:3000