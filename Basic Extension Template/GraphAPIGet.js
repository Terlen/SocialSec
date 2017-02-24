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
	cleanData.push(userData.email);
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
// Deletes unnecessary data from JSON to reduce size of object for storage.
// Quick and dirty code, can be improved later.
/*function dataCleanup(bigData) {
	var dataValues = [];
	for (var x = 0; x < bigData.education.length; x++){
		dataValues.push(bigData.education[x].school.name);
		dataValues.push(bigData.education[x].year.name);
		delete bigData.education[x].id;
		delete bigData.education[x].school.id;
		delete bigData.education[x].year.id;
	}
	delete bigData.id;
	for (var x = 0; x < bigData.taggable_friends.data.length; x++){
		dataValues.push(bigData.taggable_friends.data[x].name);
		delete bigData.taggable_friends.data[x].id;
		delete bigData.taggable_friends.data[x].picture;
	}
	delete bigData.taggable_friends.paging;
	for (var x = 0; x < bigData.work.length; x++){
		// delete operator has issues handling undefined values, safety is implemented to avoid typeError later
		var workSafety = bigData['work'][x]['location'];
		dataValues.push(bigData['work'][x]['employer']['name']);
		delete bigData['work'][x]['employer']['id'];
		delete bigData.work[x].id;
		delete bigData.work[x].description;
		delete bigData.work[x].end_date;
		delete bigData.work[x].start_date;
		// error prevention / handling
		if (workSafety != null){
			dataValues.push(bigData['work'][x]['position']['name']);
			dataValues.push(bigData['work'][x]['location']['name']);
			delete bigData['work'][x]['location']['id'];
			delete bigData.work[x].position.id;
		}
		dataValues.push(bigData.favorite_teams[x].name);
		dataValues.push(bigData.hometown.name);
		delete bigData.favorite_teams[x].id;
		delete bigData.hometown.id;
	}
	wordlistStore(bigData);
}*/


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
