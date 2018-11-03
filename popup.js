document.addEventListener('DOMContentLoaded', documentEvents , false);

function myAction(input) {
    var userInput = input.value;
	const url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
	var data = JSON.stringify(
		{	"documents": [
	            {
	                "language": "en",
	                "id": "1",
	                "text": userInput
	            }
	        ]
		});
	getResponse(url,data);

    var updateTextTo = input.value;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id,{
	  	file: "content_script.js"
	  }, function(){
	  		chrome.tabs.sendMessage(tabs[0].id, {
	  			updateTextTo: userInput
	  		});
	  });
	});
}

function getResponse(url,data){
	return fetch(url, {
	  method: 'POST',
	  body: data,
	  headers:{
	    'Content-Type': 'application/json',
	    'Accept': 'application/json',
	    'Ocp-Apim-Subscription-Key': 'e1e46a3c75914066a6876185eddf96f3'
	  }
	}).then(res => res.json())
		.then(
			response =>{
				document.getElementById('container').innerHTML ='';
				console.log('Success:', response['documents'][0]['score']);
				document.getElementById('container').innerHTML += determineOutput(parseFloat(response['documents'][0]['score']));
			}) 
		.catch(error => console.error('Error:', error));
}

function determineOutput(sentimentLevel){
	var response = "happy";
	console.log("Within determine, senti Lvel:", sentimentLevel);
	if(sentimentLevel < 0.5){
		response = "sad";
		return response;
	}
	console.log("Response", response);
	return response;
}

function documentEvents() {
  document.getElementById('get_btn').addEventListener('click', 
    function() { 
    	myAction(document.getElementById('name_textbox'));
  });
}