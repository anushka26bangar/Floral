from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy()  # Create SQLAlchemy instance without app

from app import routes, models

def init_app():
    db.init_app(app)  # Initialize SQLAlchemy with the app
