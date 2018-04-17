<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* Author: Jorge Torres
 * Description: Login model class
 */
class Open_tickets extends CI_Model{
    function __construct(){
        parent::__construct();
		$this->load->database();
    }
    
public function getOpenTickets()
{	
	try
	{		
		$sql =	"select
				T.refund_id as 'TicektID',
				S.store_name as 'Store',
				U.name as 'Submitted By',
				T.cc_type as 'Type',
				T.cc_refundreason as 'Reason',
				T.cc_dollaramounttorefund as 'Refund Amount',
				date_format(from_unixtime(T.submit_time),'%m/%d/%y %h:%m %p') as 'Submit Time',
				date_format(from_unixtime(T.refund_rq_date),'%m/%d/%y %h:%m %p') as 'Requested Date',
				T.t_status as 'Status'
				from sun_cc_refund T
				LEFT JOIN users U ON T.refund_uid = U.uid
				LEFT JOIN sun_stores S ON T.store_id = S.store_id
				where T.t_status IN ('Open')
				ORDER BY T.submit_time";
			$query = $this->db->query($sql);
			return $query->result();

	}
	catch (PDOException $e) {
		trigger_error( "getOpenTickets: Couldn't execute query" . $e->getMessage());
		$conn = null;
	}
}
public function getAssigneeList()
{	
	try
	{		
		$sql =	"select U.`name` as 'TechName', A.uid from sun_settings_user_auth A
				LEFT JOIN users U on A.uid = U.uid
				where A.auth_type = 'Refund Tech' and U.`status` = 1";
			$query = $this->db->query($sql);
			return $query->result();

	}
	catch (PDOException $e) {
		trigger_error( "getOpenTickets: Couldn't execute query" . $e->getMessage());
		$conn = null;
	}
}
}
?>