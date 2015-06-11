on split(str, delim)
	set oldDelimiters to AppleScript's text item delimiters
	set AppleScript's text item delimiters to delim
	set arr to every text item of str
	set AppleScript's text item delimiters to oldDelimiters
	return arr
end split

on trim_line(txt, trim_chars)
	set x to the length of the trim_chars
	repeat while txt begins with the trim_chars
		try
			set txt to characters (x + 1) thru -1 of txt as string
		on error
			return ""
		end try
	end repeat
	repeat while txt ends with the trim_chars
		try
			set txt to characters 1 thru -(x + 1) of txt as string
		on error
			return ""
		end try
	end repeat
	return txt
end trim_line

#tags are reported by things as a csv string
#we'll split that and turn it into a real array, then into a json array
on format_tags(tags)
	set taglist to split(tags, ",")
	set tagstr to "["
	repeat with tag in taglist
		set tagstr to tagstr & "\"" & trim_line(tag, " ") & "\","
	end repeat
	set tagstr to trim_line(tagstr, ",")
	set tagstr to tagstr & "]"
	return tagstr
end format_tags

on serialize(props)
	
	#we can't acccess certain props by name due to spaces or reserved words
	set counter to 0
	
	repeat with x in props as list
		if counter = 0 then
			set stat to x
		end if
		if counter = 1 then
			set tags to x
		end if
		if counter = 3 then
			set due to x
		end if
		set counter to counter + 1
	end repeat
	
	set tagstr to format_tags(tags)
	
	set json to "{\"id\":\"" & id of props & "\",\"name\":\"" & name of props & "\",\"tags\":" & tagstr & ",\"status\":\"" & (stat as string) & "\"" & "}"
	
	return json
	
end serialize

on things_json(list_name)
	
	tell application "Things"
		
		set all_json to "["
		repeat with toDo in to dos of list list_name
			set all_json to all_json & my serialize(properties of toDo) & ","
		end repeat
		set all_json to my trim_line(all_json, ",") & "]"
		
	end tell
	
	return all_json
end things_json

#make it all happen
set list_name to "Today"
set json to things_json(list_name)
return json