from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import User, LoginData
import json
import os

USER_STORAGE = "app/users.json"
app = FastAPI()

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_users():
    if os.path.exists(USER_STORAGE):
        with open(USER_STORAGE, "r") as file:
            return json.load(file)
    return {}

def save_user(user_data):
    with open(USER_STORAGE, "w") as file:
        json.dump(user_data, file)

@app.post("/api/signup")
async def sign_up(user: User):
    users = load_users()

    if user.username in users:
        raise HTTPException(status_code=400, detail="User already exists")
    users[user.username] = user.dict()
    save_user(users)
    return {"message": "User signed up successfully"}

@app.post("/api/login")
async def log_in(data: LoginData):
    users = load_users()

    if data.username not in users:
        raise HTTPException(status_code=404, detail="User not found")

    if users[data.username]["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {"message": "Login successful"}