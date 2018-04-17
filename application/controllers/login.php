<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class login extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	/*public function index()
	{
		$this->load->view('welcome_message');
	}*/
   public function index($msg = NULL){
        // Load our view to be displayed
        // to the user
        $data['msg'] = $msg;
        $this->load->view('login_page', $data);
    }
	
	public function process(){
        // Load the model
         $this->load->model('login_model');
        // Validate the user can login
        $result = $this->login_model->validate();
        // Now we verify the result
       /*  if(! $result){
            // If user did not validate, then show them login page again
            $msg = '<font color=red>Invalid username and/or password.</font><br />';
            echo $result;
        }else{
            // If user did validate, 
            // Send them to members area
             /* $this->home(); */
		/*	 echo "HI";
        }   */  
       //echo json_encode($result); 	
		if($result == 1)
		{
			
			$this->load->view('home_page');
		}
		else
		{
			$msg = '<font color=black>Invalid username or password.</font><br />';
            $this->index($msg);
		}
    }
	public function home()
	{
		$this->load->view('home_page');
	}

	public function inprocess()
	{
		$this->load->view('inprocess_page');
	}
	
	public function getOpenTickets(){
        // Load the model
         $this->load->model('open_tickets');
        // Validate the user can login
        $result = $this->open_tickets->getOpenTickets();
        // Now we verify the result
 		$data = array();
        foreach ($result as $temp) {
	           
	            $data[] = $temp;
	        }
         
        echo json_encode($data); 

    }	
	
	public function getAssigneeList(){
        // Load the model
         $this->load->model('open_tickets');
        // Validate the user can login
        $result = $this->open_tickets->getAssigneeList();
        // Now we verify the result
 		$data = array();
        foreach ($result as $temp) {
	           
	            $data[] = $temp;
	        }
         
        echo json_encode($data); 

    }	
	
	public function logout(){
        $this->session->sess_destroy();
       $this->index('');
    }
}
