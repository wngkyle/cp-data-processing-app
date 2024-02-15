import os

temp = os.getcwd()
print(temp)
os.chdir('../../')
temp = os.getcwd()
print(temp)
os.chdir('./All')
temp = os.getcwd()
print(temp)