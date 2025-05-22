"use strict";
	  /*  
	  highlight_aWord_inText: a script function to  highlight all occurrences of a word in a text line
	  Antonio Cigna 2025
	  */
	  //----------------------------------------------
	  function highlight_aWord_inText(origText, word, spanClass, charList) {
	      /*
	      /*  
	      	purpose: highlight all occurrences of a word in a text line
	      	
	      	method:
	      		1) make a lowercase copy of the text  ( obtain text_Lw ) 
	      		2) transform non-alphabetic characters found  into blanks (obtain text_LwChg)
	      		3) put a blank character at the beginning and the end of both lower case texts ( obtain s_text_Lw and s_text_LwChg)  
	      		4) transform the word to look for in lowerCase and insert it between two blanks ( obtain s_word)
	      		4) look for the transformed word s_word in the changed text s_text_LwChg and use the found positions to fish out the pieces of the original text origText
	      		5) obtain a new line from the original inserting the words to highlight in a <span> element together with the className passed as parameter	
	      	parameters:
	      		origText:  the text to Change
	      		word:      the word to look for in the text
	      		spanClass: the class to put in the span to highlight a word	
	      		charList:  list of the alphabetic characters to add to the ascii a-z (eg. german vocals with umlaut), no need to list bothe lower and uppercase (only lowercase are tested)     
	      */
		  	
	      if (word) word = (""+word).trim();                 else return origText;
	      if (spanClass) spanClass = (""+spanClass).trim();  else return origText;
	      if (word == "")       return origText;		  
	      if (spanClass == "")  return origText;
		  
	      if (charList) {
	          charList = "a-z" + (""+charList).trim();
	      } else {
			  charList = "a-z"; 
		  }	  
	      var regExStr = "[^" + charList + "]";
	      var regEx1 = new RegExp(regExStr, "g");

	      var text_Lw = origText.toLowerCase();
	      var text_LwChg = text_Lw.replace(regEx1, " ");

	      var s_text_LwChg = " " + text_LwChg + " ";
	      var s_origText = " " + origText + " ";
	      //-----------
	      var s_word = " " + word.toLowerCase() + " ";

	      var f1 = 0,
	          f2 = 0;
	      var outLine = "";
	      //--------------------------------------
	      for (var s = 0; s < s_text_LwChg.length; s++) {
	          f2 = s_text_LwChg.indexOf(s_word, f1);
	          if (f2 < 0) break;
	          outLine += s_origText.substring(f1, f2 + 1) + '<span class="' + spanClass + '">' + s_origText.substring(f2 + 1, f2 + s_word.length - 1) + "</span>";
	          f1 = f2 + s_word.length - 1;
	      }
	      //-----------------------------
	      f2 = s_text_LwChg.length;
	      outLine += s_origText.substring(f1, f2);

	      return outLine;

	  } // end of highlight	

	  //----------------------

	  function test(word1, inp1, out1) {
	      /*
			<style>
			.spanClass {
				background-color:yellow;	
				font-weight:bold;
			}
			</style>	
				<div>
				<b>input</b><br>
				<div id="inp1">The Quick Brown Fox?  It runs and jumps. The little brown fox.</div> 
				<div id="inp2">Ich fahre regelmäßig mit dem Zug.</div> 
				<br><br>	  
				<b>output</b><br>
				<div id="out1"></div>
				<div id="out2"></div>			
			</div>   			
		*/
	      var text1 = document.getElementById(inp1).innerHTML;

	      var spanClass1 = "boldClass1";
	      var charList1 = "üßàèéì";

	      document.getElementById(out1).innerHTML = highlight_aWord_inText(text1, word1, spanClass1, charList1);

	  } // and test
	  //--------------------------------------

	  //test('fox', 'inp1', 'out1');
	  //test('zug', 'inp2', 'out2');
	  //----------------------------------------