// Trie data structure code is adapted from Ben Vallon's Computer Science in Javascript #data-structures series
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
// Check if the node already has a child with the given letter. If no child is found for that letter, create a new one and add it to the previous node's child property.
// Important to note that although children was originally declared as an empty array, by using a named index and not a numerical, Javascript automatically converts to an object.
  var child = node.children[letter];
  if(!child) {
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
		}else{
			child = new Node(letter);
			node.children[letter] = child;
		}
  }

this.addRecursive(child, word);
 };
// Determine how many characters are left in word to be added. If none, set isWord flag to true and complete. Else, recursively call add with new child node and rest of word.

//For loop needed for each created Node
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
	
	//alert(node.data);
  if(!node || !word) {
	  //alert("NO TRIE OR WORD");
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
    } else {
		fullWord+=child.data.toString();
		
      return this.contains(child, remainder);
    }
// The original .contains method simply terminates the search if there a node has no children containing the target letter.
// This doesn't work for our use case as the keyword may lie after an arbitrary string not contained in the trie.
  } else {
	// If there is no branch off root with the current letter, move to the next letter of the target string.
	if (!remainder){
		fullWord="";
		return this.contains(this.root, word.substring(1));
	// If there is no branch off the current node with the current letter but the target string has not been fully searched, restart the search at root from the current location in the target string.
	}  else if (remainder.substring(1).length > 0){
		return this.contains(this.root, remainder.substring(1));
	// The full target string has been searched and there was no hit. This means the target string truely doesn't contain any keywords.
	}  else{
		//alert("full phrase test");
		return false;
	}
	
  }
};

Trie.prototype.remove = function(word){
	if(!this.root){
		alert("NO ROOT");
		return;
	}
	if(this.contains(this.root,word)){
		this._removeNode(this.root, word);
	}
};

Trie.prototype._removeNode = function(node, word){
	if(!node || !word){
		alert("NO ROOT OR WORD");
		return;
	}
	node.prefixes--;
	var letter = word.charAt(0);
	var child = node.children[letter];
	if(child){
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
				default:
					alert("DEFAULT CASE");
			}
		
		} else{
		var remainder = word.substring(1);
		if(remainder){
			if(child.prefixes === 1){
				delete node.children[letter];
			} else{
				this._removeNode(child, remainder);
			}
		} else{
			if(child.prefixes === 0){
				delete node.children[letter];
			} else{
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
		} else{
			this._removeNode(child, remainder);
		}
	} else{
		if(child.prefixes === 0){
			delete node.children[letter];
		} else{
			child.isWord = false;
		}
	}
}
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
		}else{
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
	/* if (data.userdata){
		for (var x = 0; x < data.userdata.length; x++){
			var value = (data.userdata[x]);
			trie.add(trie.root,data.userdata[x].toString());
		}
	}else{ */
	for (var x = 0; x < data.length; x++){
			var value = (data[x]);
			trie.add(trie.root,data[x].toString());
		}
// Debug code to list contents of trie.
	//alert(trie.getWords());
	//alert("Does trie contain \"testaidantest\"?" + trie.contains("testaidantest"));
}
var trie;