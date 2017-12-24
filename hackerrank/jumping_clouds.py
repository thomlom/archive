#!/bin/python3

import sys

n = int(input().strip())
c = [int(c_temp) for c_temp in input().strip().split(' ')]

path = 1
numberOfJumps = 0

while path != len(c):
    if len(c) - path <= 2:
        numberOfJumps += 1
        break
    if c[path+1]:
        path += 1
    elif c[path]:
        path += 2
    else:
        path += 2
    numberOfJumps += 1 

print(numberOfJumps)