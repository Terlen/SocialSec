/* This script is the main event page script. It contains the code to create the trie data structure for storing user data, it handles inter-extension 
	communication via Chrome message passing, it interfaces with the Google storage API to store the user's data, whitelists, and profile picture
	remotely, and it spawns the alert notifications when user data is detected in a password. */

var detectedPhrase;
var trie;
// Defines a flag that is used to determine if the SocialSec notification already has a listener added.
var listenerExists;

// Add a listener to the event page that waits for a message from content scripts.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	// If received message has a greeting of loginsecure, then Facebook login has complete successfully.
    if (request.greeting == "loginsecure"){
		sendResponse({farewell: "goodbye"});
		// Use access token to fetch GraphAPI data on user and their Facebook profile image.
		getPicture();
		getData();
		// Change extension popup and icon to reflect that the user is protected.
		chrome.browserAction.setIcon({path : "icon.png"});
		chrome.browserAction.setPopup({popup : "popup2.html"});
	}
	
	// If received message has a non-undefined passvalue, then the password detect script has fetched a password to test.
	else if (request.passvalue != undefined){
		// Check if password data is stored in the trie
		if (trie.contains(trie.root, request.passvalue)){
			detectedPhrase = trie.contains(trie.root, request.passvalue);
			// If data is found in trie, spawn a notification alerting the user.
			notifications(request, sender, sendResponse);
			notificationPage();
			return true;
		}
	}
	
	// If received message requests a phrase, return the last phrase detected by password detect.
	else if (request.phrase){
		sendResponse({phrase: detectedPhrase});
	}
	
	// If received message greeting is secure, build the trie using stored data and change icons to indicate that extension is operating.
	else if (request.greeting == "secure"){
		trieData();
		chrome.browserAction.setIcon({path : "icon.png"});
		chrome.browserAction.setPopup({popup : "popup2.html"});
		sendResponse({complete: "done"});
	}
	
	// If received message contains a command, remove the command word from the trie and add it to the phrase whitelist.
	else if (request.command){
		trie.remove(request.command);
		chrome.storage.sync.get("phraseWhitelist", function(item){
			// If the whitelist doesn't exist, create a new one with the command word.
			if(!item.phraseWhitelist){
				var whitelist = request.command;
				chrome.storage.sync.set({"phraseWhitelist": whitelist});
			}
			// If the whitelist already exists, add the new word to it and update the stored copy.
			else{
				var whitelist = [item.phraseWhitelist];
				whitelist.push(request.command);
				chrome.storage.sync.set({"phraseWhitelist": whitelist});
				}
		});
		sendResponse({feedback: "Good work"});
	}
	
	// If received message sends clear, then rebuild the trie from stored data to restore previously whitelisted phrases.
	else if (request.clear){
		trieData();
	}
  }
);

// Function opens new window or tab based on user prefences in Chrome. Cannot force new tab only. Will focus on new window/tab when opened.
function userSettings(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
	chrome.storage.local.set({"currentURL":url})
	});
	var x = window.open("alert.html", '_blank');
	x.focus();
}

// Function that defines the Chrome notification.
function notifications(request, sender, sendResponse){
	var options = {
		type:"basic",
		title:"SocialSec",
		message:"",
		iconUrl:"SS.png",
	};
	options.message = "The detected password contains personal information!";
	chrome.notifications.create(options);
	sendResponse({complete: "done"});
}

// Function that adds a listener to the created notification that opens a new tab with a SocialSec page. If a listener already exists, don't add another listener.
function notificationPage(){
	if (listenerExists != 1){
		chrome.notifications.onClicked.addListener(userSettings);
		listenerExists = 1;
	}
}

// Trie data structure code is inspired by and adapted from Ben Vallon's Computer Science in Javascript #data-structures series
// His code can be found at https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/trie.js

// Node object creation. When called, creates Node object with given properties.
function Node(data){
	this.data = data;
	this.isWord = false;
	this.prefixes = 0;
	this.children = {};
}

// Create a new trie structure with a root node containing and empty string.
function Trie(){
	this.root = new Node('');
}

