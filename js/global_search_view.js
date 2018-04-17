$(document).ready(function() {
	var searchResult_JSON = [];
	$.when(getGlobeSearchResult()).done(function(){	
	
		dispSearchResult(searchResult_JSON);
	
	});
	
	function getGlobeSearchResult()
	{
		var searchVal = $('#top_search_val').val();
		return $.ajax({
			url:'controller/index1.php?action=getGlobeSearchResult&searchVal='+searchVal,
			type:'POST',
			success:function(data){
				searchResult_JSON = $.parseJSON(data);     
		},		
		error: function() {
			console.log("global search - getGlobeSearchResult - Error - line 18"); 
			alert('something bad happened'); }
		}) ;
	}
	
	function dispSearchResult(dataJSON)
	{
		var searchVal = $('#top_search_val').val();
			$('#global_search_table').dataTable( {
			"aaSorting":[],
			"aaData": dataJSON,
			"aoColumns": [
				{ "mDataProp": "TicektID" },
				{ "mDataProp": "Store" },
				{ "mDataProp": "Submitted By" },
				{ "mDataProp": "Type" },
				{ "mDataProp": "Reason" },
				{ 
					"mDataProp": "Refund Amount",
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
		 "initComplete": function () {
				highlight(searchVal);
	            var api = this.api();
	            api.$('tr').click( function () {
					
					var ticketId = $(this)[0].childNodes[0].innerHTML;
					console.log($(this)[0].childNodes[0].innerHTML);
					if ($(this)[0].childNodes[8].innerHTML == "Open")
					{
						window.location="index.php?action=homePage&ticketID="+ticketId ;
					}
					else
					{
						window.location="index.php?action=inprocess&ticketID="+ticketId ;
					}
					/* var view_ticketsToDT = [];
					var index = $(this)[0].rowIndex-1;
					console.log(index);
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
					dispTicketStatusCategory(); */
	            } );
        	},
				"drawCallback": function( oSettings ) {
							highlight(searchVal);				
			},
			dom: 'Bflrtip',
			buttons: [
            {
                extend: 'excelHtml5',
                title: 'CC Refund Open/Assigned Tickets',
				exportOptions: {
                    columns: [  0, 1, 2, 3, 4, 5, 6 ]
                },
				"text":'<i class="fa fa-file-excel-o" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Click to export info in Excel"></i>',	
			},
            {
                extend: 'pdfHtml5',
                title: 'CC Refund Open/Assigned Tickets',
				exportOptions: {
                    columns: [  0, 1, 2, 3, 4, 5, 6 ]
				},
				"text":'<i class="fa fa-file-pdf-o" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Click to export info in PDF"></i>',
			},
			]
		});
	}
	
	function highlight(value)
	{
		var table = $('#global_search_table').DataTable();	 
		table.on( 'draw', function () {
			var body = $( table.table().body() ); 
			//console.log("Call Back");
			body.unhighlight();
			body.highlight( value );  
		} );
	}
});