// Trie data structure code is adapted from Ben Vallon's Computer Science in Javascript #data-structures series
// His code can be found at https://github.com/benoitvallon/computer-science-in-javascript/blob/master/data-structures-in-javascript/trie.js

function Node(data){
	this.data = data;
	this.isWord = false;
	this.prefixes = 0;
	this.children = {};
}

function Trie(){
	this.root = new Node('');
}

Trie.prototype.add = function(node, word) {
  if(!node || !word) {
    return null;
  }
  node.prefixes++;
  var letter = word.charAt(0);
  var child = node.children[letter];
  if(!child) {
    child = new Node(letter);
    node.children[letter] = child;
  }
  var remainder = word.substring(1);
  if(!remainder) {
    child.isWord = true;
  }
  this.add(child, remainder);
};

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


function trieData(){
	chrome.storage.sync.get("userdata", buildTrie);
}

function buildTrie(data){
	var trie = new Trie();
	for (var x = 0; x < data.userdata.length; x++){
			var value = (data.userdata[x]);
			trie.add(trie.root,data.userdata[x].toString());
		}
	alert(trie.getWords());
}