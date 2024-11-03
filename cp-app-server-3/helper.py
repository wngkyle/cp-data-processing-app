import math, openpyxl
import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
from data import fileDetail, Isc_20mA_data, Turn_off_80mA_data, Turn_off_80mA_HL_data, Rf_data, Rr_data

####################################################################################################################################
#                                                        HELPER                                                                    #
####################################################################################################################################

# Argument : fname (path to the original file), findex (index of the first '-' in file name), 
#            newfpath (file path of the newly created excel file)
# Process Isc_20mA column, creates respective charts and sheets
def run_Isc_20mA(fname, findex, newfpath, image_x, image_y):
    # Processing values in each files's Isc_20mA column, and save the values in y_Isc_20mA
    Isc_20mA_data['y_Isc_20mA'] = [0 for i in range(len(Isc_20mA_data['x_Isc_20mA']))]
    for index in range(4, fileDetail['df'].shape[0]):
        # Check if PASSFG value is false, if false continue to the next row
        if fileDetail['df'].PASSFG[index] == False:
            continue
        pos = math.floor(fileDetail['df'].Isc_20mA[index] / Isc_20mA_data['step_size_Isc_20mA'])
        if pos >= Isc_20mA_data['len_Isc_20mA']:
            Isc_20mA_data['y_Isc_20mA'][Isc_20mA_data['len_Isc_20mA'] - 1] += 1
        else:
            Isc_20mA_data['y_Isc_20mA'][pos] += 1 
    
    graph_write_download('Isc_20mA', 'uA', fname, 'isc_fdpath', findex, newfpath, image_x, image_y, Isc_20mA_data['x_Isc_20mA'], Isc_20mA_data['y_Isc_20mA'])

# Argument : fname (path to the original file), findex (index of the first '-' in file name), 
#            newfpath (file path of the newly created excel file)
# Process Turn_off_80mA_ column, creates respective charts and sheets
def run_Turn_off_80mA(fname, findex, newfpath, image_x, image_y):
    # Processing values in each files's Turn_off_80mA column, and save the values in y_Turn_off_80mA
    Turn_off_80mA_data['y_Turn_off_80mA'] = [0 for i in range(len(Turn_off_80mA_data['x_Turn_off_80mA']))]
    for index in range(4, fileDetail['df'].shape[0]):
        # Check if PASSFG value is false, if false continue to the next row
        if fileDetail['df'].PASSFG[index] == False:
            continue
        pos = math.floor(fileDetail['df'].Turn_off_80mA_[index] / Turn_off_80mA_data['step_size_Turn_off_80mA'])
        if pos >= Turn_off_80mA_data['len_Turn_off_80mA']:
            Turn_off_80mA_data['y_Turn_off_80mA'][Turn_off_80mA_data['len_Turn_off_80mA'] - 1] += 1
        else:
            Turn_off_80mA_data['y_Turn_off_80mA'][pos] += 1  
    
    graph_write_download('Turn_off_80mA_', 'us', fname, 'turn_off_fdpath', findex, newfpath, image_x, image_y, Turn_off_80mA_data['x_Turn_off_80mA'], Turn_off_80mA_data['y_Turn_off_80mA'])


