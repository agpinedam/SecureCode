import ctypes
from datetime import datetime
import os

def set_system_time(new_time):
    try:
        if os.name == 'nt':  # Windows
            set_system_time_windows(new_time)
        elif os.name == 'posix':  # Unix/Linux
            set_system_time_unix(new_time)
        else:
            raise OSError("Unsupported operating system")
    except Exception as e:
        raise RuntimeError(f"Failed to update system time: {str(e)}")

def set_system_time_windows(new_time):
    import win32api
    dt = datetime.strptime(new_time, '%Y-%m-%d %H:%M:%S')
    win32api.SetSystemTime(dt.year, dt.month, dt.weekday() + 1, dt.day, dt.hour, dt.minute, dt.second, 0)

def set_system_time_unix(new_time):
    class TimeVal(ctypes.Structure):
        _fields_ = [("tv_sec", ctypes.c_long), ("tv_usec", ctypes.c_long)]

    libc = ctypes.CDLL("libc.so.6")
    tv = TimeVal()
    dt = datetime.strptime(new_time, '%Y-%m-%d %H:%M:%S')
    tv.tv_sec = int(dt.timestamp())
    tv.tv_usec = 0
    libc.settimeofday(ctypes.byref(tv), None)
