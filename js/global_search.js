$(document).ready(function() {
	var searchResult_JSON = [];
	var resultDisplay = "";
	$('#top_search_button').on('click',function()
	{
		var searchVal = $('#top_search_val').val();
		//resultDisplay = "";
		//$.when(getGlobeSearchResult()).done(function(){		
			/* $('#popup_search_result').bPopup({
				 appendTo: 'body',
				zIndex: 2002,
				
			});	
			for(var index=0; index < searchResult_JSON.length; index++)
			{
				resultDisplay = resultDisplay + searchResult_JSON[index].ticket_id + "<br>";
			}
			$('#search_result_content').html(resultDisplay); */
		//});
		//window.href = "index.php?action=globalsearch" ;
		window.location="index.php?action=globalsearch&searchVal="+searchVal ;
		//global_search_table
	});	
});