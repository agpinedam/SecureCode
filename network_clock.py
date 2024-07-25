import tkinter as tk
from tkinter import messagebox
from tkcalendar import DateEntry
from datetime import datetime
import subprocess
import os
import re

def convert_format(custom_format):
    conversion_map = {
        'YYYY': '%Y',
        'yy': '%y',
        'MM': '%m',
        'DD': '%d',
        'HH': '%H',
        'mm': '%M',
        'SS': '%S',
    }

    for key, value in conversion_map.items():
        custom_format = custom_format.replace(key, value)
    
    return custom_format

def validate_format(format_str):
    valid_chars = re.compile(r'^[\w\s\-:\./%]+$')
    if not valid_chars.match(format_str):
        return "Format contains invalid characters."
    
    if 'YYYY' not in format_str and 'yy' not in format_str:
        return "Year specifier ('YYYY' or 'yy') is required."
    
    return None

def validate_time(hour, minute, second):
    try:
        hour = int(hour)
        minute = int(minute)
        second = int(second)
        
        if not (0 <= hour <= 23 and 0 <= minute <= 59 and 0 <= second <= 59):
            return "Time values out of range."
        return None
    except ValueError:
        return "Invalid time values."

def format_datetime(date, time):
    try:
        datetime_str = f"{date.strftime('%Y-%m-%d')} {time}"
        datetime.strptime(datetime_str, '%Y-%m-%d %H:%M:%S')
        return datetime_str
    except ValueError:
        return None

class NetworkClock:
    def __init__(self, root):
        self.root = root
        self.root.title("Network Clock")

        self.time_label = tk.Label(root, text="", font=("Helvetica", 48))
        self.time_label.pack(pady=20)

        self.format_frame = tk.Frame(root)
        self.format_frame.pack(pady=10)

        self.format_label = tk.Label(self.format_frame, text="Enter Format String:")
        self.format_label.pack(pady=5)

        self.format_entry = tk.Entry(self.format_frame, width=50)
        self.format_entry.insert(0, "YYYY-MM-DD HH:mm:SS")
        self.format_entry.pack(pady=5)

        self.update_button = tk.Button(self.format_frame, text="Update Time", command=self.update_time)
        self.update_button.pack(pady=5)

        self.format_info_label = tk.Label(self.format_frame, text=self.get_format_info(), font=("Helvetica", 10))
        self.format_info_label.pack(pady=10)

        self.invalid_chars_label = tk.Label(self.format_frame, text="", font=("Helvetica", 10))
        self.invalid_chars_label.pack(pady=10)

        self.set_time_frame = tk.Frame(root)
        self.set_time_frame.pack(pady=10)

        self.label = tk.Label(self.set_time_frame, text="Select Date and Time:")
        self.label.pack(pady=5)

        self.date_entry = DateEntry(self.set_time_frame, width=12, background='darkblue',
                                    foreground='white', borderwidth=2, date_pattern='y-mm-dd')
        self.date_entry.pack(pady=5)

        self.hour_entry = tk.Spinbox(self.set_time_frame, from_=0, to=23, format='%02.0f', width=3)
        self.minute_entry = tk.Spinbox(self.set_time_frame, from_=0, to=59, format='%02.0f', width=3)
        self.second_entry = tk.Spinbox(self.set_time_frame, from_=0, to=59, format='%02.0f', width=3)

        self.hour_entry.pack(side=tk.LEFT, padx=5)
        tk.Label(self.set_time_frame, text=":").pack(side=tk.LEFT)
        self.minute_entry.pack(side=tk.LEFT, padx=5)
        tk.Label(self.set_time_frame, text=":").pack(side=tk.LEFT)
        self.second_entry.pack(side=tk.LEFT, padx=5)

        self.set_time_button = tk.Button(self.set_time_frame, text="Set System Time", command=self.open_calendar)
        self.set_time_button.pack(pady=10)

        self.update_time()

    def update_time(self):
        format_str = self.format_entry.get()
        error_message = validate_format(format_str)

        if error_message:
            self.invalid_chars_label.config(text=error_message)
            self.time_label.config(text="Invalid format")
            return
        
        try:
            converted_format = convert_format(format_str)
            current_time = datetime.now().strftime(converted_format)
            self.time_label.config(text=current_time)
            self.invalid_chars_label.config(text="")
        except ValueError:
            self.time_label.config(text="Invalid format")
            self.invalid_chars_label.config(text="")

        self.root.after(1000, self.update_time)

    def open_calendar(self):
        date = self.date_entry.get_date()
        time = f"{self.hour_entry.get()}:{self.minute_entry.get()}:{self.second_entry.get()}"
        datetime_str = format_datetime(date, time)

        if datetime_str:
            self.set_system_time(datetime_str)
        else:
            messagebox.showerror("Error", "Invalid date/time format. Use YYYY-MM-DD HH:MM:SS.")

    def set_system_time(self, new_time):
        try:
            result = subprocess.run(['pkexec', 'python3', os.path.abspath('update_time.py'), new_time],
                                    capture_output=True, text=True)
            if result.returncode == 0:
                messagebox.showinfo("Success", "System time updated successfully")
            else:
                messagebox.showerror("Error", f"Failed to update system time: {result.stderr}")
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Error", f"Failed to update system time: {str(e)}")

    def get_format_info(self):
        info = (
            "Format Specifiers:\n"
            "YYYY - Full year (e.g., 2024)\n"
            "yy - Two-digit year (e.g., 24)\n"
            "MM - Month (01 to 12)\n"
            "DD - Day of the month (01 to 31)\n"
            "HH - Hour (00 to 23)\n"
            "mm - Minutes (00 to 59)\n"
            "SS - Seconds (00 to 59)"
        )
        return info

if __name__ == "__main__":
    root = tk.Tk()
    app = NetworkClock(root)
    root.mainloop()