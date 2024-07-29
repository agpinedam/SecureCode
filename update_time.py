import ctypes
import sys
from datetime import datetime

if len(sys.argv) != 2:
    print("Usage: update_time.py <new_time>")
    sys.exit(1)

new_time_str = sys.argv[1]

try:
    new_time = datetime.strptime(new_time_str, '%Y-%m-%d %H:%M:%S')
except ValueError:
    print("Invalid time format. Use YYYY-MM-DD HH:MM:SS.")
    sys.exit(1)

# Structure to hold time data
class timespec(ctypes.Structure):
    _fields_ = [("tv_sec", ctypes.c_long), ("tv_nsec", ctypes.c_long)]

# Convert datetime to timespec
def to_timespec(dt):
    epoch = datetime.utcfromtimestamp(0)
    delta = dt - epoch
    ts = timespec()
    ts.tv_sec = int(delta.total_seconds())
    ts.tv_nsec = delta.microseconds * 1000
    return ts

new_timespec = to_timespec(new_time)

# Perform the syscall to set the system time
try:
    libc = ctypes.CDLL('libc.so.6')
    if libc.clock_settime(0, ctypes.byref(new_timespec)) != 0:
        raise OSError(ctypes.get_errno())
    print("System time updated successfully")
except Exception as e:
    print(f"Failed to update system time: {e}", file=sys.stderr)
    sys.exit(1)
