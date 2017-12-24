#!/bin/python3

import sys

s = input().strip()
print(len([letter for letter in s if letter.lower() != letter]) + 1)