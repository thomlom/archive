#!/bin/python3

import sys

n = int(input().strip())
c = [int(c_temp) for c_temp in input().strip().split(' ')]
total = 0
counters = {}

for i in c:
    if i in counters:
        counters[i] += 1
    else:
        counters[i] = 1

for i in counters:
    total += (counters[i]//2)

print(total)