const EBook = artifacts.require("./EBook.sol");

contract("EBook", accounts => {

  let EBookInstance;

  it("should add book by owner...", async () => {
    EBookInstance = await EBook.deployed();
    const trans=await EBookInstance.addBook(1,'Book1', { from: accounts[0] });
    // console.log(trans.logs[0]);
    assert.equal(trans.logs[0].event,"Success");
  });

  it("should add book by user...", async () => {
    try {
      EBookInstance = await EBook.deployed();
      const trans = await EBookInstance.addBook(2,'Book1', { from: accounts[1] });
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
