from flask import Flask, request, url_for, render_template
import google.generativeai as genai

app= Flask(__name__, template_folder="template")

@app.route('/', methods=["GET", "POST"])
def Ai():
    if request.method == 'POST':

        topic = request.form.get('AI')

        genai.configure(api_key="AIzaSyBS5RV0CpZVd-m848t-1R7-6_zb9uPFV6o")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(topic)
        print(response.text)
        with open(f"{topic}.md", "w") as f:
            f.write(response.text)

        return render_template('AI.html')
    else:
        return render_template("index.html")

if __name__=="__main__":
    app.run(host="0.0.0.0", port=7001, debug=True)