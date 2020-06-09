pragma solidity ^0.5.0;

import "@trusource/solidity-cbor/contracts/CBOR.sol";
import "./Resolver.sol" as Resolver;
import "./Oracle.sol" as Oracle;

/**
 * @title API for Oracle contract
 * @author TruSource
 * @dev API for Oracle contract
 */
contract OracleAPI {
    uint256 internal constant DEFAULT_BUFFER_SIZE = 256;
    using CBOR for Buffer.buffer;

    // keep track of queries that did not get a response yet
    mapping(bytes32 => bool) internal remainingQueries;

    Resolver.Resolver private resolver;
    Oracle.Oracle private oracle;
    address private owner;

    constructor(address resolverAddress) public {
        owner = msg.sender;
        resolver = Resolver.Resolver(resolverAddress);
        oracle = Oracle.Oracle(resolver.getOracleAddress());
    }

    modifier checkAddress() {
        require(
            msg.sender == callback_address(),
            "Only address that deployed the oracle can call this contract back"
        );
        _;
    }

    modifier checkQueryId(bytes32 queryId) {
        require(
            remainingQueries[queryId],
            "Id is not one of a remaining query (query never existed or already fulfilled)"
        );

        // remove query from list of unfulfilled queries
        remainingQueries[queryId] = false;

        _;
    }

    modifier setOracle {
        oracle = Oracle.Oracle(resolver.getOracleAddress());
        _;
    }

    /**
     * @dev get callback address
     * @return address Oracle owner address
     */
    function callback_address() internal view returns (address) {
        return oracle.getOwner();
    }

    /**
     * @dev getLeagues
     * @param category category required query parameter
     * @return queryId unique id for query
     */
    function trusource_getLeagues(string memory category) internal returns (bytes32) {
        return trusource_getLeagues(category, "");
    }

    /**
     * @dev getLeagues
     * @param category category required query parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getLeagues(string memory category, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory queryParams = createBuffer();
        addString(queryParams, "category", category);
    
        bytes32 queryId = oracle.getLeagues(queryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getLeagues
     * @param category category required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getLeagues(string memory category, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getLeagues(category, optionalQueryParams, "");
    }

    /**
     * @dev getLeagues
     * @param category category required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getLeagues(string memory category, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        addString(optionalQueryParams, "category", category);
    
        bytes32 queryId = oracle.getLeagues(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesDetail
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @return queryId unique id for query
     */
    function trusource_getMatchesDetail(string memory category, uint256 id, uint256 p) internal returns (bytes32) {
        return trusource_getMatchesDetail(category, id, p, "");
    }

    /**
     * @dev getMatchesDetail
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesDetail(string memory category, uint256 id, uint256 p, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory queryParams = createBuffer();
        addString(queryParams, "category", category);
        addUInt(queryParams, "id", id);
        addUInt(queryParams, "p", p);
    
        bytes32 queryId = oracle.getMatchesDetail(queryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesDetail
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getMatchesDetail(string memory category, uint256 id, uint256 p, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getMatchesDetail(category, id, p, optionalQueryParams, "");
    }

    /**
     * @dev getMatchesDetail
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesDetail(string memory category, uint256 id, uint256 p, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        addString(optionalQueryParams, "category", category);
        addUInt(optionalQueryParams, "id", id);
        addUInt(optionalQueryParams, "p", p);
    
        bytes32 queryId = oracle.getMatchesDetail(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTable
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @return queryId unique id for query
     */
    function trusource_getTable(string memory category, uint256 id, uint256 p) internal returns (bytes32) {
        return trusource_getTable(category, id, p, "");
    }

    /**
     * @dev getTable
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTable(string memory category, uint256 id, uint256 p, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory queryParams = createBuffer();
        addString(queryParams, "category", category);
        addUInt(queryParams, "id", id);
        addUInt(queryParams, "p", p);
    
        bytes32 queryId = oracle.getTable(queryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getTable
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getTable(string memory category, uint256 id, uint256 p, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getTable(category, id, p, optionalQueryParams, "");
    }

    /**
     * @dev getTable
     * @param category category required query parameter
     * @param id id required query parameter
     * @param p p required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getTable(string memory category, uint256 id, uint256 p, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        addString(optionalQueryParams, "category", category);
        addUInt(optionalQueryParams, "id", id);
        addUInt(optionalQueryParams, "p", p);
    
        bytes32 queryId = oracle.getTable(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesByDate
     * @param category category required query parameter
     * @param date date required query parameter
     * @return queryId unique id for query
     */
    function trusource_getMatchesByDate(string memory category, string memory date) internal returns (bytes32) {
        return trusource_getMatchesByDate(category, date, "");
    }

    /**
     * @dev getMatchesByDate
     * @param category category required query parameter
     * @param date date required query parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesByDate(string memory category, string memory date, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory queryParams = createBuffer();
        addString(queryParams, "category", category);
        addString(queryParams, "date", date);
    
        bytes32 queryId = oracle.getMatchesByDate(queryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesByDate
     * @param category category required query parameter
     * @param date date required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getMatchesByDate(string memory category, string memory date, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getMatchesByDate(category, date, optionalQueryParams, "");
    }

    /**
     * @dev getMatchesByDate
     * @param category category required query parameter
     * @param date date required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesByDate(string memory category, string memory date, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        addString(optionalQueryParams, "category", category);
        addString(optionalQueryParams, "date", date);
    
        bytes32 queryId = oracle.getMatchesByDate(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesLeague
     * @param category category required query parameter
     * @param league league required query parameter
     * @return queryId unique id for query
     */
    function trusource_getMatchesLeague(string memory category, string memory league) internal returns (bytes32) {
        return trusource_getMatchesLeague(category, league, "");
    }

    /**
     * @dev getMatchesLeague
     * @param category category required query parameter
     * @param league league required query parameter
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesLeague(string memory category, string memory league, string memory options) internal setOracle returns (bytes32) {
        Buffer.buffer memory queryParams = createBuffer();
        addString(queryParams, "category", category);
        addString(queryParams, "league", league);
    
        bytes32 queryId = oracle.getMatchesLeague(queryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }

    /**
     * @dev getMatchesLeague
     * @param category category required query parameter
     * @param league league required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @return queryId unique id for query
     */
    function trusource_getMatchesLeague(string memory category, string memory league, Buffer.buffer memory optionalQueryParams) internal returns (bytes32) {
        return trusource_getMatchesLeague(category, league, optionalQueryParams, "");
    }

    /**
     * @dev getMatchesLeague
     * @param category category required query parameter
     * @param league league required query parameter
     * @param optionalQueryParams encoded query parameters buffer
     * @param options options string
     * @return queryId unique id for query
     */
    function trusource_getMatchesLeague(string memory category, string memory league, Buffer.buffer memory optionalQueryParams, string memory options) internal setOracle returns (bytes32) {
        addString(optionalQueryParams, "category", category);
        addString(optionalQueryParams, "league", league);
    
        bytes32 queryId = oracle.getMatchesLeague(optionalQueryParams.buf, options);
    
        // add query to list of unfulfilled queries
        remainingQueries[queryId] = true;
    
        return queryId;
    }


    /**
      * @dev trusource_callback abstract function
      * @param queryId unique id for query
      * @param operationId id for operation
      * @param statusCode HTTP response status code
      * @param result query result
      */
    function trusource_callback(
        bytes32 queryId,
        Oracle.Oracle.Operations operationId,
        uint256 statusCode,
        string calldata result
    ) external;

    /**
      * @dev initialises buffer
      * @return Buffer.buffer
      */
    function createBuffer() internal pure returns (Buffer.buffer memory) {
        Buffer.buffer memory buf;
        Buffer.init(buf, DEFAULT_BUFFER_SIZE);
        return buf;
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addString(Buffer.buffer memory params, string memory key, string memory value) internal pure {
        params.encodeString(key);
        params.encodeString(value);
    }
    
    /**
      * @dev Adds key value pair to buffer
      * @param params buffer that is added
      * @param key key value
      * @param value value
      */
    function addUInt(Buffer.buffer memory params, string memory key, uint256 value) internal pure {
        params.encodeString(key);
        params.encodeUInt(value);
    }

    /**
      * @dev Parses string as a uint
      * @param str string representation of uint
      * @return parsedInt integer
      */
    function parseInt(string memory str) internal pure returns (uint256 parsedInt) {
        bytes memory bstr = bytes(str);
        uint256 mint = 0;
        bool decimals = false;
        for (uint256 i = 0; i < bstr.length; i++) {
            if (
                (uint256(uint8(bstr[i])) >= 48) &&
                (uint256(uint8(bstr[i])) <= 57)
            ) {
                if (decimals) {
                    break;
                }
                mint *= 10;
                mint += uint256(uint8(bstr[i])) - 48;
            } else if (uint256(uint8(bstr[i])) == 46) {
                decimals = true;
            }
        }
        return mint;
    }}
