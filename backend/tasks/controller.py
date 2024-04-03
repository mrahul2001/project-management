from tasks.services import create_task, update_task, get_tasks

def create():
    return create_task()

def update():
    return update_task()

def get_task_by_project():
    return get_tasks()



