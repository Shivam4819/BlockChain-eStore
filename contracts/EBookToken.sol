pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EBookToken is ERC20{

    address public admin;
    
    constructor(uint256 tokenAmount)ERC20('E-Book Token','EBT'){
        _mint(msg.sender, tokenAmount* (10 ** decimals()));
        admin= msg.sender;
    }

    function buyToken(uint256 amount)external{
        _transfer(admin,msg.sender,amount);
    }    
}