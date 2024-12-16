
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Flower Model
class Flower(db.Model):
    flower_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    stock_quantity = db.Column(db.Integer, default=0)

# User Model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)  # Add name field if not already present
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
        
# Order Model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), nullable=False)

# Contact Model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=True)  # Allow email to be nullable
    message = db.Column(db.Text, nullable=False)
    submission_date = db.Column(db.DateTime, default=db.func.current_timestamp())
