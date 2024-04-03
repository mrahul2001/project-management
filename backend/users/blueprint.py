from flask import Blueprint
from users.controller import create, login, get_details

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/create', methods = ['POST'])(create)
blueprint.route('/login', methods = ['POST'])(login)
blueprint.route('/get-details', methods = ['GET'])(get_details)
