import Tkinter as tk, ttk

class UI(tk.Frame):
	manager = None

	def __init__(self, master=None):
		master = tk.Tk()
		tk.Frame.__init__(self, master)
		self.pack(expand=1, fill="both")
		pad = 0
		master.geometry("{0}x{1}+0+0".format(master.winfo_screenwidth()-pad,master.winfo_screenheight()-pad)) # Set fullscreen

		n = ttk.Notebook(self)

		page1 = ttk.Frame(n)
		page2 = ttk.Frame(n)

		n.add(page1, text="Characters")
		n.add(page2, text="??")

		n.pack(expand=1, fill="both")

	def setManager(self, manager):
		self.manager = manager

	def run(self):
		self.mainloop()
		pass