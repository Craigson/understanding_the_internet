/* TODO:
- search suggestions
-
- Expand acronym on hover
- Data visualization showing connections
- create a footer that shows the path you've taken
- support mixed cases for dynamic linking || got some regex work to do RE searching within plurals etc.
- Create a 'learning tree' by number of mentions (eg. the most pertinent topic is presented first.
*/
console.log('loading');
// hide the back button and search results bar by default
$('#back_button').hide();
$('#search_results').hide();

// Keep track of the positions ( for scrolling ) of each of the topics
var topicPositions = mapScrollPositions();

// create a js object that will allow for search
var searchableObject = createSearchableObject();

var matchedTerms = [];
showSearchBar = false;

// link any mention of topic inside a description to the actual topic
createContentLinks();

// account for any time the window is resized, to recalculate the position
// for scrolling
$(window).resize(function(){
	console.log('resizing window');
	topicPositions = mapScrollPositions();
});

$('#searchbar').keyup(handleChange);

// function handleChange(e){
// 	console.log( $('#searchbar').val() );
// }

function test(){
	console.log('test');
}
function handleChange(e){

	// show the search bar as the user types
	if( showSearchBar == false ) {
		showSearchBar = true;
		$("#search_results").show();
		console.log('showing searchbar');
	}

	console.log( $("#searchbar").val() );

	var searchTerm = ($("#searchbar").val());

	// loop through the searchable object
	for (var i = 0; i < searchableObject.length; i++){
		if ( searchableObject[i].indexOf(searchTerm) != -1 )
		{
			console.log("found a match");
			console.log(searchableObject[i]);

			matchedTerms.push(searchableObject[i])
		}
	}

	if ($("#searchbar").val().length == 0){
		showSearchBar = false;
		$("#search_results").hide();
	}

	var resultsContainer = document.getElementById('search_results');

	console.log(showSearchBar);

	var htmlString = '';
	for (var j = 0; j < matchedTerms.length; j++){
		// $('#matches').append(matchedTerms[j]);
		// $('#matches').append(' | ');
		htmlString = htmlString + matchedTerms[i];
		htmlString = htmlString + ' | ';


	}
	console.log(matchedTerms);
	// resultsContainer.children[0].innerHTML = htmlString;

	// console.log($('#search_results').children[0].innerHTML);

	// console.log(htmlString);

}

function updateSearchResults(){

}

var scrollPosition; // global variable for storing the scroll position when a link is clicked


// add event lister for each instance of a referential term, use the event target to scroll.
$('.clickable_link').click(function(event){
	console.log('i clicked');
	console.log($(event.target).text());

	// store the current scroll position for going back to
	scrollPosition = $(document).scrollTop();

	console.log(scrollPosition);

	// the back button appears when you follow a dynamic link
	$('#back_button').show();

	$('html, body').animate({
        scrollTop: topicPositions[$(event.target).text()]
    }, 1000);
})

// clicking on the back button takes you back to the position where you clicked
// the dynamic link
$('#back_button').click(function(event){
	$('html, body').animate({
        scrollTop: scrollPosition
    }, 1000);
    $('#back_button').hide();
});

function createContentLinks(){

	var glossaryContainer = document.getElementById('glossary-container');
// loop through each of the topics to link terms in the paragraphs
	for (var i = 0; i < glossaryContainer.children.length; i++){

		var tagId = glossaryContainer.children[i].id;
		// console.log('tag id: ' + tagId);

		var referenceTopic = glossaryContainer.children[i].children[1].innerHTML;
		// console.log("referenceTopic: " + referenceTopic);

		console.log('linking content for: ' + referenceTopic);

		var td;

		//loop through all the other topics and check the text for references
		for ( var j = 0; j < glossaryContainer.children.length; j++){

			// dont check the topics own paragraph
			if (i != j){

				// search through the html and replace the html for the reference topic
				// with a clickable link to the reference topic

				var topicLink = referenceTopic + "_link";
				var div = "<span class=\"clickable_link\">" + referenceTopic + "</span>";

				// replace each instance of the reference top with a clickable link using a regular expression (\b is for word boundary);
				var regex = new RegExp("\\b"+referenceTopic+"\\b", "gim");
				glossaryContainer.children[j].children[3].innerHTML = glossaryContainer.children[j].children[3].innerHTML.replace(regex, div);

				// console.log('reference topic: ' + referenceTopic);
				// console.log('section: ' + glossaryContainer.children[j].children[1].innerHTML);
				// console.log(glossaryContainer.children[j].children[3].innerHTML);
				// console.log('\n-----------------------\n');
				// handle the case where there used as a plural

				// var pluralTopic = referenceTopic + "s";
				// var divPlural = "<span class=\"clickable_link\">" + pluralTopic + "s</span>";
				// var regexPlural = new RegExp("\\b" + pluralTopic + "\\b", "gim");
				// glossaryContainer.children[j].children[3].innerHTML = glossaryContainer.children[j].children[3].innerHTML.replace(regexPlural, divPlural);
				// // console.log(glossaryContainer.children[j].children[3])

	   		}

	   	}
	}
}

function mapScrollPositions(){

	console.log('mapping topic positions');

	var obj = {};

	var glossaryContainer = document.getElementById('glossary-container');

	// create an assosciative array that maps the topic to its scroll position
	for (var i = 0; i < glossaryContainer.children.length; i++){
		console.log(i);
		// get the topic name
		var topic = glossaryContainer.children[i].children[1].innerHTML;
		var tagId = glossaryContainer.children[i].id;

		// get the scroll position
		var position = $("#" + tagId).offset().top-20;

		console.log(topic, position);

		obj[topic] = position;

	}

	return obj;
}


function createSearchableObject(){

	var obj = [];

	var glossaryContainer = document.getElementById('glossary-container');

	for (var i = 0; i < glossaryContainer.children.length; i++){

		var topic = glossaryContainer.children[i].children[1].innerHTML;
		var lowerTopic = topic.toLowerCase();
		obj.push(lowerTopic);
	}

	console.log(obj);
	return obj;

}
