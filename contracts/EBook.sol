// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;  

contract EBook{

    struct Books{
        uint id;
        string bookName;
        string status;
    }
    address public owner;
    
    constructor() public{
        owner=msg.sender;
    }

    Books[] books;
    
    event Success(string msgs);

    function addBook(uint _id, string memory _bookName) public{
        // mainly used to restriction based on user
        require(msg.sender==owner,"you are not owner");

        books.push(Books(_id,_bookName,"not sold"));

        // event is used to send msg to log which will be accessed by react
        emit Success("Books inserted");        
    }

    function getSpecificBook(uint _id) external view returns(Books memory){

        Books storage book= books[_id];

        return book;

    }

    function getAllBook() external view returns(Books[] memory){

        return books;

    }

    // function updateBookStatus(uint _id, string memory _status, address payable reciver) payable public{

    //     Books storage book= books[_id];
    //     book.status=_status;
    //     reciver.transfer(10);

    // }

    function updateBookStatus(uint _id, string memory _status) payable public{

        Books storage book= books[_id];
        book.status=_status;
     
    }

}

