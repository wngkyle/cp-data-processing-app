from flask import Flask, jsonify, request
from flask_cors import CORS
import os, json

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000"],
)

@app.route('/get-current-working-directory')
def getCurrWork():
    cwd = os.getcwd()
    return cwd

@app.route('/get-list-of-folders')
def getListOfDir():
    cwd = getCurrWork()
    listOfDir = os.scandir(cwd)
    listOfDir = check_files(listOfDir)
    return jsonify(listOfDir)

@app.route('/directory-backward')
def directoryBackward():
    os.chdir('../')
    cwd = os.getcwd()
    return cwd

@app.route('/directory-forward', methods=['POST'])
def directoryForward():
    data = request.json
    selectedFolder = data.get('selectedFolder')
    path = f'./{selectedFolder}'
    os.chdir(path)
    cwd = os.getcwd()
    return cwd

@app.route('./set-folder-and-create', methods=['POST'])
def setFolderAndCreate():
    data = request.json
    finalFolder = data.get('finalFolder')
    


def check_files(list):
    result = []
    for file in list:
        if file.is_dir() == False or file.name == '.git' or file.name == '__pycache__' or file.name == '$RECYCLE.BIN' or file.name == '.ipynb_checkpoints' or file.name == '.jpeg File':
            pass
        else:
            result.append(file.name)
    return result

if __name__ == '__main__':
    app.run(debug=True)