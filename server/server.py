from flask import Flask, jsonify, request
from flask_cors import CORS
from openpyxl import Workbook
from main import reading_and_processing
from data import fileDetail, Isc_20mA_data, Turn_off_80mA_data, Turn_off_80mA_HL_data, Rf_data, Rr_data
from modified_step import Isc_20_mA_step_size, Turn_off_80mA_step_size, Turn_off_80mA_HL_step_size, Rf_step_size, Rr_step_size

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

@app.route('/set-folder-and-create', methods=['POST'])
def setFolderAndCreate():
    data = request.json
    selectedFolder = data.get('finalFolder')
    cwd = os.getcwd()
    selectedFolderPath = f'{cwd}/{selectedFolder}'
    fileDetail['selected_folder'] = selectedFolderPath
    finalFolderPath = f'{fileDetail["selected_folder"]}_Processed'
    fileDetail['fdpath'] = finalFolderPath
    os.mkdir(fileDetail['fdpath'])
    return finalFolderPath

@app.route('/set-selected-columns', methods=['POST'])
def setSelectedColumns():
    data = request.json
    selectedColumns = data.get('selectedColumns')
    for col in list(selectedColumns.keys()):
        fileDetail['selected_column'][col] = 1
    setStepSize(selectedColumns)
    return selectedColumns

def setStepSize(selectedColumns):
    temp = list(selectedColumns.keys())
    if ('Isc_20mA' in temp):
        Isc_20mA_data['step_size_Isc_20mA'] = selectedColumns['Isc_20mA']
    if ('Turn_off_80mA_' in temp):
        Turn_off_80mA_data['step_size_Turn_off_80mA'] = selectedColumns['Turn_off_80mA_']
    if ('Turn_off_80mA_HL' in temp):
        Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL'] = selectedColumns['Turn_off_80mA_HL']
    if ('Rf' in temp):
        Rf_data['step_size_Rf'] = selectedColumns['Rf']
    if ('Rr' in temp):
        Rr_data['step_size_rr'] = selectedColumns['Rr']


@app.route('/set-fast-track', methods=['POST'])
def setFastTrack():
    data = request.json
    fastTrackk = data.get('fastTrack')
    if fastTrackk == 'true':
        fileDetail['fast_track'] = True
    else:
        fileDetail['fast_track'] = False
    return fastTrackk


# TASKSSSS:
# Check if step size number needs to be converted into integer after sending it from frontend
# Check default, if users enter nothing, what is the default value for step size
    # might have to modify frontend as well, maybe show the default in the input tag as well
@app.route('/exec')
def exec():
    if (fileDetail['selected_column']['Isc_20mA'] == 1):
        Isc_20_mA_step_size()
        # Create a new file and new folder for storing charts
        fileDetail['isc_fdpath'] = f'{fileDetail["fdpath"]}/Isc_20mA'
        os.mkdir(fileDetail['isc_fdpath'])
        fileDetail['isc_fdpath_wmap'] = f'{fileDetail["fdpath"]}/Isc_20mA_wmap'
        os.mkdir(fileDetail['isc_fdpath_wmap'])
        wb = Workbook()
        wb.save(f'{fileDetail["fdpath"]}/Isc_20mA.xlsx')
        wb_wmap = Workbook()
        wb_wmap.save(f'{fileDetail["fdpath"]}/Isc_20mA_wmap.xlsx')
    if (fileDetail['selected_column']['Turn_off_80mA_'] == 1):
        Turn_off_80mA_step_size()
        # Create a new file and new folder for storing charts
        fileDetail['turn_off_fdpath'] = f'{fileDetail["fdpath"]}/Turn_off_80mA_'
        os.mkdir(fileDetail['turn_off_fdpath'])
        fileDetail['turn_off_fdpath_wmap'] = f'{fileDetail["fdpath"]}/Turn_off_80mA__wmap'
        os.mkdir(fileDetail['turn_off_fdpath_wmap'])
        wb = Workbook()
        wb.save(f'{fileDetail["fdpath"]}/Turn_off_80mA_.xlsx')
        wb_wmap = Workbook()
        wb_wmap.save(f'{fileDetail["fdpath"]}/Turn_off_80mA__wmap.xlsx')
    if (fileDetail['selected_column']['Turn_off_80mA_HL'] == 1):
        Turn_off_80mA_HL_step_size()
        # Create a new file and new folder for storing charts
        fileDetail['turn_off_HL_fdpath'] = f'{fileDetail["fdpath"]}/Turn_off_80mA_HL'
        os.mkdir(fileDetail['turn_off_HL_fdpath'])
        fileDetail['turn_off_HL_fdpath_wmap'] = f'{fileDetail["fdpath"]}/Turn_off_80mA_HL_wmap'
        os.mkdir(fileDetail['turn_off_HL_fdpath_wmap'])
        wb = Workbook()
        wb.save(f'{fileDetail["fdpath"]}/Turn_off_80mA_HL.xlsx')
        wb_wmap = Workbook()
        wb_wmap.save(f'{fileDetail["fdpath"]}/Turn_off_80mA_HL_wmap.xlsx')
    if (fileDetail['selected_column']['Rf'] == 1):
        Rf_step_size()
        # Create a new file and new folder for storing charts
        fileDetail['rf_fdpath'] = f'{fileDetail["fdpath"]}/Rf'
        os.mkdir(fileDetail['rf_fdpath'])
        fileDetail['rf_fdpath_wmap'] = f'{fileDetail["fdpath"]}/Rf_wmap'
        os.mkdir(fileDetail['rf_fdpath_wmap'])
        wb = Workbook()
        wb.save(f'{fileDetail["fdpath"]}/Rf.xlsx')
        wb_wmap = Workbook()
        wb_wmap.save(f'{fileDetail["fdpath"]}/Rf_wmap.xlsx')
    if (fileDetail['selected_column']['Rr'] == 1):
        Rr_step_size()  
        # Create a new file and new folder for storing charts
        fileDetail['rr_fdpath'] = f'{fileDetail["fdpath"]}/Rr'
        os.mkdir(fileDetail['rr_fdpath'])
        fileDetail['rr_fdpath_wmap'] = f'{fileDetail["fdpath"]}/Rr_wmap'
        os.mkdir(fileDetail['rr_fdpath_wmap'])
        wb = Workbook()
        wb.save(f'{fileDetail["fdpath"]}/Rr.xlsx')
        wb_wmap = Workbook()
        wb_wmap.save(f'{fileDetail["fdpath"]}/Rr_wmap.xlsx')
    
    # print()
    # reading_and_processing()
    # print('All done!!!!')

@app.route('/test-route', methods=['POST'])
def testRoute():
    data = request.json.get('data')
    return data

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