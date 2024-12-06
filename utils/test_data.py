import random
import string

def generate_random_string(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def generate_random_email():
    return f"{generate_random_string()}@example.com"

def generate_random_password(length=12):
    return ''.join(random.choices(string.ascii_letters + string.digits + string.punctuation, k=length))

TEST_USERS = [
    {"username": "testuser1", "password": "password123", "email": "testuser1@example.com"},
    {"username": "testuser2", "password": "password456", "email": "testuser2@example.com"},
]