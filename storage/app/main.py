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

@app.get("/api/profile/{username}")
async def get_profile(username: str):
    users = load_users()
    
    if username not in users:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = users[username]
    
    return {
        "username": user_data["username"],
        "email": user_data["email"],
        "profile_picture": "avatar.jpg",
        "profile_banner": "profilebanner.jpg",
        "recent_activity": [
            {"id": 1, "title": "Among Us", "image": "game/Among Us.jpg", "playTime": "1.3 hrs on record", "lastPlayed": "17 Nov", "achievementProgress": "1 of 1"},
            {"id": 2, "title": "F1 2024", "image": "game/F1 24.jpg", "playTime": "41 hrs on record", "lastPlayed": "10 Nov", "achievementProgress": "0 of 24"},
        ]
    }
@app.put("/api/profile/update")
async def update_profile(user_data: User):
    users = load_users()

    if user_data.username not in users:
        raise HTTPException(status_code=404, detail="User not found")

    users[user_data.username].update(user_data.dict())
    save_user(users)
    
    return {"message": "Profile updated successfully"}
