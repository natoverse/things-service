on run argv
	set list_name to item 1 of argv
	set toDoId to item 2 of argv
	set stat to item 3 of argv
	tell application "Things"
		#search by list so it is a smaller set (I don't know a better way to just get by id)
		repeat with toDo in to dos in list list_name
			if toDo's id as string is equal to toDoId then set toDoToComplete to toDo
		end repeat
		if stat is equal to "completed" then
			set status of toDoToComplete to completed
		else
			set status of toDoToComplete to open
			#things moves to next upon open, so we need to re-find it
			repeat with toDo in to dos in list "next"
				if toDo's id as string is equal to toDoId then move toDo to list list_name
			end repeat
		end if
		
	end tell
end run