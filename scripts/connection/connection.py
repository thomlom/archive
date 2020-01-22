#!/usr/bin/python
# coding: utf8

import socket
import datetime
import os

# Allows to create the logs in the current working directory
os.chdir(os.getcwd())

def is_connected():
    '''
    Gets the network connection status by trying to reach Google
    
    Returns True if Google is reachable, False otherwise
    '''
    try:
        host = socket.gethostbyname("www.google.com")
        s = socket.create_connection((host, 80), 2)
        return True
    except:
        pass
    return False


connection = str(is_connected())

print("Connected") if bool(connection) else print("Not connected")

# We store in a log file the current date and the network connection status
with open("log_connection.txt", "a") as f:
    format_date = datetime.datetime.now().strftime('%d-%m-%y %H:%M:%S')
    f.write(format_date + " " + connection + "\n")

connected = True
lost = []

with open("log_connection.txt", "r") as f:
    log = f.readline()
    while log != "":
        if "False" in log and connected:
            lost.append(log)
            connected = False
        if "True" in log and not connected:
            day, month, year = log.split(" ")[0].split("-")
            hour, minute, second = log.split(" ")[1].split(":")
            date = ("{}-{}-{}").format(day, month, year)
            preciseDate = ("{}:{}:{}").format(hour, minute, second)
            lost.append("Connection restored the {} at {}\n".format(date, preciseDate))
            connected = True
        log = f.readline()

with open("log_connection_lost.txt", "w") as f:
    for i in lost:
        f.write(i)
