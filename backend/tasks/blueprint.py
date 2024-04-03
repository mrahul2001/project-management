from flask import Blueprint
from tasks.controller import create, update, get_task_by_project

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/create', methods = ['POST'])(create)
blueprint.route('/update', methods = ['POST'])(update)
blueprint.route('/get-tasks', methods = ['POST'])(get_task_by_project)
