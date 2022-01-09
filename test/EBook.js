const EBook = artifacts.require("./EBookShop.sol");

contract("EBookShop", accounts => {

  let EBookInstance;

  it("should add book by owner...", async () => {
    EBookInstance = await EBook.deployed();
    const trans=await EBookInstance.addBook("book1",10,"author1",{from:accounts[0]});
    // console.log(trans.logs[0]);
    assert.equal(trans.logs[0].event,"Success");
  });

  it("should add book by user...", async () => {
    try {
      EBookInstance = await EBook.deployed();
      const trans = await EBookInstance.addBook('Book1',10,'author1', { from: accounts[1] });
    } catch (error) {
      assert.equal(error.reason,"you are not owner");
    }
    
  });

  it("should get particular book...", async () => {
    const BookData = await EBookInstance.getSpecificBook(0);
    // console.log(BookData);

  });

  it("should get all book...", async () => {
    const BookData = await EBookInstance.getAllBook();
    // console.log(BookData);
      
  });
});
