#!/bin/python3

import sys

t = int(input().strip())

for _ in range(t):
    numberOfStudents, cancelationThreshold = map(int, input().strip().split(' '))
    studentsOnTime = [int(a_temp) for a_temp in input().strip().split(' ') if int(a_temp) <= 0]
    if len(studentsOnTime) >= cancelationThreshold:
        print("NO")
    else:
        print("YES")