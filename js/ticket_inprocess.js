$(document).ready(function() {

	var ticketsAssigned_JSON = [];
	getTicketStatusOptions();
	$.when(getAssignedTickets()).done(function(){		
		$.when(dispAssignedTickets(ticketsAssigned_JSON)).done(function(){
			checkSearchOrNot();
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
	
	function getTicketStatusOptions()
	{
		return $.ajax({
			url:'controller/K18_Lookup_ctrl.php?action=getLookup4Codeid&codeid=cc_refund_status',
			type:'POST',
			success:function(data){
				ticket_status_categoryJSON = $.parseJSON(data);     
        },		
		error: function() {
			console.log("ticket_inprocess - getAssigneeList - Error - line 21"); 
			alert('something bad happened'); }
		}) ;
	}

	function getAssignedTickets()
	{
		return $.ajax({
			url:'controller/index1.php?action=getAssignedTickets',
			type:'POST',
			success:function(data){
				ticketsAssigned_JSON = $.parseJSON(data);  
				console.log(JSON.stringify(ticketsAssigned_JSON).length);				
        },		
		error: function() {
			console.log("ticket_inprocess - getAssignedTickets - Error - line 34"); 
			alert('something bad happened'); }
		}) ;
	}

	function dispAssignedTickets(dataJSON)
	{
		$('#view_tickets_assigned').dataTable( {
			
			"aaSorting":[],
			"aaData": dataJSON,
			"aoColumns": [
				{ "mDataProp": "TicektID" },
				{ "mDataProp": "Store" },
				{ "mDataProp": "Submitted By" },
				{ "mDataProp": "Type" },
				{ "mDataProp": "Reason" },
				{ 
					"mDataProp": "Refund Amount" ,
					"render": $.fn.dataTable.render.number( ',', '.', 2, '$' )
				},
				{ "mDataProp": "Submit Time" },
				{ "mDataProp": "Requested Date" },
				{ "mDataProp": "Status" },
				{ "mDataProp": "Tech Name" },
				/* { 
				 "mDataProp": function ( data, type, full, meta) {
					return '<a href="#" class="editable" data-type="text" data-pk="1" data-name="username" data-url="post.php" data-original-title="Enter username" id="username">Comment</a>';
				 } 
				},*/
			],
			 /*"aoColumnDefs": [ {
								"aTargets": [0],
								"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {   
								$(nTd).attr('data-label', 'TicketID')       
								}
								} 
							],*/
		  "initComplete": function () {
	            var api = this.api();
				  $clearButton = $clearButton = $('<input type = "button" data-toggle="tooltip" data-placement="top" title="Click to clear the search and refresh the table" value="Clear" />')
                       .click(function() {
 						 api.column(0).search('').draw();
                       }) ;
					$('.dataTables_filter').append($clearButton);
	           		api.$('td').click( function () {
					console.log($(this));
					if($(this)[0].cellIndex !== 0)
					{
						var view_ticketsToDT = [];
						var index = $(this).closest('tr')[0].rowIndex-1;
						//console.log(index);
		                $('#view_assigned_ticketDetails').modal('toggle');
						var table = $('#edit_tickets_assigned').DataTable();
						table.destroy();
						view_ticketsToDT.push(dataJSON[index]);
						displayEditTickets(view_ticketsToDT);						;
							$.when(getTicketComment(dataJSON[index].TicektID)).done(function(){	
								selectedTciketId = dataJSON[index].TicektID;
								//console.log(dataJSON[index].TicektID);
								dispTicketNotes();
							});
						dispTicketStatusCategory();
					}
	            } );
        	},
			dom: 'Bflrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                title: 'CC Refund Assigned Tickets',
				exportOptions: {
                    columns: [  0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
                },
				"text":'<i class="fa fa-file-excel-o" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Click to export info in Excel"></i>',	
			},
            {
                extend: 'pdfHtml5',
                title: 'CC Refund Assigned Tickets',
				exportOptions: {
                    columns: [  0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
				},
				"text":'<i class="fa fa-file-pdf-o" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Click to export info in PDF"></i>',
			},
			]
		});
	}	
	
	function displayEditTickets(dataJSON)
	{	
		$('#edit_tickets_assigned').dataTable( {
				responsive:true,
				"bSort" : false,
				"aaData": dataJSON,
				"aoColumns": [
					{ "mDataProp": "TicektID" },
					{ "mDataProp": "Store" },
					{ "mDataProp": "Submitted By" },
					{ "mDataProp": "Type" },
					{ "mDataProp": "Reason" },
					{ 
						"mDataProp": "Refund Amount" ,
						"render": $.fn.dataTable.render.number( ',', '.', 2, '$' )
					},
					{ "mDataProp": "Submit Time" },
					{ "mDataProp": "Requested Date" },
					{ "mDataProp": "Status" },
					{ "mDataProp": "Tech Name" },
					/* { 
					 "mDataProp": function ( data, type, full, meta) {
						return '<a href="#" class="editable" data-type="text" data-pk="1" data-name="username" data-url="post.php" data-original-title="Enter username" id="username">Comment</a>';
					 } 
					},*/
				],
				
				dom: 't',
		});
	}
	
	function getTicketComment(ticket_id)
	{
		return $.ajax({
			url:'controller/index1.php?action=getTicketComment&refund_id='+ticket_id,
			type:'POST',
			success:function(data){
				ticketComment_JSON = $.parseJSON(data);     
        },		
		error: function() {
			console.log("ticket_inprocess - getTicketComment - Error - line 217"); 
			alert('something bad happened'); }
		}) ;
	}
	
	function dispTicketNotes()
	{

		$('#ticket_notes').html('');
		var ticketCommentToDiv="";
		for (var i = 0; i < ticketComment_JSON.length; i++) {
			ticketCommentToDiv = ticketCommentToDiv + '<div class="row" style="padding:0px;word-wrap: break-word;  "><div class="col-md-12" style="margin-top:20px;padding:0px;"><div class="col-md-4" style="float:left;padding-left:0px;"><h5>Name: ' + ticketComment_JSON[i].name + '</h5></div><div class="col-md-8" style="float:left;">Date: ' + ticketComment_JSON[i].time +'</div></div><br>';
			ticketCommentToDiv = ticketCommentToDiv + '<div class="col-md-12" style="float:left;overflow:hidden;padding:0px;">Note: '+ ticketComment_JSON[i].notes +'</div></div>';
		}
		$('#ticket_notes').html(ticketCommentToDiv);
	}
	
	function dispTicketStatusCategory()
	{
		$('#edit_ticket_status_category').html('');
		//console.log(ticket_status_categoryJSON.length);
		$("<option></option>", {value: "" , text: "-- Select One --"}).appendTo('#edit_ticket_status_category');
		for(var index=0; index < ticket_status_categoryJSON.length ; index ++)
		{
			if(ticket_status_categoryJSON[index].codevalue !== "Open")
			{
				$("<option></option>", {value: ticket_status_categoryJSON[index].codevalue , text: ticket_status_categoryJSON[index].codevalue}).appendTo('#edit_ticket_status_category');
			}
		}
		//$('#edit_ticket_status_category').val('Assigned To Tech');
	}
	
	$(document).on('click','#edit_ticket_clear',function(){
		clearEditTicketForm();
	});
	
	$(document).on('click','#edit_ticket_submit',function(){
		/* console.log(selectedTciketId);
		console.log($('#edit_ticket_note').val());
		console.log($('#edit_ticket_status_category').val());
		console.log($('#login_user_id').val()); */
		if(validateInProcess())
		{
			var ticket_id = selectedTciketId
			var uid = $('#login_user_id').val();	
			var note = $('#edit_ticket_note').val();
			var t_status = $('#edit_ticket_status_category').val();
			 request = $.ajax({
						type: 'POST',
						url: "index.php",
						data: {"action" : "saveTicketAssignee","refund_id": ticket_id , "uid": uid ,
							"tech_note":note , "t_status":t_status , "mode" : "comment" },
						});
					request.done(function (response){
						var js = $.parseJSON(response);
						if(js.success)
						{
							clearEditTicketForm();
							
							$.notify({
								message: js.msg
							},{
								type: 'success'
							});
							refreshAfterEditJSONDataTables(ticket_id);
							
						}
						else
						{
							$.notify({
								message: js.errors
							},{
								type: 'danger'
							});
						} 

					});
					request.fail(function ( jqXHR, textStatus, errorThrown)
					{
						$.notify({
								message: errorThrown
							},{
								type: 'danger'
							});
					}); 
		}
		
	});
	
	function clearEditTicketForm()
	{
		$('#edit_ticket_note').val('');
		$('#edit_ticket_status_category').val('');
	}
	
	function refreshAfterEditJSONDataTables(ticket_ID)
	{
		$.when(getTicketComment(ticket_ID)).done(function(){	
			//selectedTciketId = dataJSON[index].TicektID;
			//console.log(dataJSON[index].TicektID);
			dispTicketNotes();
		});
		refreshJSONDataTables();
		$.when(getUniqueTicketDetails(ticket_ID)).done(function(){	
			var table = $('#edit_tickets_assigned').DataTable();
			table.destroy();
			displayEditTickets(uniqueTicket_JSON);
		});
		
	}
	function getUniqueTicketDetails(ticket_ID)
	{
		return $.ajax({
			url:'controller/index1.php?action=getUniqueTicketDetails&refund_id='+ticket_ID,
			type:'POST',
			success:function(data){
				uniqueTicket_JSON = $.parseJSON(data);     
        },		
		error: function() {
			console.log("ticket_inprocess - getUniqueTicketDetails - Error - line 355"); 
			alert('something bad happened'); }
		}) ;
	}
	
	function validateInProcess()
	{
		if($('#edit_ticket_note').val() == "")
		{
			$.notify({
				message: 'Note must be provided'
			},{
				type: 'danger'
			});
			return false;
		}
		else if($('#edit_ticket_status_category').val() == "")
		{
			$.notify({
				message: 'Status must be provided'
			},{
				type: 'danger'
			});
			return false;
		}
		return true;
	}
	
	function refreshJSONDataTables()
	{
		var table = $('#view_tickets_assigned').DataTable();
		table.destroy();
			$.when(getAssignedTickets()).done(function(){		
			dispAssignedTickets(ticketsAssigned_JSON);
			/* $.when(getOpenTickets()).done(function(){				
				$.when(getAssigneeList()).done(function(){
				dispOpenTickets(ticketsOpen_JSON);	
				});	 */			
			});	
	}
	
	function checkSearchOrNot()
	{	
		var browserurl= window.location.href;
		//console.log(url);
		//url = url.toString();
		//console.log(url.length);
		var length = browserurl.indexOf("ticketID=");
		//console.log(length+9);
		//console.log(browserurl.length);
		var diff = browserurl.length - (length+9)
		var tID = browserurl.substr(browserurl.length - diff);
		//console.log(tID);
		/* if((browserurl.length == 72 ) 
			&& (length > -1 ))
		{ */
		if(length > -1 )
		{
			//window.location.href = "index.php?action=homePage" ;
			window.history.pushState('inprocess', 'Title', 'index.php?action=inprocess');
			filterSearch(tID);
		} 
		
		//alert(url);
	}
	function filterSearch(t_id)
	{
		var table = $('#view_tickets_assigned').DataTable();
		table.column(0).search(t_id).draw();
	}
});