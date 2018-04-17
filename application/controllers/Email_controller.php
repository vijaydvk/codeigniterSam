<?php 
   class Email_controller extends CI_Controller { 
 
      function __construct() { 
         parent::__construct(); 
         $this->load->library('session'); 
         $this->load->helper('form'); 
      } 
		
      public function index() { 
	
         $this->load->helper('form'); 
         $this->load->view('email_form'); 
      } 
  
      public function send_mail() { 
	   $config = Array(
		  'protocol' => 'smtp',
		  'smtp_host' => 'ssl://smtp.googlemail.com',
		  'smtp_port' => 465,
		  'smtp_user' => 'vijayakumard01@gmail.com', // change it to yours
		  'smtp_pass' => '01vijay1988', // change it to yours
		  'mailtype' => 'html',
		  'charset' => 'iso-8859-1',
		  'wordwrap' => TRUE
		);

		$message = 'codeignitor working samples';
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
		$this->email->from('vijayakumard01@gmail.com'); // change it to yours
		$this->email->to('vkumar@suncommobile.com');// change it to yours
		$this->email->subject('Resume from JobsBuddy for your Job posting');
		$this->email->message($message);
      if($this->email->send())
     {
      echo 'Email sent.';
     }
     else
    {
     show_error($this->email->print_debugger());
    } 
      } 
   } 
?>