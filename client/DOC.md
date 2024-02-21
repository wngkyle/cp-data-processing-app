## Client

### App

- This page takes care of all the routing and context provider 
- Routing Library : [React Router](https://reactrouter.com/en/main)
- Routing pages as follow
    - Home : /
    - FolderSelection : /folder-selection
    - ProcessDetail : /process-detail
    - FolderProcessing : /folder-processing
    - Complete : /complete
    - Error : *
- Context
    - Column Steps 
        - Stores the step size of the selected columns
        - Structure : 
            ```
            const columnSteps = {
                'Isc_20mA': 0,
                'Turn_off_80mA_': 0,
                'Turn_off_80mA_HL': 0,
                'Rf': 0,
                'Rr': 0,
                'fast-track' : false,
            };
            ```
        


### Home


### Folder Selection


### Processing Detail

### Folder Processing

### Complete


## Server

