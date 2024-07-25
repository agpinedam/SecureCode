import sys
import subprocess
import datetime

if len(sys.argv) != 2:
    print("Usage: time_setup.py <new_time>")
    sys.exit(1)

new_time = sys.argv[1]
try:
    # No hace falta el análisis de la cadena de formato, simplemente pásala tal cual a `date`
    subprocess.run(['sudo', 'date', '-s', new_time], check=True)
    print("System time updated successfully")
except subprocess.CalledProcessError:
    print("Failed to update system time")
