from pydantic import BaseModel

# User data model for sign-up
class User(BaseModel):
    username: str
    email: str
    password: str

# Login data model
class LoginData(BaseModel):
    username: str
    password: str