// Defines trie method for adding a word to the structure. 
Trie.prototype.add = function(node, word) {
  if(!node || !word) {
    return null;
  }
  node.prefixes++;
  var letter = word.charAt(0);
  /* Check if the node already has a child with the given letter. If no child is found for that letter, create a new one and add it to the previous node's 
	 child property. Important to note that although children was originally declared as an empty array, by using a named index and not a numerical, 
	 Javascript automatically converts to an object. */
  var child = node.children[letter];
  if(!child) {
		/* Substitution handling. If one of the pre-defined substitution characters is added to the trie, substitution characters are added and the 
		   trie is branched from the substitutions as well as the original character. */
	    if (letter.match(/^(a|b|c|e|g|i|l|o|s|t)$/)){
			switch (letter){
				case 'a':
					child = new Node('a');
					node.children['a'] = child;
					this.addRecursive(child, word);
					child = new Node('@');
					node.children['@'] = child;
					this.addRecursive(child, word);
					child = new Node('4');
					node.children['4'] = child;
					this.addRecursive(child, word);
					break;
				case 'b':
					child = new Node('b');
					node.children['b'] = child;
					this.addRecursive(child, word);
					child = new Node('6');
					node.children['6'] = child;
					this.addRecursive(child, word);
					break;
				case 'c':
					child = new Node('c');
					node.children['c'] = child;
					this.addRecursive(child, word);
					child = new Node('(');
					node.children['('] = child;
					this.addRecursive(child, word);
					break;
				case 'e':
					child = new Node('e');
					node.children['e'] = child;
					this.addRecursive(child, word);
					child = new Node('3');
					node.children['3'] = child;
					this.addRecursive(child, word);
					break;
				case 'g':
					child = new Node('g');
					node.children['g'] = child;
					this.addRecursive(child, word);
					child = new Node('9');
					node.children['9'] = child;
					this.addRecursive(child, word);
					break;
				case 'i':
					child = new Node('i');
					node.children['i'] = child;
					this.addRecursive(child, word);
					child = new Node('1');
					node.children['1'] = child;
					this.addRecursive(child, word);
					child = new Node('!');
					node.children['!'] = child;
					this.addRecursive(child, word);
					break;
				case 'l':
					child = new Node('l');
					node.children['l'] = child;
					this.addRecursive(child, word);
					child = new Node('1');
					node.children['1'] = child;
					this.addRecursive(child, word);
					child = new Node('!');
					node.children['!'] = child;
					this.addRecursive(child, word);
					break;
				case 'o':
					child = new Node('o');
					node.children['o'] = child;
					this.addRecursive(child, word);
					child = new Node('0');
					node.children['0'] = child;
					this.addRecursive(child, word);
					break;
				case 's':
					child = new Node('s');
					node.children['s'] = child;
					this.addRecursive(child, word);
					child = new Node('5');
					node.children['5'] = child;
					this.addRecursive(child, word);
					break;
				case 't':
					child = new Node('t');
					node.children['t'] = child;
					this.addRecursive(child, word);
					child = new Node('+');
					node.children['+'] = child;
					this.addRecursive(child, word);
					child = new Node('7');
					node.children['7'] = child;
					this.addRecursive(child, word);
					break;
				default:
					alert('No data matched. You should not be seeing this.')
			}
		}
		// If the added character isn't a commonly substituted character, simply add it to the trie.
		else{
			child = new Node(letter);
			node.children[letter] = child;
		}
  }

this.addRecursive(child, word);
 };
/* Determine how many characters are left in word to be added. If none, set isWord flag to true and complete. Else, recursively call add with new child
   node and rest of phrase. */
Trie.prototype.addRecursive = function(child, word){
  var remainder = word.substring(1);
  if(!remainder) {
    child.isWord = true;
  }
  this.add(child, remainder);
}

