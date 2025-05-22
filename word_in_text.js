"use strict";
	  /*  
	  highlight_aWord_inText: a script function to  highlight all occurrences of a word in a text line
	  Antonio Cigna 2025
	  */
	  //----------------------------------------------
	  function highlight_aWord_inText(origText, word, spanClass, charList) {
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
	      		origText:  	the text to Change
	      		word:      	the word to look for in the text
	      		spanClass: 	the class to put in the span to highlight a word	
	      		charList:  	list of the alphabetic characters to add to the ascii a-z (eg. german vocals with umlaut), 
							there is no need to list bothe lower and uppercase (only lowercase are tested)     
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

	  
	  //----------------------------------------------
	  
	  function getListOfWords_inText(origText, charList) {
	      /*
	      	purpose: make a list of the words in a text
	     
			parameters:
	      		origText:  	the text
			 	charList:  	list of the alphabetic characters to add to the ascii a-z (eg. german vocals with umlaut), 
							there is no need to list bothe lower and uppercase (only lowercase are tested)     
	      */	
		 
	      if (charList) {
	          charList = "a-z" + (""+charList).trim();
	      } else {
			  charList = "a-z"; 
		  }	  
	      var regExStrSpc  = "[^" + charList + "]";
		  var regExStrWrd  = "["  + charList + "]";
	      var regExSpace   = new RegExp(regExStrSpc, "g");		  
	      var regExWord    = new RegExp(regExStrWrd, "g");
		 
	      var text_Chg = origText.toLowerCase().replace(regExSpace, " ") + " " + "W";
		  
		  text_Chg     = text_Chg.replace(regExWord,  "W");
		  
	      var fSpc = 0, fWrd=0;
		  
	      var listWord = [];
	      //--------------------------------------
		  var lenOrig = origText.length; 
	      for (var s = 0; s < lenOrig; s++) {
	          fSpc = text_Chg.indexOf(" ", fWrd);
	          if (fSpc < 0) break;
			  if (fSpc >= lenOrig) fSpc = lenOrig;
			  if (fSpc > fWrd) {
				  listWord.push(origText.substring(fWrd, fSpc) ); 
			  }	  
			  fWrd = text_Chg.indexOf("W", fSpc);
			  if (fWrd < 0 ) break;
			  if (fWrd >= lenOrig) fWrd = lenOrig;
			  //if (fWrd > fSpc)  console.log(fSpc + " " + fWrd + " ==>" + origText.substring(fSpc, fWrd) + "<==" );  			  
	      }
		  if (fWrd >=0 ) {
				fSpc = text_Chg.indexOf(" ", fWrd);
				if (fSpc >= lenOrig) fSpc = lenOrig;
				if (fSpc > fWrd) {
					listWord.push(origText.substring(fWrd, fSpc) ); 
				}	
		  }
			
		
	      return listWord; 

	  } // end of getListOfWords_inText
	  //----------------------
	  
	   
	  //----------------------------------------------
	  
	  function transform_inButton_EachWord_of_aText(origText, buttonElement, charList) {
	      /*
	      	purpose: make a list of the words in a text
	     
			parameters:
	      		origText:  	the text
				buttonElement: the button prototype eg. <button class="buttonClass" onclick="onClickFunction(this)"></button> 
			 	charList:  	list of the alphabetic characters to add to the ascii a-z (eg. german vocals with umlaut), 
							there is no need to list bothe lower and uppercase (only lowercase are tested)     
	      */	
		  if (buttonElement == undefined) buttonElement = "";
		  buttonElement = (""+buttonElement).trim(); 
		  
		  if (buttonElement.indexOf("<button") < 0) buttonElement = '<button class="buttonClass" onclick="onClickFunction(this)"></button>';
	      if (charList) {
	          charList = "a-z" + (""+charList).trim();
	      } else {
			  charList = "a-z"; 
		  }	  
	      var regExStrSpc  = "[^" + charList + "]";
		  var regExStrWrd  = "["  + charList + "]";
	      var regExSpace   = new RegExp(regExStrSpc, "g");		  
	      var regExWord    = new RegExp(regExStrWrd, "g");
		 
	      var text_Chg = origText.toLowerCase().replace(regExSpace, " ") + " " + "W";
		  
		  text_Chg     = text_Chg.replace(regExWord,  "W");
		  
	      var fSpc = 0, fWrd=0;
		  
	      var listWord = [];
		  var outLine="";
		  
		
		  var j= buttonElement.indexOf('</button');
		  if (j < 0) return [""];
		  var button1 = buttonElement.substring(0,j);
		  var button2 = '</button>'  
		  
	      //--------------------------------------
		  var lenOrig = origText.length; 
	      for (var s = 0; s < lenOrig; s++) {
	          fSpc = text_Chg.indexOf(" ", fWrd);
	          if (fSpc < 0) break;
			  if (fSpc >= lenOrig) fSpc = lenOrig;			 
			  if (fSpc > fWrd) {
					outLine += button1 + origText.substring(fWrd, fSpc) + button2; 
				}	
			  fWrd = text_Chg.indexOf("W", fSpc);
			  if (fWrd < 0 ) break;
			  if (fWrd >= lenOrig) fWrd = lenOrig;
			  if (fWrd > fSpc) {
				  outLine += origText.substring(fSpc, fWrd);  	
			  }		
	      }
		  if (fWrd >=0 ) {
				fSpc = text_Chg.indexOf(" ", fWrd);
				if (fSpc >= lenOrig) fSpc = lenOrig;
				if (fSpc > fWrd) {
					outLine += button1 + origText.substring(fWrd, fSpc) + button2; 
				}	
		  }
			
		
	      return outLine; 

	  } // end of getListOfWords_inText
	  //----------------------
	  
	  
	//=======================================
	function testList(inp1) {
		var text1 = document.getElementById(inp1).innerHTML;
		var spanClass1 = "boldClass1";
	    var charList1 = "üßàèéì";
		
		var wordList = getListOfWords_inText(text1, charList1);
		
		console.log(text1,"\n\t" +  wordList.join("\n\t") );	
		
		console.log( "\n-------------------------------------------------\n");
		
		var buttonElement = '<button class="buttonClass" onclick="onClickFunction(this)"></button>';
		var outLine = transform_inButton_EachWord_of_aText(text1, buttonElement,  'äöüß'); 
		console.log("text = ", text1); 
		console.log("outline= ", outLine); 
		
	}	
	  
	 
	//=================================	
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

	      document.getElementById(out1).innerHTML = highlight_aWord_inText(text1, word1, spanClass1, 'äöüß'); 

	  } // and test
	  //--------------------------------------

	  //test('fox', 'inp1', 'out1');
	  //test('zug', 'inp2', 'out2');
	  //----------------------------------------
	  