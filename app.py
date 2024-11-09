from flask import Flask, request, url_for, render_template, send_from_directory
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()
my_api_key = os.getenv("GOOGLE_GEMINI_API")

app= Flask(__name__, template_folder="template")

@app.route('/', methods=["GET", "POST"])
def Ai():
    if request.method == 'POST':

        topic = request.form.get('AI')

        genai.configure(api_key=my_api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(topic)
        print(response.text)
        with open(f"{topic}.txt", "w") as f:
            f.write(response.text)

        f_url = url_for('show', topic=topic)

        return render_template('AI.html', f_url= f_url)
    else:
        return render_template("index.html")
    
@app.route('/show/<topic>')
def show(topic):
    return send_from_directory('/Users/macbookair/Desktop/python/Sem7 Proj', topic)

if __name__=="__main__":
    app.run(host="0.0.0.0", port=7001, debug=True)