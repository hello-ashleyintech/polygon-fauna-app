pragma solidity ^0.5.0;

contract WhitelistForm {
    // all are going to be set to uuid value in smart contract, so declare as same type
	struct whitelister {
		string uuid;
		string f_name;
		string l_name;
		string wallet_address;
	}

	whitelister[] whitelisters; // array of all whitelisters

	function _createWhitelister (string memory _uuid) public {
		whitelisters.push(whitelister({
			uuid: _uuid,
			f_name: _uuid,
			l_name: _uuid,
			wallet_address: _uuid
		})) -1;
	}
}