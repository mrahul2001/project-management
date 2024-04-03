from flask import request
from datetime import datetime
from cerberus import Validator
from bson import ObjectId

from config import mongo_db
from utils.auth_middleware import token_required
from utils.send_response import send_response
from tasks.schemas import create_task_schema
from utils.global_variables import member_roles, task_categories

@token_required
def create_task(token_data):
    data = request.json
    v = Validator(create_task_schema)

    if not v.validate(data):
        return send_response(v.errors, 'Task Not Created', 400)
    
    project_name = data['projectName']
    task_name = data['taskName']
    task_description = data['taskDescription']
    task_category = data['taskCategory']
    task_member_assigned = data['assignedMember']
    member_role = data['memberRole']

    project = mongo_db.projects.find_one({'title': project_name})

    if not project:
        return send_response('Project Not Present', 'Invalid Project', 400)

    if all(member != token_data['id'] for member in project['members']) and (project['owner'] != token_data['id']):
        return send_response('Neither member nor owner', 'Cannot add task', 400)
    
    if all(member != task_member_assigned for member in project['members']) and (project['owner'] != task_member_assigned):
        return send_response('Neither member nor owner', 'Cannot be asigned to', 400)
    
    if all(role != member_role for role in member_roles):
        return send_response('Inavlid Role', 'Task Not Created', 400)
    
    if all(category != task_category for category in task_categories):
        return send_response('Inavlid Task Category', 'Task Not Created', 400)

    new_task = {
        'project_name': project_name,
        'task_name': task_name,
        'task_description': task_description,
        'task_category': task_category,
        'task_member_assigned': task_member_assigned,
        'member_role': member_role,
        'created_at': datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        'updated_at': datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    }

    mongo_db.tasks.insert_one(new_task)

    return send_response({'Task': task_name}, 'Task Created', 200)

@token_required
def get_tasks(token_data):
    data = request.json
    project_name = data['projectName']
    tasks = list(mongo_db.tasks.find({'project_name': project_name}))

    for task in tasks:
        task['_id'] = str(task['_id'])

    return send_response(tasks, 'Tasks Fetched', 200)

@token_required
def update_task(token_data):
    data = request.json
    task_id = data['taskID']
    task = mongo_db.tasks.find_one({'_id': ObjectId(task_id)})

    if not task:
        return send_response('Invalid Task', 'Task Not Found', 404)

    project_name = mongo_db.tasks.find_one({'_id': ObjectId(task_id)})

    project = mongo_db.projects.find_one({'title': project_name['project_name']})

    if all(member != token_data['id'] for member in project['members']) and (project['owner'] != token_data['id']):
        return send_response('Neither member nor owner', 'Cannot update Task', 400)    

    updated_fields = {}
    if 'taskCategory' in data:
        if all(category != data['taskCategory'] for category in task_categories):
            return send_response('Inavlid Task Category', 'Task Not Updated', 400)
        updated_fields['task_category'] = data['taskCategory']

    if 'assignedMember' in data:
        if all(member != data['assignedMember'] for member in project['members']) and (project['owner'] != data['assignedMember']):
            return send_response('Assigned to Neither member nor owner', 'Cannot Update Task', 400)    
        updated_fields['task_member_assigned'] = data['assignedMember']

    if 'memberRole' in data:
        if all(role !=  data['memberRole'] for role in member_roles):
            return send_response('Inavlid Role', 'Task Not Updated', 400)
        updated_fields['member_role'] = data['memberRole']

    updated_fields['updated_at'] = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    
    mongo_db.tasks.update_one({'_id': ObjectId(task_id)}, {'$set': updated_fields})
    return send_response('Task Updated', 'Values Changed', 201)
