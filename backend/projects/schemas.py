create_project_schema = {
    'title': {
        'type': 'string',
        'required': True
        },
    'description': {
        'type': 'string',
        'required': True
        }  
}

add_members_schema = {
    'projectName': {
        'type': 'string',
        'required': True
        },
    'memberEmail': {
        'type': 'string',
        'required': True
        }  
}

