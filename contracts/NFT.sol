// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    address owner;
    
    constructor() ERC721("BookNFT", "BNFT") {
        owner=msg.sender;
    }
    
    function mint(address recipient) public returns (uint256)
    {
        require(msg.sender==owner,'only owner can deploy');
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }
    function _baseURI() internal view override returns (string memory) {
        return 'https://nft-back-end.herokuapp.com/';
    }

}