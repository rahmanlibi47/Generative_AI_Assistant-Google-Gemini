from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv, dotenv_values
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

load_dotenv() #

API_KEY = dotenv_values().get('API_KEY')

if not API_KEY:
    raise ValueError("API key not found. Please check your .env file.")


genai.configure(api_key=API_KEY)


model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')

    if not user_input:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = model.generate_content(user_input)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
