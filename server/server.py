from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000"],
    supports_credentials=True,
)

@app.route('/test')
def hello():
    return "Hello World"

if __name__ == '__main__':
    app.run(debug=True)