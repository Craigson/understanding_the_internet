// console.log(glossary);

console.log('herro');

/* TODO:
- search suggestions
- a script that links every topic to a mention in the message body ( except in the case of 'self')
- a popup that remembers your original place so you can click 'back'

*/

var loc = $('#http');

$('body').click(function() {
    $('html, body').animate({
        scrollTop: $("#http").offset().top - 20
    }, 1000);
});

console.log(loc);

function createEntry(topic, def, keywords, description, use_case ){

	$('#glossary-container').append(`
		      <div class="row" class="entry">
		        
		            <div class="col-md-2">
		              <button id="${dev}_pi_status" type="button" class="btn btn-danger">Disconnected</button>
		            </div>
		            <div class="col-md-2">
		             <div id = "${dev}_ip" class = "dynamic">${ip} </div>
		            </div>
		            <div class="col-md-2">
		             <div id = "${dev}_device" class = "dynamic">${dev}</div>
		            </div>
		            <div class="col-md-6">
		              <div id="${dev}_pi_commit" class = "dynamic">unknown</div>
		            </div>
		        </div> <!-- end of row -->
	`);

}