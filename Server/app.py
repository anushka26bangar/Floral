from flask import Flask, jsonify, request, send_file, Response, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS
from models import db, Flower, User, Order, Contact  # Import the models

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4000"}})

app.config.from_object('config')  # This should point to the config file

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

db.init_app(app)  # Initialize SQLAlchemy with the app

@app.route('/uploads/<path:filename>')
def serve_uploaded_image(filename):
    return send_from_directory('uploads', filename)

# Delete Flower
@app.route('/api/delete-flower/<int:flower_id>', methods=['DELETE'])
def delete_flower(flower_id):
    flower = Flower.query.get(flower_id)
    if flower:
        try:
            db.session.delete(flower)
            db.session.commit()
            return jsonify({'message': 'Flower deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()  # Rollback in case of an error
            return jsonify({'message': 'Error deleting flower', 'error': str(e)}), 500
    return jsonify({'message': 'Flower not found'}), 404

# Serve Image (without path conflict)
@app.route('/uploads/serve/<filename>', methods=['GET'])
def serve_image(filename):
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        if not os.path.exists(file_path):
            return jsonify({'message': 'File not found'}), 404

        response = send_file(file_path, mimetype='image/jpg')
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    except Exception as e:
        return jsonify({'message': 'Error occurred while serving file', 'error': str(e)}), 500

@app.route('/uploads/<filename>', methods=['OPTIONS'])
def options_for_image(filename):
    response = jsonify({'message': 'CORS preflight response'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

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

        # Secure and save the file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Create and add new flower entry
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
        db.session.rollback()  # Rollback in case of an error
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
        'image_url': f'/uploads/{flower.image_url}',  # Ensure this points correctly to the image
        'stock_quantity': flower.stock_quantity
    } for flower in flowers]
    
    return jsonify(flower_list), 200

# Login Functionality
@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Check admin credentials
        if email == 'admin@gmail.com' and password == '@admin123':
            return jsonify({'message': 'Admin login successful'}), 200

        # Query user by email and password
        user = User.query.filter_by(email=email, password=password).first()
        if user:
            return jsonify({'message': 'User login successful'}), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'message': 'Internal server error', 'error': str(e)}), 500

# Save Contact Function
def save_contact(name, contact, message):
    # Create a new contact entry
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

        # Debug log
        print(f"Received data: name={name}, contact={contact}, message={message}")
        
        try:
            save_contact(name, contact, message)
            return jsonify({"message": "Contact saved successfully!"}), 200
        except Exception as e:
            print(f"Error saving contact: {e}")  # Debugging
            return jsonify({"error": "Failed to save contact", "details": str(e)}), 500
    return jsonify({"error": "Invalid input"}), 400

# Get Orders
@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    order_list = [{
        'order_id': order.id,
        'amount': float(order.amount),
        'status': order.status
    } for order in orders]
    return jsonify(order_list), 200

@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    # Perform checkout logic here
    return jsonify({"message": "Checkout successful"}), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)
