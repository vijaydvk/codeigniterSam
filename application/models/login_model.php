<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* Author: Jorge Torres
 * Description: Login model class
 */
class Login_model extends CI_Model{
    function __construct(){
        parent::__construct();
		$this->load->database();
    }
    
    public function validate(){
        // grab user input
        $username = $this->security->xss_clean($this->input->post('username'));
        $password = $this->security->xss_clean($this->input->post('password'));
        
        // Prep the query
       /*  $this->db->where('name', $username);
        
        // Run the query
        $query = $this->db->get('users');
        // Let's check if there are any results
        if($query->num_rows == 1)
        {
            // If there is a user, then create session data
            $row = $query->row();
            $data = array(
                    'uid' => $row->uid,
                    'username' => $row->username,
                    );
            $this->session->set_userdata($data);
            return $query->num_rows;
        } */
        // If the previous process did not validate
        // then return false.

		$SQL = "select * from users where name = '$username'";
        $query = $this->db->query($SQL);
		if($query->num_rows() == 1)
        {
			$row = $query->row();
			$pass =  array('pass' => $row->pass);
			if ( $this->checkPassword($password,$pass['pass']) )
			{
            $data = array(
                    'name' => $row->name,
                    'uid' => $row->uid,
                    );
            $this->session->set_userdata($data);
			return $query->num_rows;
			}
			else
			{
				return 0;
			}
			
		}
		else
		{
		return 0;
		}
		//return $query->result(); 	
    }
	public function checkPassword( $password, $pass ) {
		if( $pass == crypt ( $password, $pass ) )
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}
?>