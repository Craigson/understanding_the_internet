/* TODO:
- search suggestions
- a popup that remembers your original place so you can click 'back'
- Expand acronym on hover
*/

// Keep track of the positions ( for scrolling ) of each of the topics
var topicPositions = mapScrollPositions();

// link any mention of topic inside a description to the actual topic
createContentLinks();

var scrollPosition; // global variable for storing the scroll position when a link is clicked


// add event lister for each instance of a referential term, use the event target to scroll.
$('.clickable_link').click(function(event){
	console.log('i clicked');
	console.log($(event.target).text());

	// store the current scroll position for going back to
	scrollPosition = $(document).scrollTop();

	console.log(scrollPosition);

	$('html, body').animate({
        scrollTop: topicPositions[$(event.target).text()]
    }, 1000);
})


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

				// console.log(glossaryContainer.children[j].children[3])

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

		// get the topic name
		var topic = glossaryContainer.children[i].children[1].innerHTML;
		var tagId = glossaryContainer.children[i].id;
		
		// get the scroll position
		var position = $("#" + tagId).offset().top-20;

		obj[topic] = position;

	}

	return obj;
}

