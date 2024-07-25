import tkinter as tk
from tkinter import messagebox
import datetime
import subprocess
import os

def convert_format(custom_format):
    # Mapea formatos personalizados a los que `strftime` entiende
    conversion_map = {
        'YYYY': '%Y',
        'YY': '%y',
        'MM': '%m',
        'DD': '%d',
        'HH': '%H',
        'mm': '%M',
        'SS': '%S',
    }

    # Reemplaza los patrones personalizados en el formato
    for key, value in conversion_map.items():
        custom_format = custom_format.replace(key, value)
    
    return custom_format

class NetworkClock:
    def __init__(self, root):
        self.root = root
        self.root.title("Network Clock")

        self.time_label = tk.Label(root, text="", font=("Helvetica", 48))
        self.time_label.pack(pady=20)

        self.format_entry = tk.Entry(root, width=50)
        self.format_entry.insert(0, "YYYY-MM-DD HH:mm:SS")  # Formato inicial personalizado
        self.format_entry.pack(pady=10)

        self.update_button = tk.Button(root, text="Update Time", command=self.update_time)
        self.update_button.pack(pady=10)

        self.set_time_button = tk.Button(root, text="Set System Time", command=self.set_system_time)
        self.set_time_button.pack(pady=10)

        # Etiqueta para mostrar el formato soportado
        self.format_info_label = tk.Label(root, text=self.get_format_info(), font=("Helvetica", 10))
        self.format_info_label.pack(pady=10)

        self.update_time()

    def update_time(self):
        format_str = self.format_entry.get()
        try:
            converted_format = convert_format(format_str)
            current_time = datetime.datetime.now().strftime(converted_format)
            self.time_label.config(text=current_time)
        except ValueError:
            self.time_label.config(text="Invalid format")
        self.root.after(1000, self.update_time)

    def set_system_time(self):
        new_time = self.format_entry.get()
        try:
            result = subprocess.run(['pkexec', 'python3', os.path.abspath('time_setup.py'), new_time], capture_output=True, text=True)
            if result.returncode == 0:
                messagebox.showinfo("Success", result.stdout)
            else:
                messagebox.showerror("Error", result.stderr)
        except subprocess.CalledProcessError as e:
            messagebox.showerror("Error", f"Failed to update system time: {str(e)}")

    def get_format_info(self):
        # Proporciona información sobre los caracteres de formato soportados
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
