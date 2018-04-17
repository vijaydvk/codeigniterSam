<!DOCTYPE html>
<html lang="en">
  <head>
  <?php
  include_once("header.php");
  ?>
    <!-- Bootstrap core CSS -->
    <script src="<?php echo base_url();?>/js/ticket_inprocess.js"></script>
	<script src="<?php echo base_url();?>/js/global_search.js"></script>
    <!-- Custom styles for this template -->
  </head>

  <body>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="#">Sum Com Help Desk</a>	
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="home">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="inprocess">In Process</a>
          </li>		  
          <li class="nav-item">
            <a class="nav-link " href="logout">Log out</a>
          </li>
		  <!--
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>-->
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" id="top_search_val" placeholder="Search" aria-label="Search" data-toggle="tooltip" data-placement="left" title="Enter the Keyword to Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="button" id="top_search_button">Search</button>
        </form>
      </div>
    </nav>

    <div class="container">

      <!--<div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>
      </div>-->
	  <div class="row">
		<div class="col-md-12">
			<div class="col-md-12" id="Admin_view">
			<table id="view_tickets_assigned" class="display responsive" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th>TicektID</th>
						<th>Store</th>
						<th>Submitted By</th>
						<th>Type</th>
						<th>Reason</th>
						<th>Refund Amount</th>
						<th>Submit Time</th>
						<th>Requested Date</th>
						<th>Status</th>
						<th>Assigned To</th>
					</tr>
				</thead>          
			</table> 
			</div>
		</div>
		<div class="col-md-12">
			<div id="view_assigned_ticketDetails" style="width:100%;z-index:2000;" class="modal col-md-12" data-easein="bounce" tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">
				<div class="modal-dialog col-md-12" style="max-width:1100px;">
					<div class="modal-content col-md-12">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="margin-left:100%">
								×
							</button>
							<!--<h4 class="modal-title">
								Modal Header
							</h4>-->
						</div>
						<div class="modal-body">
							<table id="edit_tickets_assigned" class="display responsive" cellspacing="0" width="100%">
								<thead>
									<tr>
										<th>TicektID</th>
										<th>Store</th>
										<th>Submitted By</th>
										<th>Type</th>
										<th>Reason</th>
										<th>Refund Amount</th>
										<th>Submit Time</th>
										<th>Requested Date</th>
										<th>Status</th>
										<th>Assigned To</th>
									</tr>
								</thead>          
							</table> 
							<div class="col-md-12">
								<div class="col-md-7" style="float:left;">
									<h3> Notes </h3>
									<div class="col-md-12" id="ticket_notes">
									<!--<table id="edit_ticket_notes" class="display responsive" cellspacing="0" style="white-space: pre-line;max-width:500px;">
										<thead>
											<tr>
												<th >Notes</th>													
												<th>Comment</th>
											</tr>
										</thead>          
									</table> -->
									</div>
								</div>
								<div class="col-md-5" style="float:left;">
									<div class="col-md-3">Notes</div>
									<div class="col-md-12" style="width:100%"><textarea style="width:100%;height:125px;" id="edit_ticket_note"></textarea></div>
									<div class="col-md-12" >
										<select class="col-md-12" style="margin-top:10px;" id="edit_ticket_status_category"></select>
									</div>
									<div class="col-md-6" style="margin-top:10px;float:left;"><button class="col-md-12" id="edit_ticket_submit" > Submit </button></div>
									<div class="col-md-6" style="margin-top:10px;float:left"><button class="col-md-12" id="edit_ticket_clear" > Clear </button></div>
									<input type="hidden" id="login_user_id" value="<?php echo $_SESSION['uid']; ?>" />
								</div>
							</div>
						</div>
						<!--<div class="modal-footer">
							<button class="btn btn-default" data-dismiss="modal" aria-hidden="true">
								Close
							</button>
							<button class="btn btn-primary">
								Save changes
							</button>
						</div>-->
					</div>
				</div>
			</div>
		</div>
		
	  </div>

    </div>
	<!-- /.container -->
  </body>
  <?php
  include_once("footer.php");
  ?>
</html>
