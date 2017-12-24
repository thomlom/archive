#!/bin/python3

import sys

S = input().strip()
originalS = 'SOS' * (len(S)//3)
diffLetters = [S[i] for i in range(len(S)) if S[i] != originalS[i]]

print(len(diffLetters))