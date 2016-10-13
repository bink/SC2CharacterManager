#!/usr/bin/python
import lib.SC2CharacterManager as SC2CharacterManager, lib.UI as UI

def main():
	m = SC2CharacterManager.Manager()
	u = UI.UI()
	u.setManager(m)
	u.run()
	return

if __name__ == '__main__':
	main()