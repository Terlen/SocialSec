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
    child = new Node(letter);
    node.children[letter] = child;
  }
// Determine how many characters are left in word to be added. If none, set isWord flag to true and complete. Else, recursively call add with new child node and rest of word.
  var remainder = word.substring(1);
  if(!remainder) {
    child.isWord = true;
  }
  this.add(child, remainder);
};

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

// Fetch stored data in Chrome storage. Once completed, call buildTrie and pass retrieved data.
function trieData(){
	chrome.storage.sync.get("userdata", buildTrie);
}

// Create trie structure with fetched data from Chrome storage.
function buildTrie(data){
	var trie = new Trie();
	for (var x = 0; x < data.userdata.length; x++){
			var value = (data.userdata[x]);
			trie.add(trie.root,data.userdata[x].toString());
		}
// Debug code to list contents of trie.
	alert(trie.getWords());
}