import sys
import subprocess

if len(sys.argv) != 2:
    print("Usage: update_time.py <new_time>")
    sys.exit(1)

new_time = sys.argv[1]

try:
    result = subprocess.run(['date', '-s', new_time], capture_output=True, text=True, check=True)
    print("System time updated successfully")
except subprocess.CalledProcessError as e:
    print(f"Failed to update system time: {e}", file=sys.stderr)
    sys.exit(1)
