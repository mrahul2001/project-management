from flask import request
import hashlib, jwt
from datetime import datetime, timedelta
from cerberus import Validator
import os

from config import mongo_db
from utils.auth_middleware import token_required
from utils.send_response import send_response
from users.schemas import create_user_schema, login_user_schema

def create_user():
    data = request.json

    v = Validator(create_user_schema)
    if not v.validate(data):
        return send_response(v.errors, 'User Not Created', 400)
    
    username = data['username']
    email = data['email']
    password = data['password']

    existing_user = mongo_db.users.find_one({'email': email})
    if existing_user:
        return send_response('User Already Exists', 'Duplicacy Error', 400)
    
    pas = hashlib.md5(password.encode())
    data['password'] = pas.hexdigest()

    mongo_db.users.insert_one(data)
    return send_response('User Created', {'username': username, 'email': email}, 200)

def user_login():
    data = request.json

    v = Validator(login_user_schema)

    if not v.validate(data):
        return send_response(v.errors, 'User Not Found, Unable to Login', 400)

    username = data['username']
    password = data['password']
    
    pas = hashlib.md5(password.encode())
    password = pas.hexdigest()

    user = mongo_db.users.find_one({'username': username})

    if not user:
        return send_response({}, 'Invalid Credentials', 404)

    x = {
        'id': user['email'],
        'exp' : str(datetime.utcnow() + timedelta(minutes = 30))
    }

    token = jwt.encode(x, os.getenv('SECRET_KEY'))
    return send_response(token, 'Token Generated', 200)
    

@token_required
def get_user(data):
    current_user_email = data['id']
    current_user = mongo_db.users.find_one({'email': current_user_email}, {'username': 1, 'email': 1, '_id': 0})
    print(current_user)
    return send_response(current_user, 'User Data Fetched', 200)
