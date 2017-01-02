import os
import sys


filename = r"d:/temp/dir2json.js"
basedir = r"d:/temp"
f = open (filename)
base, extension = filename.rsplit('.',1)

for filename in os.listdir(basedir):
    info = os.stat(filename)
    print info
