from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from models import db, Flower, User, Order, Contact  # Import the models

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4000"}})

app.config.from_object('config')  # Point to the config file

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db.init_app(app)  # Initialize SQLAlchemy with the app

@app.route('/uploads/<path:filename>')
def serve_uploaded_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Sign Up Functionality
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('name')  # using 'name' as input but saving as 'username'
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({'message': 'Missing required fields'}), 400

        # Check if the email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'message': 'Email already registered'}), 400

        new_user = User(username=username, email=email, password=password)  # Match the field name here
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully!'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred during signup', 'error': str(e)}), 500

# Add Flower with Error Handling
@app.route('/api/add-flower', methods=['POST'])
def add_flower():
    try:
        data = request.form
        flower_name = data.get('name')
        flower_price = data.get('price')
        flower_description = data.get('description')
        flower_stock_quantity = data.get('stock_quantity')

        if not flower_name or not flower_price or not flower_stock_quantity:
            return jsonify({'message': 'Missing required fields'}), 400

        if 'image' not in request.files:
            return jsonify({'message': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'message': 'No selected file'}), 400

        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        new_flower = Flower(
            name=flower_name,
            price=float(flower_price),
            description=flower_description,
            image_url=filename,
            stock_quantity=int(flower_stock_quantity)
        )
        db.session.add(new_flower)
        db.session.commit()

        return jsonify({'message': 'Flower added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error occurred while adding flower', 'error': str(e)}), 500

# Get All Flowers
@app.route('/api/flowers', methods=['GET'])
def get_flowers():
    flowers = Flower.query.all()
    flower_list = [{
        'id': flower.flower_id,
        'name': flower.name,
        'price': float(flower.price),
        'description': flower.description,
        'image_url': f'/uploads/{flower.image_url}',
        'stock_quantity': flower.stock_quantity
    } for flower in flowers]
    
    return jsonify(flower_list), 200

# Get Flower by ID for Admin Editing
@app.route('/api/flower/<int:id>', methods=['GET'])
def get_flower(id):
    flower = Flower.query.filter_by(flower_id=id).first()
    if not flower:
        return jsonify({'error': 'Flower not found'}), 404

    return jsonify({
        'id': flower.flower_id,
        'name': flower.name,
        'price': float(flower.price),
        'description': flower.description,
        'image_url': f'/uploads/{flower.image_url}',
        'stock_quantity': flower.stock_quantity
    }), 200

# Login Functionality
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if email == 'admin@gmail.com' and password == '@admin123':
            return jsonify({'message': 'Admin login successful'}), 200

        user = User.query.filter_by(email=email, password=password).first()
        if user:
            return jsonify({'message': 'User login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'message': 'Internal server error', 'error': str(e)}), 500

# Save Contact Information
def save_contact(name, contact, message):
    new_contact = Contact(name=name, contact=contact, message=message)
    db.session.add(new_contact)
    db.session.commit()

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    if data:
        name = data.get('name')
        contact = data.get('contact')
        message = data.get('message')

        try:
            save_contact(name, contact, message)
            return jsonify({"message": "Contact saved successfully!"}), 200
        except Exception as e:
            return jsonify({"error": "Failed to save contact", "details": str(e)}), 500
    return jsonify({"error": "Invalid input"}), 400

# Get All Orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    order_list = [{
        'order_id': order.id,
        'amount': float(order.amount),
        'status': order.status
    } for order in orders]
    return jsonify(order_list), 200

# Checkout Functionality
@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    # Perform checkout logic here
    return jsonify({"message": "Checkout successful"}), 200

# PUT route for updating flower details
@app.route('/api/flower/<int:id>', methods=['PUT'])
def update_flower(id):
    flower = Flower.query.get(id)
    if not flower:
        return jsonify({"error": "Flower not found"}), 404

    data = request.form
    name = data.get('name')
    price = data.get('price')
    image = request.files.get('image')  # This handles the image file

    if name:
        flower.name = name
    if price:
        flower.price = price
    if image:
        # Assuming you're saving the image to a specific path
        image_path = f"static/uploads/{image.filename}"
        image.save(image_path)
        flower.image_url = image_path

    try:
        db.session.commit()
        return jsonify({
            "message": "Flower updated successfully",
            "flower": {
                "name": flower.name,
                "price": flower.price,
                "image_url": flower.image_url
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to update flower", "details": str(e)}), 500

@app.route('/api/delete-flower/<int:flower_id>', methods=['DELETE'])
def delete_flower(flower_id):
    try:
        flower = Flower.query.get(flower_id)  # Find the flower by ID
        if flower:
            db.session.delete(flower)  # Delete the flower from the database
            db.session.commit()  # Commit the transaction to the database
            return jsonify({"message": "Flower deleted successfully"}), 200
        else:
            return jsonify({"message": "Flower not found"}), 404
    except Exception as e:
        db.session.rollback()  # Rollback in case of any error
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
