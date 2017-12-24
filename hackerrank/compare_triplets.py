#!/bin/python3

import sys

a = input().strip().split(' ')
b = input().strip().split(' ')

pointsA = 0
pointsB = 0

for i in range(len(a)):
    if int(a[i]) > int(b[i]):
        pointsA += 1
    if int(a[i]) < int(b[i]):
        pointsB += 1

print(pointsA, pointsB)