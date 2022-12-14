//
// Random Select
//
// Version: 0.2
//
// Created by André Berg on 2008-12-16
// Copyright © 2008 Berg Media. All rights reserved.
//
// FOR LICENSE DETAILS SEE THE END OF THE SCRIPT
//
// This script demonstrates an easy way of randomizing
// the selection of a given number of objects.
// If nothing is selected prior to calling the script then all
// page items of the foremost document are set as the 
// inital selection.
//
// Should work with Illustrator CS4/CS3 and possibly earlier
// versions too. Tested on Mac OS X 10.5.5 (Leopard) only but
// because it uses JavaScript/ExtendScript it is supposed to
// work on Windows too.
// 
// NB: Please keep in mind this is my first JavaScript/ExtendScript...
//

var scriptID = "Random Select v0.2";
var i, j, k, l;

if (app.documents.length > 0) {
	var doc = app.activeDocument;
	
	// select all page items if selection is empty
	if (doc.selection.length == 0) {
		for (i = 0; i < doc.pageItems.length; i++) {
			doc.pageItems[i].selected = true;
		}
		alert(scriptID + "\nSelection was empty. Did select " + doc.selection.length.toString() + " page items");
	}

	var percent = prompt ("Max amount (percent) of objects to randomly select", 50, scriptID);
	
	// sanity checks
	if (isNaN(percent) || percent == null || percent.length == 0) {
		// User cancelled, or entered nothing or something that isn't a number, 
		// so do nothing until end
	} else {
		if (percent <= 0) percent = 1;
		if (percent > 100) percent = 100;
	
		var selectedObjects = doc.selection;

		//$.writeln("Debug: selectedObjects = " + selectedObjects);
		//alert(scriptID + "\nDebug: selectedObjects.length = " + selectedObjects.length.toString() + "");
	
		var numSelectedObjects = selectedObjects.length;
		var numRequestedObjects = Math.round(numSelectedObjects * percent / 100);
		var nr = new Number;
		var nrList = new Array;
		var modifiedSelection = new Array;
		
		// build up a list of random numbers with list length of numRequestedObjects
		for (k = 0; k < numSelectedObjects; k++) {
			if (nrList.length >= numRequestedObjects) break;
			nr = getRandomNumber (0, numSelectedObjects-1);
			if  (!(isContainedByArray (nr, nrList))) nrList.push(nr);
		}
		//alert(scriptID + "\nDebug: nrList.length = " + nrList.length.toString());
		
		// deselect all...
		doc.selection = [];
		// ...then select all objects whose random number index matches
		for (l = 0; l < nrList.length; l++) {
			var idx = nrList[l];
			if (selectedObjects[idx] == undefined) {
				// do nothing;
				//$.writeln("Debug: selectedObjects.length = " + selectedObjects.length);
				//$.writeln("Debug: selectedObjects[" + idx + "] was undefined");
			} else {
				selectedObjects[idx].selected = true;
			}
		}
		//alert (scriptID + "\nDebug: selectedObjects.length after modification = " + doc.selection.length.toString());
	}
} else {
	alert(scriptID + "\nError: No active document \nPlease open a document and try again");
}

// Description: Checks if a number 'num' is contained by an array 'arr'
// ReturnValue: false if num is not contained by arr, true otherwise
function isContainedByArray(num, arr) {
	var x;
	for (x = 0; x < arr.length; x++) {
		if (arr[x] == num) return true;
	}
	return false;
}

// Description: Calculate a random number between 'min' and 'max'
// ReturnValue: A random integer number or -1 in case of erroneous input
function getRandomNumber(min, max) {
        if (min > max) {
                return -1;
        }
        if (min == max) {
                return min;
        }
        return (min + parseInt( Math.random() * (max-min+1)));
}

// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 
//
// * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
// * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 
// * Neither the name of Berg Media nor the name of André Berg may be used to endorse or promote products derived from this software without specific prior written permission.
//
// WARRANTIES AND DISCLAIMERS
//
// THIS SOFTWARE IS PROVIDED BY ANDRÉ BERG OF BERG MEDIA (DESIGNATED FROM HEREON AS "THE AUTHOR") "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
