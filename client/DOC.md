## Client

### App.js
- This page takes care of all the routing and context provider 
- Routing Library : [React Router](https://reactrouter.com/en/main)
- Routing pages as follow
    - Home : `/`
    - FolderSelection : `/folder-selection`
    - ProcessDetail : `/process-detail`
    - FolderProcessing : `/folder-processing`
    - Complete : `/complete`
    - Error : `*`
- Context Overview
    - Column Steps 
        - Stores the step size of the selected columns
        - Variable : `useColumnStepContext()`
        - Set function : `useSetColumnStepContext()`
        - Tag : `<ColumnStepProvider>`
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
    - Step
        - Stores current stage in user interface, use for NavBar component
        - Variable : `useCurrentStepContext()` 
        - Set function : `useStateCurrentStepContext()`
        - Tag : `<StepsProvider>`
        - Structure : integer variable
    - Fast Track
        - Stores user input for fast track selection
        - Variable: `useFastTrackContext()`
        - Set function : `useSetFastTrackContext()`
        - Tag : `<FastTrackContextProvider>`
        - Structure : boolean variable
    - Directory 
        - Tag : `<DirectoryProvider>`
        - List of Directory
            - Stores all available directory in the current working directory
            - Variable : `useListOfDirContext()`
            - Set function : `useSetListOfDirContext()`
            - Structure : list variable
        - Directory Index
            - Stores the idnex of the selected directory 
            - Variable : `useDirIndexContext()`
            - Set function : `useSetDirIndexContext()`
            - Structure : integer variable 

### Home.js
- Landing page when run
- Icon on top left returns back to home/landing page
- Enter and Begin button to begin processing
- Context
    - `useStateCurrentStepContext()`
- Functions
    - `handleEnterButtonClicked()`
        - For handling enter button pressed
        - Navigate to the next page FolderSelection
        - Set context variable step to 0
        - Prints `HOME -> File Upload`

### FolderSelection.js
- Allow user to select the desire folder to process
- Context 
    - `useListOfDirContext()`
    - `useSetListOfDirContext()`
    - `useDirIndexContext()`
    - `useSetDirIndexContext()`
    - `useSetColumnStepContext()`
    - `useStateCurrentStepContext()`
- Variable
    - `currWorkDirect` : stores file path of current working directory
- Functions
    - `handleNextButtonPressed()`
        - Check if a folder is selected, if not then prompt the user to select one
        - GET(set-folder-and-create) fetch newly created folder path
        - Reset column step over here
        - Set current step to 1 since the page is navigating to process detail page
        - Prints `File Upload -> Process Detail`
    - `handleBackButtonPressed()`
        - Navigate back to home/landing page
        - Prints `HOME <- File Upload`
    - `handleDirectoryBackward()`
        - Set current working directory one level back up using GET(directory-backward) 
        - GET(get-list-of-folders) fetch list of available folders in current working directory

### ProcessingDetail.js

### FolderProcessing.js

### Complete


## Server

