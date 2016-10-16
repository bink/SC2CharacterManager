import Tkinter as tk, ttk
from CharacterPage import CharacterPage

class UI(tk.Frame):
	manager = None

	def __init__(self, master=None):
		master = tk.Tk()

		master.style = ttk.Style()
		if "clam" in master.style.theme_names():
			master.style.theme_use("clam")

		tk.Frame.__init__(self, master)
		self.pack(expand=1, fill="both")
		pad = 0
		master.geometry("{0}x{1}+0+0".format(master.winfo_screenwidth()-pad,master.winfo_screenheight()-pad)) # Set fullscreen

		n = ttk.Notebook(self)

		self.charTab = ttk.Notebook(n)
		page2 = ttk.Frame(n)

		n.add(self.charTab, text="Characters")
		n.add(page2, text="??")

		n.pack(expand=1, fill="both")

	def setManager(self, manager):
		self.manager = manager

	def update(self):
		for c in self.manager.characters:
			cPage = CharacterPage(self.charTab,c)
			self.charTab.add(cPage,text="Character 1")
		pass

	def run(self):
		self.update()
		self.mainloop()
		pass