// Debug function to list all words stored in the trie.
Trie.prototype.getWords = function() {
  var words = [];
  var word = '';
  this._getWords(this.root, words, words, word);
  return words;
};
Trie.prototype._getWords = function(node, words, word) {
  for(var child in node.children) {
    if(node.children.hasOwnProperty(child)) {
      word += child;
      if (node.children[child].isWord) {
        words.push(word);
      }
      this._getWords(node.children[child], words, word);
      word = word.substring(0, word.length - 1);
    }
  }
};
// Trie method for searching the structure for a particular word.
// The original trie.contains method described by Ben Vallon is only effective for exact matching. For our project, the matching word may be located inside of a longer string.
// This meant .contains required modification to search the entirety of a string for a keyword.
var fullWord ="";
Trie.prototype.contains = function(node, word) {
  if(!node || !word) {
    return false;
  }
  var letter = word.charAt(0);
  var child = node.children[letter];
  if(child) {
    var remainder = word.substring(1);
    if(child.isWord) {
		fullWord+=child.data.toString();
		var finalWord = fullWord;
		fullWord="";
      return finalWord;
    } 
	else {
		fullWord+=child.data.toString();
		return this.contains(child, remainder);
    }
// The original .contains method simply terminates the search if there a node has no children containing the target letter.
// This doesn't work for our use case as the keyword may lie after an arbitrary string not contained in the trie.
  } 
  else {
	// If there is no branch off root with the current letter, move to the next letter of the target string.
	if (!remainder){
		fullWord="";
		return this.contains(this.root, word.substring(1));
	// If there is no branch off the current node with the current letter but the target string has not been fully searched, restart the search at root from the current location in the target string.
	}  
	else if (remainder.substring(1).length > 0){
		return this.contains(this.root, remainder.substring(1));
	// The full target string has been searched and there was no hit. This means the target string truely doesn't contain any keywords.
	}  
	else{
		return false;
	}
  }
};

// Function to remove words from the trie.
Trie.prototype.remove = function(word){
	if(!this.root){
		return;
	}
	if(this.contains(this.root,word)){
		this._removeNode(this.root, word);
	}
};

Trie.prototype._removeNode = function(node, word){
	if(!node || !word){
		return;
	}
	node.prefixes--;
	var letter = word.charAt(0);
	var child = node.children[letter];
	if(child){
		// Because words may introduce substitutions when added, all variations must be removed as well.
		if (letter.match(/^(a|b|c|e|g|i|l|o|s|t)$/)){
			switch(letter){
				case 'a':
					letter = 'a';
					this.recursiveRemove(letter,word,node,child);
					letter = '@';
					this.recursiveRemove(letter,word,node,child);
					letter = '4';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'c':
					letter = 'c';
					this.recursiveRemove(letter,word,node,child);
					letter = '(';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'e':
					letter = 'e';
					this.recursiveRemove(letter,word,node,child);
					letter = '3';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'g':
					letter = 'g';
					this.recursiveRemove(letter,word,node,child);
					letter = '9';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'i':
					letter = 'i';
					this.recursiveRemove(letter,word,node,child);
					letter = '1';
					this.recursiveRemove(letter,word,node,child);
					letter = '!';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'l':
					letter = 'l';
					this.recursiveRemove(letter,word,node,child);
					letter = '1';
					this.recursiveRemove(letter,word,node,child);
					letter = '!';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 'o':
					letter = 'o';
					this.recursiveRemove(letter,word,node,child);
					letter = '0';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 's':
					letter = 's';
					this.recursiveRemove(letter,word,node,child);
					letter = '5';
					this.recursiveRemove(letter,word,node,child);
					break;
				case 't':
					letter = 't';
					this.recursiveRemove(letter,word,node,child);
					letter = '+';
					this.recursiveRemove(letter,word,node,child);
					letter = '7';
					this.recursiveRemove(letter,word,node,child);
					break;
			}
		
		} 
		else{
			var remainder = word.substring(1);
			if(remainder){
				if(child.prefixes === 1){
					delete node.children[letter];
				} 
				else{
					this._removeNode(child, remainder);
				}
			}	 
			else{
				if(child.prefixes === 0){
					delete node.children[letter];
				} 
				else{
					child.isWord = false;
			}
			}
		}
	}
};

Trie.prototype.recursiveRemove = function(letter, word, node, child){
	var remainder = word.substring(1);
	if(remainder){
		if(child.prefixes === 1){
			delete node.children[letter];
		} 
		else{
			this._removeNode(child, remainder);
		}
	} 
	else{
		if(child.prefixes === 0){
			delete node.children[letter];
		} 
		else{
			child.isWord = false;
		}
	}
}

