import os
from datetime import datetime
import sys


def createFolder(dayFolder):
    try:
        if not os.path.exists(dayFolder):
            os.makedirs(dayFolder)
    except OSError:
        print('Error creating folder: ' + dayFolder)


if __name__ == '__main__':
    if len(sys.argv) == 2:
        day = sys.argv[1].zfill(2)
    else:
        day = datetime.now().strftime('%d').zfill(2)
    createFolder("day" + day)
