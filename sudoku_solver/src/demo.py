#!/usr/bin/python3
# coding: utf-8

'''
Demo program

LOMBART Thomas - VASILEV Martin

December 2016
'''

import os


commands = ['python3 main.py 081000090500009060900501300050030409000000000207050030003607001060400003020000680',
            'python3 main.py -s 490001007000045030382600050003070401800902005907030600030006529020850000500700013',
            'python3 main.py -s 906070403000400200070023010500000100040208060003000005030700050007005000405010708',
            'python3 main.py -i 000009804980310007040000000406002700700000005008100406000000070200081069309500000',
            'cat arbre.dot',
            'python3 main.py -a 906070403000400200070023010500000100040208060003000005030700050007005000405010708',
            'python3 main.py -t 050307080400605001020040090001000700640000039003000200030010050200709008010806020']


def clear():
    """
    Clears the console
    """
    os.system('cls' if os.name == 'nt' else 'clear')


def next_command(command):
    """
    Tells on the program the next command
    """
    print("Preparing command: {:s}".format(command), end="\n\n")
    input("Press ENTER to continue...")
    clear()
    os.system(command)


clear()
for i in range(len(commands)):
    next_command(commands[i])
    print()

clear()
print("And now, the GUI of the Sudoku!")
input("Press ENTER to continue...")
os.system("python3 interface.py")

print("Thank you for your attention!")
