highlight_aWord_inText
----------------------
highlight_aWord_inText: a script function to  highlight all occurrences of a word in a text line

purpose: highlight all occurrences of a word in a text line

method:
-	1) make a lowercase copy of the text  ( obtain text_Lw ) 
-	2) transform non-alphabetic characters found  into blanks (obtain text_LwChg)
-	3) put a blank character at the beginning and the end of both lower case texts ( obtain s_text_Lw and s_text_LwChg)  
-	4) transform the word to look for in lowerCase and insert it between two blanks ( obtain s_word)
-	4) look for the transformed word s_word in the changed text s_text_LwChg and use the found positions to fish out the pieces of the original text origText
-	5) obtain a new line from the original inserting the words to highlight in a <span> element together with the className passed as parameter	

parameters:
-	origText:  the text to Change
-	word:      the word to look for in the text
-	spanClass: the class to put in the span to highlight a word	
-	charList:  list of the alphabetic characters to add to the ascii a-z (eg. german vocals with umlaut), no need to list both the lower and uppercase (all strings are changed in lowercase before being tested)     

eg. 
	var GermanText  = highlight_aWord_inText(inpText2, aWord2, boldClass2, 'äöüß'); 

**Antonio Cigna**
