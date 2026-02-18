# 🎫 Support Ticket System

A full-stack Support Ticket System built using Django, React, PostgreSQL, and OpenAI API.

This application allows users to:
- Submit support tickets
- Automatically classify tickets using an LLM
- Override AI suggestions
- Filter & search tickets
- Update ticket status
- View aggregated dashboard statistics
- Run the entire system using Docker

# 🚀 Tech Stack

| Backend       |  Python 3.11, Django, Django REST Framework   |
|               |   Django Filter, PostgreSQL,                  |
|               |   OpenAI API (gpt-4o-mini) ,  Docker          |
|               |                                               |
|Frontend       |     React, Axios ,CSS                         |
|               |                                               |
|Infrastructure | Docker, Docker Compose                        |                        

---

# 📁 Project Structure

```text
SMART TICKET MANAGER/
│
├── docker-compose.yml
├── .env
├── README.md
│
├── support_system/ # Django Backend
│ ├── Dockerfile
│ ├── requirements.txt
│ ├── manage.py
│ ├── support_system/
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── ...
│ └── tickets/
│ ├── models.py
│ ├── serializers.py
│ ├── views.py
│ └── urls.py
│
└── frontend/ # React Frontend
├── Dockerfile
├── package.json
├── public/
│ ├── index.html
│ └── style.css
└── src/
├── App.js
├── api.js
└── components/
├── TicketForm.js
├── TicketList.js
└── StatsDashboard.js
```

---

# 🛠 Backend Setup (Without Docker)

## 1️⃣ Create Virtual Environment
```
python -m venv venv
Windows:
venv\Scripts\activate
Mac/Linux:
source venv/bin/activate
yaml
```
## 2️⃣ Install Required Libraries
```
pip install Django
pip install djangorestframework
pip install django-filter
pip install django-cors-headers
pip install psycopg2-binary
pip install openai
pip install python-dotenv
```
Or simply:
```
pip install -r requirements.txt
```
## 3️⃣ Run Migrations
```
python manage.py makemigrations
python manage.py migrate
```
## 4️⃣ Run Backend Server
```
python manage.py runserver
Backend runs at:
http://localhost:8000/api/
```
# 💻 Frontend Setup (Without Docker)

Navigate to frontend folder:
```
cd frontend
Install dependencies:

npm install
npm install axios
Run:
npm start
Frontend runs at:

http://localhost:3000
```

# 🤖 LLM Setup
```
Create a `.env` file in the root directory:

OPENAI_API_KEY=your_openai_api_key_here
The classify endpoint:

POST /api/tickets/classify/
Uses OpenAI model: `gpt-4o-mini`
```

# 🐳 Running With Docker (Recommended)

## 1️⃣ Add Environment Variable
```
Create `.env` in root:
OPENAI_API_KEY=your_key_here
```

## 2️⃣ Build & Run

From root directory:
```
docker-compose up --build
```

## 3️⃣ Access Application
```
Frontend:
http://localhost:3000

Backend:
http://localhost:8000/api/
```

## 4️⃣ Stop Containers
```
docker-compose down

arduino


To remove volumes:

docker-compose down -v
```

# 📊 Stats Implementation

The `/api/tickets/stats/` endpoint uses:

- `Count()`
- `Avg()`
- `annotate()`

All aggregation is performed at the database level using Django ORM.

No Python loops are used for statistics.

---

# 🔎 API Endpoints
```
### Create Ticket
POST /api/tickets/

shell


### List Tickets
GET /api/tickets/

Filters:
?category=
?priority=
?status=
?search=

shell
Copy code

### Update Ticket
PATCH /api/tickets/<id>/

shell
Copy code

### Stats
GET /api/tickets/stats/

shell
Copy code

### Classify Ticket
POST /api/tickets/classify/
```

# 📌 Design Decisions

- Used ModelViewSet for clean REST API structure
- Enforced DB-level constraints using Django choices
- Used database-level aggregation for stats
- Implemented graceful fallback for LLM failures
- Separated backend, frontend, and database services in Docker
- Focused on functionality over heavy UI styling


Ayushi Singh  
Support Ticket System – Tech Intern Assessment
