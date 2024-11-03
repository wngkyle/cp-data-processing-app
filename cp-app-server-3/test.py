import os
import shutil

cwd = '/Users/wng/Desktop/TPA001C'
listOfDir = os.scandir(cwd)
for folder in listOfDir:
    if "Processed" in folder.name:
        folderPath = os.path.join(cwd, folder.name)
        shutil.rmtree(folderPath)