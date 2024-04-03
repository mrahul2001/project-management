from flask import request
from datetime import datetime
from cerberus import Validator
import hashlib
from projects.email_function.send_email import send_email

from config import mongo_db
from utils.auth_middleware import token_required
from utils.send_response import send_response
from projects.schemas import create_project_schema, add_members_schema
from random import randint

@token_required
def create_project(token_data):
    data = request.json

    v = Validator(create_project_schema)

    if not v.validate(data):
        return send_response(v.errors, 'Project Not Created', 400)

    title = data['title']
    description = data['description']

    existing_project = mongo_db.projects.find_one({'title': title})

    if existing_project:
        return send_response('Cannot Create Duplicate Project', 'Already Exists', 400)

    new_project = {
        'title': title,
        'description': description,
        'owner': token_data['id'],
        'createdAt': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        'updatedAt': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        'members': []
    } 

    created_project = new_project
    mongo_db.projects.insert_one(new_project)

    created_project['_id'] = str(created_project['_id'])

    return send_response('Project Created', created_project, 200)

@token_required
def add_members(token_data):
    data = request.json

    v = Validator(add_members_schema)
    if not v.validate(data):
        return send_response(v.errors, 'Member Not Added', 400)

    project_name = data['projectName']
    member_email = data['memberEmail']

    project_owner = mongo_db.projects.find_one({'owner': token_data['id']})
    if project_owner['owner'] != token_data['id']:
        return send_response('Not ur project', {}, 400) 

    existing_user = mongo_db.users.find_one({'email': member_email})
    if not existing_user:
        username = member_email.split('@')[0]
        password = randint(100000, 999999)
        password = str(password)

        body = f'Username: {username} \nPassword: {password}'
        
        pas = hashlib.md5(password.encode())
        password = pas.hexdigest()
        added_user = {
            'username': username,
            'email': member_email,
            'password': password
        }

        send_email(member_email, 'Account Created', body)
        mongo_db.users.insert_one(added_user)
        project = mongo_db.projects.find_one({'title': project_name})
        project['members'].append(member_email)
        mongo_db.projects.update_one({'_id': project['_id']}, {'$set': {'members': project['members']}})

        return send_response(f'User with email {member_email} does not exist, So sending email', 'User Not Found, Mail sent and User Created', 201)
    
    project = mongo_db.projects.find_one({'title': project_name})
    if project:
        if any(member == member_email for member in project['members']):
            return send_response('Member already Present', 'Member Not added', 400)
        
        project['members'].append(member_email)
        mongo_db.projects.update_one({'_id': project['_id']}, {'$set': {'members': project['members']}})

        return send_response('Member added to project', {}, 200)
    else:
        return send_response('Project not found', 'Project Not Found', 404)
    
def get_all_projects():
    projects = list(mongo_db.projects.find())
    for project in projects:
        project['_id'] = str(project['_id'])

    return send_response(projects, 'All Projects Fetched', 200)

def get_project_by_title():
    data = request.json
    title = data['title']
    project = mongo_db.projects.find_one({'title': title})

    project['_id'] = str(project['_id'])
    return send_response(project, 'Project Fetched', 200)

