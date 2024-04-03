create_user_schema = {
    'username': {
        'type': 'string',
        'required': True
        },
    'email': {
        'type': 'string',
        'required': True
        },
    'password': {
        'type': 'string',
        'required': True
        }
}

login_user_schema = {
    'username': {
        'type': 'string',
        'required': True
        },
    'password': {
        'type': 'string',
        'required': True
        }
}
