// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;  

contract EBookShop{

    struct NewBook{
        string name;
        bool status;
        uint256 price;
        string author;
    }
    
    NewBook[] books;
    address payable owner;
    
    constructor(){
        owner=payable(msg.sender);
    }

    event Success(string msgs);

    
    function addBook(string memory _name, uint256 _price, string memory _author) public{
        
        require(msg.sender==owner,"your are not owner");
        
        NewBook memory newbook= NewBook({
            name:_name,
            price:_price,
            status:false,
            author:_author
        });

        books.push(newbook);
        emit Success("Books inserted");        
    }

    function getSpecificBook(uint _id) external view returns(NewBook memory){
    
       return books[_id];
    }

    function getAllBook() external view returns(NewBook[] memory){

        return books;
    }

    function buyBook(uint _id) payable public{

        require(msg.sender!=owner,"owner can not buy book");
        
        NewBook storage book= books[_id];
        require(msg.value==(book.price*(10**18)),"you send wrong amount");
        book.status=true;
        owner.transfer(msg.value);
       
    }

    function balanceOf() external view returns(uint) {
        
        return owner.balance;
        
    }
}