# Argument : fname (path to the original file), findex (index of the first '-' in file name), 
#            newfpath (file path of the newly created excel file)
# Process Turn_off_80mA_HL column, creates respective charts and sheets
def run_Turn_off_80mA_HL(fname, findex, newfpath, image_x, image_y):
    # Processing values in each files's Turn_off_80mA column, and save the values in y_Turn_off_80mA
    Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'] = [0 for i in range(len(Turn_off_80mA_HL_data['x_Turn_off_80mA_HL']))]
    for index in range(4, fileDetail['df'].shape[0]):
        # Check if PASSFG value is false, if false continue to the next row
        if fileDetail['df'].PASSFG[index] == False:
            continue
        pos = math.floor(fileDetail['df'].Turn_off_80mA_HL[index] / Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL'])
        if pos < 0:
            pos = int(Turn_off_80mA_HL_data['len_Turn_off_80mA_HL'] / 2 + pos)
            if pos <= 0:
                Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'][0] += 1
            else:
                Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'][pos] += 1
        else:
            pos = int(Turn_off_80mA_HL_data['len_Turn_off_80mA_HL'] / 2 + pos)
            if pos >= Turn_off_80mA_HL_data['len_Turn_off_80mA_HL']:
                Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'][Turn_off_80mA_HL_data['len_Turn_off_80mA_HL'] - 1] += 1
            else:
                Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'][pos] += 1  
    
    graph_write_download('Turn_off_80mA_HL', 'us', fname, 'turn_off_HL_fdpath', findex, newfpath, image_x, image_y, Turn_off_80mA_HL_data['x_Turn_off_80mA_HL'], Turn_off_80mA_HL_data['y_Turn_off_80mA_HL'])


# Argument : fname (path to the original file), findex (index of the first '-' in file name), 
#            newfpath (file path of the newly created excel file)
# Process Rf column, creates respective charts and sheets
def run_Rf(fname, findex, newfpath, image_x, image_y):
    # Processing values in each files's Rf column, and save the values in y_Rf
    Rf_data['y_Rf'] = [0 for i in range(len(Rf_data['x_Rf']))]
    for index in range(4, fileDetail['df'].shape[0]):
        # Check if PASSFG value is false, if false continue to the next row
        if fileDetail['df'].PASSFG[index] == False:
            continue
        pos = math.floor((fileDetail['df'].Rf[index] - 10) / Rf_data['step_size_Rf'])
        if pos < 0:
            Rf_data['y_Rf'][0] += 1
        elif pos >= Rf_data['len_Rf']:
            Rf_data['y_Rf'][Rf_data['len_Rf'] - 1] += 1
        else:
            Rf_data['y_Rf'][pos] += 1 

    graph_write_download('Rf', 'Mohm', fname, 'rf_fdpath', findex, newfpath, image_x, image_y, Rf_data['x_Rf'], Rf_data['y_Rf'])
    

# Argument : fname (path to the original file), findex (index of the first '-' in file name), 
#            newfpath (file path of the newly created excel file)
# Process Rr column, creates respective charts and sheets
def run_Rr(fname, findex, newfpath, image_x, image_y):
    # Processing values in each files's Rr column, and save the values in y_Rr
    Rr_data['y_Rr'] = [0 for i in range(len(Rr_data['x_Rr']))]
    for index in range(4, fileDetail['df'].shape[0]):
        # Check if PASSFG value is false, if false continue to the next row
        if fileDetail['df'].PASSFG[index] == False:
            continue
        pos = math.floor((fileDetail['df'].Rr[index] - 10) / Rr_data['step_size_Rr'])
        if pos < 0:
            Rr_data['y_Rr'][0] += 1
        elif pos >= Rr_data['len_Rr']:
            Rr_data['y_Rr'][Rr_data['len_Rr'] - 1] += 1
        else:
            Rr_data['y_Rr'][pos] += 1 
    
    graph_write_download('Rr', 'uA', fname, 'rr_fdpath', findex, newfpath, image_x, image_y, Rr_data['x_Rr'], Rr_data['y_Rr'])

def graph_write_download(col, units, fname, fdpath_chart, findex, newfpath, image_x, image_y, x_data, y_data):
    # Creating the chart and saving it in chart folder
    plt.figure(figsize=(10, 6))
    plt.plot(x_data, y_data, marker='.')
    plt.subplots_adjust(bottom=0.186, top=0.906, left=0.083, right=0.96)
    plt.title(f'{fname[:findex+2]} : {col}')
    plt.xlabel(f'Range ({units})')
    plt.ylabel('Amount (units)')
    plt.xticks(rotation=90)
    plt.tight_layout()

    chart_fpath = f'{fileDetail[fdpath_chart]}/{fname[:findex+2]}.png'
    plt.savefig(chart_fpath)
    plt.close()

    # Creating wafer heatmap and saving it in heatmap folder
    x = fileDetail['df'].X_COORD
    y = fileDetail['df'].Y_COORD
    pf = fileDetail['df'].PASSFG
    val = {}
    data = np.zeros((200, 200))
    if col == 'Isc_20mA':
        val = fileDetail['df'].Isc_20mA
    elif col == 'Turn_off_80mA_':
        val = fileDetail['df'].Turn_off_80mA_
    elif col == 'Turn_off_80mA_HL':
        val = fileDetail['df'].Turn_off_80mA_HL
    elif col == 'Rf':
        val = fileDetail['df'].Rf
    else:
        val = fileDetail['df'].Rr

    for index in range(len(x)):
        temp = val.iloc[index]
        x_coord = x.iloc[index]
        y_coord = y.iloc[index]

        # Check if x_coord and y_coord are not NaN before converting to integers
        if pd.notna(temp) and pd.notna(x_coord) and pd.notna(y_coord) and pf.iloc[index]:
            data[int(x_coord)][int(y_coord)] = temp
    
    if col == 'Turn_off_80mA_HL':
        sns.heatmap(data, cmap='Blues')
    else: 
        sns.heatmap(data, cmap='RdBu')
    plt.title(f'{fname[:findex+2]} : {col}')
    plt.axis([56, 200, 64, 200])

    fdpath_wmap = f'{fdpath_chart}_wmap'
    wmap_fpath = f'{fileDetail[fdpath_wmap]}/{fname[:findex+2]}.png'
    plt.savefig(wmap_fpath)
    plt.close()

    # Creating a new file and writing the data back into the file
    data = {f'Range ({units})' : x_data, 'Amount (units)' : y_data}
    df_data = pd.DataFrame(data)
    with pd.ExcelWriter(newfpath, engine='openpyxl', mode='a') as writer:
        df_data.to_excel(writer, sheet_name=col, index=False)

    # Adding and anchoring the image to the sheet in excel file
    wb = openpyxl.load_workbook(newfpath)
    sht = wb[col]
    chart = openpyxl.drawing.image.Image(chart_fpath)
    chart.anchor = "G8"
    sht.add_image(chart)
    wb.save(newfpath)

    # Add chart to final file
    wb = openpyxl.load_workbook(f'{fileDetail["fdpath"]}/{col}.xlsx')
    sht = wb['Sheet']
    chart = openpyxl.drawing.image.Image(chart_fpath)
    chart.anchor = f'{image_x}{image_y}'
    sht.add_image(chart)
    wb.save(f'{fileDetail["fdpath"]}/{col}.xlsx')

    # Add heatmap to final file
    wb_wmap = openpyxl.load_workbook(f'{fileDetail["fdpath"]}/{col}_wmap.xlsx')
    sht_wmap = wb_wmap['Sheet']
    wmap = openpyxl.drawing.image.Image(wmap_fpath)
    wmap.anchor = f'{image_x}{image_y}'
    sht_wmap.add_image(wmap)
    wb_wmap.save(f'{fileDetail["fdpath"]}/{col}_wmap.xlsx')