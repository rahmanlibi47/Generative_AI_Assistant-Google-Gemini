import google.generativeai as genai
import os 

API_KEY='your_api_key'

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Tell me something I dont know.")
print(response.text)