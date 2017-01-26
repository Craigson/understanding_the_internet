console.log(glossary);

console.log('herro');


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