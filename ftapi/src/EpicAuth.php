<?php

class Fortnite_EpicAuth
{
	private $url;
	
	public function __construct($client)
	{
		$this->Client = $client;
	}

	/*
	 * Epic Auth - create login
	 * Verify that the user is the owner of the account.
	 */
	public function createLogin($returnurl = '')
	{
		if(!empty($returnurl) && filter_var($returnurl, FILTER_VALIDATE_URL))
		{
			$return = json_decode($this->Client->httpCall('epicauth/createlogin', ['epicauth' => urlencode($returnurl)]));

			if(isset($return->error))
			{
				return $return->errorMessage;
			}
			else
			{
				$this->url = $return->url;

				return $this->url;
			}
		}

		return 'Invalid return URL.';
	}

	/*
	 * Epic Auth - get account details
	 * Get the account id, username and email.
	 */
	public function validate($hash = '')
	{
		if(!empty($hash))
		{
			$return = json_decode($this->Client->httpCall('epicauth/validate', ['epicauth' => urlencode($hash)]));

			if(isset($return->error))
			{
				return $return->errorMessage;
			}
			else
			{
				return $return;
			}
		}

		return 'Invalid hash.';
	}

	public function getUrl()
	{
		return $this->url;
	}
}

?>