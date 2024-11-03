####################################################################################################################################
#                                                             DATA                                                                 #
####################################################################################################################################

fileDetail = {
    'selected_folder': '',
    'all_column_headers': [
        'Isc_20mA', 
        'Turn_off_80mA_', 
        'Turn_off_80mA_HL', 
        'Rf', 
        'Rr'
    ],
    'selected_column': {
        'Isc_20mA': 0,
        'Turn_off_80mA_': 0,
        'Turn_off_80mA_HL': 0,
        'Rf': 0,
        "Rr": 0,
    },
    'fdpath': '',
    'isc_fdpath': '',
    'isc_fdpath_wmap': '',
    'turn_off_fdpath': '',
    'turn_off_fdpath_wmap': '',
    'turn_off_HL_fdpath': '',
    'turn_off_HL_fdpath_wmap': '',
    'rf_fdpath': '',
    'rf_fdpath_wmap': '',
    'rr_fdpath': '',
    'rr_fdpath_wmap': '',
    'all_files': [],
    'file_download_path': '',
    'first_df': {},
    'second_df': {},
    'df': {},
    'fast_track': '',
}

progressTracker = {
    'count': 0,
    'progressStatements': []
}

processed = []

Isc_20mA_data = {
    'step_size_Isc_20mA': 0.15,
    'len_Isc_20mA': 0,
    'x_Isc_20mA': [],
    'y_Isc_20mA': [],
    'uLimit_Isc_20mA': 10,
    'lLimit_Isc_20mA': 2,
    'data_uLimit_Isc_20mA': 10,
    'data_lLimit_Isc_20mA': 0,
}

Turn_off_80mA_data = {
    'step_size_Turn_off_80mA': 0.8,
    'len_Turn_off_80mA': 0,
    'x_Turn_off_80mA': [],
    'y_Turn_off_80mA': [],
    'uLimit_Turn_off_80mA': 500,
    'lLimit_Turn_off_80mA': 0,
    'data_uLimit_Turn_off_80mA': 60,
    'data_lLimit_Turn_off_80mA': 0,
}

Turn_off_80mA_HL_data = {
    'step_size_Turn_off_80mA_HL': 0.5,
    'len_Turn_off_80mA_HL': 0,
    'x_Turn_off_80mA_HL': [],
    'y_Turn_off_80mA_HL': [],
    'uLimit_Turn_off_80mA_HL': 20,
    'lLimit_Turn_off_80mA_HL': -20,
    'data_uLimit_Turn_off_80mA_HL': 10,
    'data_lLimit_Turn_off_80mA_HL': -10,
}

Rf_data = {
    'step_size_Rf': 0.2,
    'len_Rf': 0,
    'x_Rf': [],
    'y_Rf': [],
    'uLimit_Rf': 20,
    'lLimit_Rf': 10,
    'data_uLimit_Rf': 20,
    'data_lLimit_Rf': 10,
}

Rr_data = {
    'step_size_Rr': 0.2,
    'len_Rr': 0,
    'x_Rr': [],
    'y_Rr': [],
    'uLimit_Rr': 20,
    'lLimit_Rr': 10,
    'data_uLimit_Rr': 20,
    'data_lLimit_Rr': 10,
}