import Tkinter as tk,ttk

class CharacterPage(tk.Frame):
	def __init__(self,master,character):
		tk.Frame.__init__(self,master)
		self.character = character

		self.buildUI()

	def buildUI(self):
		basicWidget = tk.LabelFrame(self, text="Basic Info")

		nameLabel = tk.Label(basicWidget, text="Character Name")
		nameLabel.pack(side="left")

		name = tk.Entry(basicWidget)
		name.pack(side="left")

		raceLabel = tk.Label(basicWidget, text="Race")
		raceLabel.pack(side="left")

		raceOptions = ["Terran", "Aiur Protoss", "Nerazim Protoss"]
		race = ttk.Combobox(basicWidget, values=raceOptions)
		race.pack(side="left")

		basicWidget.pack(fill="both",expand="no")


	pass