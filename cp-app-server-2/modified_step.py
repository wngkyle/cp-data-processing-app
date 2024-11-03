import math
from data import fileDetail, Isc_20mA_data, Turn_off_80mA_data, Turn_off_80mA_HL_data, Rf_data, Rr_data

####################################################################################################################################
#                                                      STEP FUNCTIONS                                                              #
####################################################################################################################################

# Argument : n/a
# Prompt the user to select the step size for Isc_20mA, empty val will set to default value
def Isc_20_mA_step_size():
    # Computing the number of x values for Isc_20mA and Turn_off_80mA
    Isc_20mA_data['len_Isc_20mA'] = math.floor((Isc_20mA_data['data_uLimit_Isc_20mA'] - Isc_20mA_data['data_lLimit_Isc_20mA']) / Isc_20mA_data['step_size_Isc_20mA'])
    Isc_20mA_data['len_Isc_20mA'] += 2
    # Isc_20mA
    preVal = Isc_20mA_data['data_lLimit_Isc_20mA']
    val = preVal + Isc_20mA_data['step_size_Isc_20mA']
    for i in range(Isc_20mA_data['len_Isc_20mA']):
        Isc_20mA_data['x_Isc_20mA'].append(f'{preVal}~{val}')
        preVal = val
        val += Isc_20mA_data['step_size_Isc_20mA']
        val = round(val, 2)
    Isc_20mA_data['x_Isc_20mA'][Isc_20mA_data['len_Isc_20mA'] - 1] = f'> {preVal}'

# Argument : n/a
# Prompt the user to select the step size for Turn_off_80mA, empty val will set to default value
def Turn_off_80mA_step_size():
    # Computing the number of x values for Turn_off_80mA
    Turn_off_80mA_data['len_Turn_off_80mA'] = math.floor((Turn_off_80mA_data['data_uLimit_Turn_off_80mA'] - Turn_off_80mA_data['data_lLimit_Turn_off_80mA']) / Turn_off_80mA_data['step_size_Turn_off_80mA'])

    # Turn_off_80mA
    preVal = Turn_off_80mA_data['data_lLimit_Turn_off_80mA']
    val = preVal + Turn_off_80mA_data['step_size_Turn_off_80mA']
    for i in range(Turn_off_80mA_data['len_Turn_off_80mA']):
        Turn_off_80mA_data['x_Turn_off_80mA'].append(f'{preVal}~{val}')
        preVal = val
        val += Turn_off_80mA_data['step_size_Turn_off_80mA']
        val = round(val, 2)
    Turn_off_80mA_data['x_Turn_off_80mA'][Turn_off_80mA_data['len_Turn_off_80mA'] - 1] = f'> {preVal}'    

# Argument : n/a
# Prompt the user to select the step size for Turn_off_80mA_HL, empty val will set to default value
def Turn_off_80mA_HL_step_size():
    # Computing the number of x values for Turn_off_80mA_HL
    Turn_off_80mA_HL_data['len_Turn_off_80mA_HL'] = math.floor((Turn_off_80mA_HL_data['data_uLimit_Turn_off_80mA_HL'] - Turn_off_80mA_HL_data['data_lLimit_Turn_off_80mA_HL']) / Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL'])

    # Turn_off_80mA_HL
    preVal = Turn_off_80mA_HL_data['data_lLimit_Turn_off_80mA_HL']
    val = preVal + Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL']
    for i in range(int(Turn_off_80mA_HL_data['len_Turn_off_80mA_HL']/2)):
        Turn_off_80mA_HL_data['x_Turn_off_80mA_HL'].append(f'{preVal}~{val}')
        preVal = val
        val += Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL']
        val = round(val, 2)
    # Turn_off_80mA_HL_data['x_Turn_off_80mA_HL'][0] = f'< {Turn_off_80mA_HL_data["data_lLimit_Turn_off_80mA_HL"]}'

    for i in range(int(Turn_off_80mA_HL_data['len_Turn_off_80mA_HL']/2)):
        Turn_off_80mA_HL_data['x_Turn_off_80mA_HL'].append(f'{preVal}~{val}')
        preVal = val
        val += Turn_off_80mA_HL_data['step_size_Turn_off_80mA_HL']
        val = round(val, 2)
    # Turn_off_80mA_HL_data['x_Turn_off_80mA_HL'][Turn_off_80mA_HL_data['len_Turn_off_80mA_HL'] - 1] = f'> {preVal}'


# Argument : n/a
# Prompt the user to select the step size for Rf, empty val will set to default value
def Rf_step_size():
    # Computing the number of x values for Isc_20mA and Turn_off_80mA
    Rf_data['len_Rf'] = math.floor((Rf_data['data_uLimit_Rf'] - Rf_data['data_lLimit_Rf']) / Rf_data['step_size_Rf'])
    
    # Isc_20mA
    preVal = Rf_data['data_lLimit_Rf']
    val = preVal + Rf_data['step_size_Rf']
    for i in range(Rf_data['len_Rf']):
        Rf_data['x_Rf'].append(f'{preVal}~{val}')
        preVal = val
        val += Rf_data['step_size_Rf']
        val = round(val, 2)
    # Rf_data['x_Rf'][Rf_data['len_Rf'] - 1] = f'> {preVal}'
    # Rf_data['x_Rf'][0] = f'< {Rf_data["data_lLimit_Rf"]}'

# Argument : n/a
# Prompt the user to select the step size for Rr, empty val will set to default value
def Rr_step_size():
    # Computing the number of x values for Isc_20mA and Turn_off_80mA
    Rr_data['len_Rr'] = math.floor((Rr_data['data_uLimit_Rr'] - Rr_data['data_lLimit_Rr']) / Rr_data['step_size_Rr'])
    
    # Isc_20mA
    preVal = Rr_data['data_lLimit_Rr']
    val = preVal + Rr_data['step_size_Rr']
    for i in range(Rr_data['len_Rr']):
        Rr_data['x_Rr'].append(f'{preVal}~{val}')
        preVal = val
        val += Rr_data['step_size_Rr']
        val = round(val, 2)
    # Rr_data['x_Rr'][Rr_data['len_Rr'] - 1] = f'> {preVal}'
    # Rr_data['x_Rr'][0] = f'< {Rr_data["data_lLimit_Rr"]}'