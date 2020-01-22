# Connection

Connection checks your network connection status and creates logs of when you've lost it.

## Prerequisities

- Unix based OS (Linux, macOS)
- [Python 3](https://www.python.org/downloads/)

## How to use the script

Download this script and save it into your `Documents` folder (for example)

Open a new terminal, edit your crontab (`crontab -e`) and add this line at the end of the file:

```sh
* * * * * cd ~/Documents/ && python3 connection.py
```

The script will be executed every minute and two files will be created in your directory: `log_connection.txt` and `log_connection_lost.txt`, don't **delete** them!
