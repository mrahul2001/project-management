from projects.services import create_project, add_members, get_all_projects, get_project_by_title

def create():
    return create_project()

def add_members_to_project():
    return add_members()

def get_projects():
    return get_all_projects()

def get_project():
    return get_project_by_title()
