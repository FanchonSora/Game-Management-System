from pydantic import BaseModel

# User data model for sign-up
class User(BaseModel):
    username: str
    name: str
    email: str
    avatar: str = None
    backgroundImage: str = None
    currentPassword: str
    newPassword: str
    confirmPassword: str

# Login data model
class LoginData(BaseModel):
    username: str
    password: str