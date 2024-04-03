from users.services import create_user, user_login, get_user

def create():
    return create_user()

def login():
    return user_login()

def get_details():
    return get_user()
