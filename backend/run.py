import google.generativeai as genai
from dotenv import load_dotenv, dotenv_values
load_dotenv()

API_KEY = dotenv_values().get('API_KEY')

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Tell me something I dont know.")
print(response.text)