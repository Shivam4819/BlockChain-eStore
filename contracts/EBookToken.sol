// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EBookToken is ERC20{

    address payable public admin;
    
    constructor(uint256 tokenAmount)ERC20('E-Book Token','EBT'){
        _mint(msg.sender, tokenAmount* (10 ** decimals()));
        admin= payable (msg.sender);
    }

    function buyToken()external payable{
         require(msg.sender!=admin,"owner can not buy token");
         require(msg.value>0,"amount can not be 0");
        _transfer(admin,msg.sender,msg.value);
        // _transfer(msg.sender,admin,msg.value);
        admin.transfer(msg.value);
    }    
}