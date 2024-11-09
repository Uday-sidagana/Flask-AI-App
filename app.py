from flask import Flask, request, url_for, render_template

app= Flask(__name__, template_folder="template")

@app.route('/', methods=["GET", "POST"])
def Ai():
    if request.method == 'POST':

        topic = request.form.get('AI')
        return f"{topic}"
    else:
        return render_template("index.html")

if __name__=="__main__":
    app.run(host="0.0.0.0", port=7001, debug=True)