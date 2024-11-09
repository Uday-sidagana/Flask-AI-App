from flask import Flask, request, url_for, render_template
import google.generativeai as genai

app= Flask(__name__, template_folder="template")

@app.route('/', methods=["GET", "POST"])
def Ai():
    if request.method == 'POST':

        topic = request.form.get('AI')

        genai.configure(api_key="YOUR_API_KEY")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content("Explain how AI works")
        print(response.text)

        return f"{topic}"
    else:
        return render_template("index.html")

if __name__=="__main__":
    app.run(host="0.0.0.0", port=7001, debug=True)