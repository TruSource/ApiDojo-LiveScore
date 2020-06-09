const Oracle = artifacts.require("Oracle");
const Example = artifacts.require("Example");
const cbor = require("cbor");
const truffleAssert = require("truffle-assertions");

const { decodeRawLog } = require("./utils/helpers.js");

// EACH TEST NEED TO BE GENERATED FOR EACH SOURCE
contract("Example (End to End tests)", async accounts => {
  // accounts[0] is the address that deployed the contracts (especially the oracle contract)
  let ownerAddress, otherAccountAddress;
  let serverResponse;
  let oracleInstance, exampleInstance;
  let OPERATIONS;
  let statusCode;
  let queryId;

  // before hook is run before all tests
  before(async () => {
    ownerAddress = accounts[0];
    otherAccountAddress = accounts[1];
    serverResponse = "placeholder response";

    oracleInstance = await Oracle.deployed();
    exampleInstance = await Example.deployed();

    OPERATIONS = {
      getLeagues: 0,
      getMatchesDetail: 1,
      getTable: 2,
      getMatchesByDate: 3,
      getMatchesLeague: 4
    };

    statusCode = 200;
  });

  describe("getLeagues operation", () => {
    it("Query getLeagues should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getLeagues({
          from: ownerAddress
        })
      );
    });

    it("Callback for getLeagues should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getLeagues();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getLeagues,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getLeagues should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getLeagues();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getLeagues,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getLeagues should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getLeagues,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getLeagues function is called", async () => {
      const exampleTxObj = await exampleInstance.getLeagues();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getLeagues callback function is called", async () => {
      let result = await exampleInstance.getLeagues();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getLeagues,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getLeagues function", async () => {
      let result = await exampleInstance.getLeagues();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["category", "soccer"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getMatchesDetail operation", () => {
    it("Query getMatchesDetail should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getMatchesDetail({
          from: ownerAddress
        })
      );
    });

    it("Callback for getMatchesDetail should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getMatchesDetail();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesDetail,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getMatchesDetail should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getMatchesDetail();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getMatchesDetail,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getMatchesDetail should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesDetail,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getMatchesDetail function is called", async () => {
      const exampleTxObj = await exampleInstance.getMatchesDetail();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getMatchesDetail callback function is called", async () => {
      let result = await exampleInstance.getMatchesDetail();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getMatchesDetail,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getMatchesDetail function", async () => {
      let result = await exampleInstance.getMatchesDetail();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["category", "soccer", "id", 3065852, "p", 1],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getTable operation", () => {
    it("Query getTable should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getTable({
          from: ownerAddress
        })
      );
    });

    it("Callback for getTable should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getTable();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTable,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getTable should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getTable();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getTable,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getTable should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getTable,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getTable function is called", async () => {
      const exampleTxObj = await exampleInstance.getTable();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getTable callback function is called", async () => {
      let result = await exampleInstance.getTable();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getTable,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getTable function", async () => {
      let result = await exampleInstance.getTable();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["category", "soccer", "id", 3065852, "p", 1],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getMatchesByDate operation", () => {
    it("Query getMatchesByDate should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getMatchesByDate({
          from: ownerAddress
        })
      );
    });

    it("Callback for getMatchesByDate should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getMatchesByDate();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesByDate,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getMatchesByDate should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getMatchesByDate();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getMatchesByDate,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getMatchesByDate should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesByDate,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getMatchesByDate function is called", async () => {
      const exampleTxObj = await exampleInstance.getMatchesByDate();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getMatchesByDate callback function is called", async () => {
      let result = await exampleInstance.getMatchesByDate();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getMatchesByDate,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getMatchesByDate function", async () => {
      let result = await exampleInstance.getMatchesByDate();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["category", "soccer", "date", "2019-08-04"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });

  describe("getMatchesLeague operation", () => {
    it("Query getMatchesLeague should succeed", async () => {
      await truffleAssert.passes(
        exampleInstance.getMatchesLeague({
          from: ownerAddress
        })
      );
    });

    it("Callback for getMatchesLeague should fail if not called by address that deployed the oracle contract", async () => {
      const result = await exampleInstance.getMatchesLeague();
      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesLeague,
          statusCode,
          serverResponse,
          {
            from: otherAccountAddress
          }
        ),
        "Only address that deployed the oracle can call this contract back"
      );
    });

    it("Callback for getMatchesLeague should succeed if called by address that deployed the oracle contract", async () => {
      let result = await exampleInstance.getMatchesLeague();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      await truffleAssert.passes(
        exampleInstance.trusource_callback(
          queryId,
          OPERATIONS.getMatchesLeague,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        )
      );
    });

    it("Callback for getMatchesLeague should fail if query is already fulfilled", async () => {
      await truffleAssert.reverts(
        exampleInstance.trusource_callback.call(
          queryId,
          OPERATIONS.getMatchesLeague,
          statusCode,
          serverResponse,
          {
            from: ownerAddress
          }
        ),
        "Id is not one of a remaining query (query never existed or already fulfilled)"
      );
    });

    // EVENTS
    it("(Event) Log event should be emitted when the getMatchesLeague function is called", async () => {
      const exampleTxObj = await exampleInstance.getMatchesLeague();
      // Example.sol makes a contract call to Oracle.sol where the event is emitted, oracle tx result needed
      const oracleTxObj = await truffleAssert.createTransactionResult(oracleInstance, exampleTxObj.tx);

      // check if Log event is emitted by Oracle.sol
      truffleAssert.eventEmitted(oracleTxObj, "Log");
    });

    it("(Event) Result event should be emitted when getMatchesLeague callback function is called", async () => {
      let result = await exampleInstance.getMatchesLeague();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      queryId = decodedRawLogs.queryId;

      const tx = await exampleInstance.trusource_callback(
        queryId,
        OPERATIONS.getMatchesLeague,
        statusCode,
        serverResponse,
        {
          from: ownerAddress
        }
      );

      truffleAssert.eventEmitted(tx, "LogResult");
    });

    it("(Event) Event queryParams should be generated correctly for getMatchesLeague function", async () => {
      let result = await exampleInstance.getMatchesLeague();

      const decodedRawLogs = decodeRawLog(oracleInstance, "Log", result);
      const encodedBuf = Buffer.from(
        decodedRawLogs.queryParams.slice(2),
        "hex"
      );

      const queryParams = await cbor.decodeAll(encodedBuf);
      assert.deepEqual(
        queryParams,
        ["category", "soccer", "league", "england"],
        "Event not emitted or incorrect queryParams"
      );
    });

  });
});