// Debug function to print trie characters per level
Trie.prototype.printByLevel = function() {
  if(!this.root) {
    return console.log('No root node found');
  }
  var newline = new Node('\n');
  var queue = [this.root, newline];
  var string = '';
  while(queue.length) {
    var node = queue.shift();
    string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
    if(node === newline && queue.length) {
      queue.push(newline);
    }
    for(var child in node.children) {
      if(node.children.hasOwnProperty(child)) {
        queue.push(node.children[child]);
      }
    }
  }
  console.log(string.trim());
};

// Fetch stored data in Chrome storage. Once completed, call buildTrie and pass retrieved data.
function trieData(){
	chrome.storage.sync.get("phraseWhitelist", function(data){
		if (!data.phraseWhitelist){
			chrome.storage.sync.get("userdata", function(data){
				var array = data.userdata;
				buildTrie(array);
			});
		}
		else{
			chrome.storage.sync.get("userdata", function(item){
				var trieData = item.userdata.filter(function(val){
					return data.phraseWhitelist.indexOf(val) == -1;
				});
				buildTrie(trieData);
			});
		}
	});
	
}

// Create trie structure with fetched data from Chrome storage.
function buildTrie(data){
	trie = new Trie();
	for (var x = 0; x < data.length; x++){
			var value = (data[x]);
			trie.add(trie.root,data[x].toString());
		}
}

// HTTP GET request function. 'theUrl' is passed from getData and consists of the desired Graph API endpoint with the user's access token appended.
function httpGetAsync(theUrl, callback, type)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        // XMLHttpRequests are Asynchronous, so this code detects when the request has successfully completed.
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,type);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// Retrieve the user access token from chrome storage, then call httpGetAsync to send a GET using fetched token.
function getData() {
	chrome.storage.sync.get("accessToken", function(item) {
		// GET request to custom GraphAPI endpoint. Utilizes the access token stored in Google Storage
		httpGetAsync("https://graph.facebook.com/me?fields=id,cover,first_name,last_name,age_range,gender,email&access_token="+item.accessToken, jsonParse, "data");
	});
};

function getPicture() {
	chrome.storage.sync.get("accessToken", function(item) {
		// GET request to custom GraphAPI endpoint. Utilizes the access token stored in Google Storage
		httpGetAsync("https://graph.facebook.com/me?fields=picture.height(100).width(100)&access_token="+item.accessToken, jsonParse, "img");
	});
}
// Facebook JSON formatted data is converted to an object for easier handling.
function jsonParse(json,type) {
	var userData = JSON.parse(json);
	if (type == "img"){
		wordlistStore(userData,"img")
	} 
	else {
		dataStrip(userData);
	}
	
	
}
// Removes unnecessary data from storage
function dataStrip(userData){
	var cleanData = [];
	cleanData.push(userData.first_name.toLowerCase());
	cleanData.push(userData.last_name.toLowerCase());
	if (userData.email){
		cleanData.push(userData.email);
	}
	findDates(cleanData,userData.age_range.max,userData.age_range.min);
	wordlistStore(cleanData,"data");
}

function findDates(array,max,min){
	var date = new Date();
	var currentYear = date.getFullYear();
	for (x = 0; x < min+1; x++){
		array.push(currentYear - x);
	}
	if (typeof max != 'undefined'){
		for (x = min+1; x < max+2; x++){
		array.push(currentYear -x);
		}
	}
	else{
		for (x = min; x < 80; x++){
			array.push(currentYear - x);
		}
	}
	
}

// Store JSON object in Google storage to retrieve later
function wordlistStore(jsonobject,type) {
	if (type == "data"){
		chrome.storage.sync.set({ "userdata" : jsonobject}, function() {
		if (chrome.runtime.error){
			alert("Runtime Error");
		}
		});
			trieData();
	}
	else if (type == "img"){
		chrome.storage.sync.set({ "userpic" : jsonobject}, function() {
		if (chrome.runtime.error){
			alert("Runtime Error");
		}
		});
	}
}

