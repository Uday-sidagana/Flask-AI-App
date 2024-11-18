import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
my_api_key = os.getenv("GOOGLE_GEMINI_API")

genai.configure(api_key=my_api_key)
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Area of a square")
print(response.text)