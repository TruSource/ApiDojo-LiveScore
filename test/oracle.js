const Oracle = artifacts.require("Oracle");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

contract("Oracle (Query) - getLeagues", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["category", "soccer"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getLeagues(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getMatchesDetail", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["category", "soccer", "id", 3065852, "p", 1]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getMatchesDetail(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getTable", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["category", "soccer", "id", 3065852, "p", 1]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getTable(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getMatchesByDate", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["category", "soccer", "date", "2019-08-04"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getMatchesByDate(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});

contract("Oracle (Query) - getMatchesLeague", async accounts => {
  // Note: use .call() where not necessary to use a transaction
  let oracleInstance;
  let contractAddress;
  let encodedQueryParams;
  
  let options;

  // before hook is run before all tests
  before(async () => {
    oracleInstance = await Oracle.deployed();

    encodedQueryParams = cbor.encode(["category", "soccer", "league", "england"]);


    options = "";

    // Note: does not matter that its an account address - we just need an address to test with
    contractAddress = accounts[2];
  });

  it("Query should succeed and event should be emitted", async () => {
    const tx = await oracleInstance.getMatchesLeague(
      
      encodedQueryParams,
      options,
      {
        from: contractAddress
      }
    );

    truffleAssert.eventEmitted(tx, "Log");
  });
});
