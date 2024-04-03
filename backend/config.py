from flask import Flask
from pymongo import MongoClient
import redis
import urllib.parse
import os

from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

username = os.getenv('MONGO_USERNAME')
password = os.getenv('MONGO_PASSWORD')
mongo_uri = f"mongodb+srv://{username}:" + urllib.parse.quote(password) + "@cluster0.zyjizfj.mongodb.net/"
# mongo_uri = 'mongodb://localhost:27017'
mongo_client = MongoClient(mongo_uri)
mongo_db = mongo_client.flask_mongo 

redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT')
redis_password = os.getenv('REDIS_PASSWORD')
r = redis.Redis(host=redis_host, port=int(redis_port), password=redis_password)


from users.blueprint import blueprint as user_blueprint
from projects.blueprint import blueprint as project_blueprint
from tasks.blueprint import blueprint as task_blueprint

app.register_blueprint(user_blueprint)
app.register_blueprint(project_blueprint, name="project_blueprint", url_prefix='/projects')
app.register_blueprint(task_blueprint, name="task_blueprint", url_prefix='/tasks')
