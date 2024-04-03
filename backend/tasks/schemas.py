create_task_schema = {
    'projectName': {
        'type': 'string',
        'required': True
        },
    'taskName': {
        'type': 'string',
        'required': True
        },
    'taskDescription': {
        'type': 'string',
        'required': True
        },
    'taskCategory': {
        'type': 'string',
        'required': True
        },
    'assignedMember': {
        'type': 'string',
        'required': True
        },
    'memberRole': {
        'type': 'string',
        'required': True
        }
}

update_task_schema = {
    'taskID': {
        'type': 'string',
        'required': True
        },
    'taskCategory': {
        'type': 'string'
        },
    'assignedMember': {
        'type': 'string'
        },
    'memberRole': {
        'type': 'string'
        }
}