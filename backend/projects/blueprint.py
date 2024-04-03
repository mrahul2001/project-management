from flask import Blueprint
from projects.controller import create, add_members_to_project, get_projects, get_project

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/create', methods = ['POST'])(create)
blueprint.route('/add-member', methods = ['POST'])(add_members_to_project)
blueprint.route('/get-all', methods = ['GET'])(get_projects)
blueprint.route('/get', methods = ['POST'])(get_project)
