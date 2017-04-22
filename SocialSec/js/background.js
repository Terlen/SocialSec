
var detectedPhrase;var trie;var listenerExists;chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){console.log(sender.tab?"from a content script:"+sender.tab.url:"from the extension");if(request.greeting=="loginsecure"){sendResponse({farewell:"goodbye"});getPicture();getData();chrome.browserAction.setIcon({path:"img/icon.png"});chrome.browserAction.setPopup({popup:"popup2.html"});}
else if(request.passvalue!=undefined){if(trie.contains(trie.root,request.passvalue)){detectedPhrase=trie.contains(trie.root,request.passvalue);notifications(request,sender,sendResponse);notificationPage();return true;}}
else if(request.phrase){sendResponse({phrase:detectedPhrase});}
else if(request.greeting=="secure"){if(!trie){trieData();}
chrome.browserAction.setIcon({path:"img/icon.png"});chrome.browserAction.setPopup({popup:"popup2.html"});sendResponse({complete:"done"});}
else if(request.command){trie.remove(request.command);chrome.storage.sync.get("phraseWhitelist",function(item){if(!item.phraseWhitelist){var whitelist=request.command;chrome.storage.sync.set({"phraseWhitelist":whitelist});}
else{var whitelist=[item.phraseWhitelist];whitelist.push(request.command);chrome.storage.sync.set({"phraseWhitelist":whitelist});}});sendResponse({feedback:"Good work"});}
else if(request.clear){trieData();}});function userSettings(){chrome.tabs.query({'active':true,'lastFocusedWindow':true},function(tabs){var url=tabs[0].url;chrome.storage.local.set({"currentURL":url})});var x=window.open("alert.html",'_blank');x.focus();}
function notifications(request,sender,sendResponse){var options={type:"basic",title:"SocialSec",message:"",iconUrl:"img/SS.png",};options.message="The detected password contains personal information!";chrome.notifications.create(options);sendResponse({complete:"done"});}
function notificationPage(){if(listenerExists!=1){chrome.notifications.onClicked.addListener(userSettings);listenerExists=1;}}
function Node(data){this.data=data;this.isWord=false;this.prefixes=0;this.children={};}
function Trie(){this.root=new Node('');}
Trie.prototype.add=function(node,word){if(!node||!word){return null;}
node.prefixes++;var letter=word.charAt(0);var child=node.children[letter];if(!child){if(letter.match(/^(a|b|c|e|g|i|l|o|s|t)$/)){switch(letter){case'a':child=new Node('a');node.children['a']=child;this.addRecursive(child,word);child=new Node('@');node.children['@']=child;this.addRecursive(child,word);child=new Node('4');node.children['4']=child;this.addRecursive(child,word);break;case'b':child=new Node('b');node.children['b']=child;this.addRecursive(child,word);child=new Node('6');node.children['6']=child;this.addRecursive(child,word);break;case'c':child=new Node('c');node.children['c']=child;this.addRecursive(child,word);child=new Node('(');node.children['(']=child;this.addRecursive(child,word);break;case'e':child=new Node('e');node.children['e']=child;this.addRecursive(child,word);child=new Node('3');node.children['3']=child;this.addRecursive(child,word);break;case'g':child=new Node('g');node.children['g']=child;this.addRecursive(child,word);child=new Node('9');node.children['9']=child;this.addRecursive(child,word);break;case'i':child=new Node('i');node.children['i']=child;this.addRecursive(child,word);child=new Node('1');node.children['1']=child;this.addRecursive(child,word);child=new Node('!');node.children['!']=child;this.addRecursive(child,word);break;case'l':child=new Node('l');node.children['l']=child;this.addRecursive(child,word);child=new Node('1');node.children['1']=child;this.addRecursive(child,word);child=new Node('!');node.children['!']=child;this.addRecursive(child,word);break;case'o':child=new Node('o');node.children['o']=child;this.addRecursive(child,word);child=new Node('0');node.children['0']=child;this.addRecursive(child,word);break;case's':child=new Node('s');node.children['s']=child;this.addRecursive(child,word);child=new Node('5');node.children['5']=child;this.addRecursive(child,word);break;case't':child=new Node('t');node.children['t']=child;this.addRecursive(child,word);child=new Node('+');node.children['+']=child;this.addRecursive(child,word);child=new Node('7');node.children['7']=child;this.addRecursive(child,word);break;default:alert('No data matched. You should not be seeing this.')}}
else{child=new Node(letter);node.children[letter]=child;}}
this.addRecursive(child,word);};Trie.prototype.addRecursive=function(child,word){var remainder=word.substring(1);if(!remainder){child.isWord=true;}
this.add(child,remainder);}
Trie.prototype.getWords=function(){var words=[];var word='';this._getWords(this.root,words,words,word);return words;};Trie.prototype._getWords=function(node,words,word){for(var child in node.children){if(node.children.hasOwnProperty(child)){word+=child;if(node.children[child].isWord){words.push(word);}
this._getWords(node.children[child],words,word);word=word.substring(0,word.length-1);}}};var fullWord="";Trie.prototype.contains=function(node,word){if(!node||!word){return false;}
var letter=word.charAt(0);var child=node.children[letter];if(child){var remainder=word.substring(1);if(child.isWord){fullWord+=child.data.toString();var finalWord=fullWord;fullWord="";return finalWord;}
else{fullWord+=child.data.toString();return this.contains(child,remainder);}}
else{if(!remainder){fullWord="";return this.contains(this.root,word.substring(1));}
else if(remainder.substring(1).length>0){return this.contains(this.root,remainder.substring(1));}
else{return false;}}};Trie.prototype.remove=function(word){if(!this.root){return;}
if(this.contains(this.root,word)){this._removeNode(this.root,word);}};Trie.prototype._removeNode=function(node,word){if(!node||!word){return;}
node.prefixes--;var letter=word.charAt(0);var child=node.children[letter];if(child){if(letter.match(/^(a|b|c|e|g|i|l|o|s|t)$/)){switch(letter){case'a':letter='a';this.recursiveRemove(letter,word,node,child);letter='@';this.recursiveRemove(letter,word,node,child);letter='4';this.recursiveRemove(letter,word,node,child);break;case'c':letter='c';this.recursiveRemove(letter,word,node,child);letter='(';this.recursiveRemove(letter,word,node,child);break;case'e':letter='e';this.recursiveRemove(letter,word,node,child);letter='3';this.recursiveRemove(letter,word,node,child);break;case'g':letter='g';this.recursiveRemove(letter,word,node,child);letter='9';this.recursiveRemove(letter,word,node,child);break;case'i':letter='i';this.recursiveRemove(letter,word,node,child);letter='1';this.recursiveRemove(letter,word,node,child);letter='!';this.recursiveRemove(letter,word,node,child);break;case'l':letter='l';this.recursiveRemove(letter,word,node,child);letter='1';this.recursiveRemove(letter,word,node,child);letter='!';this.recursiveRemove(letter,word,node,child);break;case'o':letter='o';this.recursiveRemove(letter,word,node,child);letter='0';this.recursiveRemove(letter,word,node,child);break;case's':letter='s';this.recursiveRemove(letter,word,node,child);letter='5';this.recursiveRemove(letter,word,node,child);break;case't':letter='t';this.recursiveRemove(letter,word,node,child);letter='+';this.recursiveRemove(letter,word,node,child);letter='7';this.recursiveRemove(letter,word,node,child);break;}}
else{var remainder=word.substring(1);if(remainder){if(child.prefixes===1){delete node.children[letter];}
else{this._removeNode(child,remainder);}}
else{if(child.prefixes===0){delete node.children[letter];}
else{child.isWord=false;}}}}};Trie.prototype.recursiveRemove=function(letter,word,node,child){var remainder=word.substring(1);if(remainder){if(child.prefixes===1){delete node.children[letter];}
else{this._removeNode(child,remainder);}}
else{if(child.prefixes===0){delete node.children[letter];}
else{child.isWord=false;}}}
Trie.prototype.printByLevel=function(){if(!this.root){return console.log('No root node found');}
var newline=new Node('\n');var queue=[this.root,newline];var string='';while(queue.length){var node=queue.shift();string+=node.data.toString()+(node.data!=='\n'?' ':'');if(node===newline&&queue.length){queue.push(newline);}
for(var child in node.children){if(node.children.hasOwnProperty(child)){queue.push(node.children[child]);}}}
console.log(string.trim());};function trieData(){chrome.storage.sync.get("phraseWhitelist",function(data){if(!data.phraseWhitelist){chrome.storage.sync.get("userdata",function(data){var array=data.userdata;buildTrie(array);});}
else{chrome.storage.sync.get("userdata",function(item){var trieData=item.userdata.filter(function(val){return data.phraseWhitelist.indexOf(val)==-1;});buildTrie(trieData);});}});}
function buildTrie(data){trie=new Trie();for(var x=0;x<data.length;x++){var value=(data[x]);trie.add(trie.root,data[x].toString());}}
function httpGetAsync(theUrl,callback,type)
{var xmlHttp=new XMLHttpRequest();xmlHttp.onreadystatechange=function(){if(xmlHttp.readyState==4&&xmlHttp.status==200)
callback(xmlHttp.responseText,type);}
xmlHttp.open("GET",theUrl,true);xmlHttp.send(null);}
function getData(){chrome.storage.sync.get("accessToken",function(item){httpGetAsync("https://graph.facebook.com/me?fields=id,cover,first_name,last_name,age_range,gender,email&access_token="+item.accessToken,jsonParse,"data");});};function getPicture(){chrome.storage.sync.get("accessToken",function(item){httpGetAsync("https://graph.facebook.com/me?fields=picture.height(100).width(100)&access_token="+item.accessToken,jsonParse,"img");});}
function jsonParse(json,type){var userData=JSON.parse(json);if(type=="img"){wordlistStore(userData,"img")}
else{dataStrip(userData);}}
function dataStrip(userData){var cleanData=[];cleanData.push(userData.first_name.toLowerCase());cleanData.push(userData.last_name.toLowerCase());if(userData.email){cleanData.push(userData.email);}
findDates(cleanData,userData.age_range.max,userData.age_range.min);wordlistStore(cleanData,"data");}
function findDates(array,max,min){var date=new Date();var currentYear=date.getFullYear();for(x=0;x<min+1;x++){array.push(currentYear-x);}
if(typeof max!='undefined'){for(x=min+1;x<max+2;x++){array.push(currentYear-x);}}
else{for(x=min;x<80;x++){array.push(currentYear-x);}}}
function wordlistStore(jsonobject,type){if(type=="data"){chrome.storage.sync.set({"userdata":jsonobject},function(){if(chrome.runtime.error){alert("Runtime Error");}});trieData();}
else if(type=="img"){chrome.storage.sync.set({"userpic":jsonobject},function(){if(chrome.runtime.error){alert("Runtime Error");}});}}