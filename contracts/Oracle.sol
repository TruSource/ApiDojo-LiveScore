pragma solidity ^0.5.0;

/** 
 * @title Oracle.
 * @author TruSource
 * @notice LiveScore oracle contract
 */ 
contract Oracle {
    address private owner;

    enum Operations { getLeagues, getMatchesDetail, getTable, getMatchesByDate, getMatchesLeague }

    // number of requests is incremented for each request to generate unique id
    mapping (address => uint256) private numRequests;

    event Log(
        address sender,
        bytes32 queryId,
        Operations operationId,
        bytes pathParams,
        bytes queryParams,
        string options
    );

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @return address owner address
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getLeagues(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getLeagues, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getMatchesDetail(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getMatchesDetail, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getTable(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getTable, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getMatchesByDate(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getMatchesByDate, "", queryParams, options);
    }

    /**
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function getMatchesLeague(bytes calldata queryParams, string calldata options) external returns (bytes32) {
        return makeRequest(Operations.getMatchesLeague, "", queryParams, options);
    }

    /**
     * @param operationId operation id
     * @return bytes32 query id
     */
    function generateQueryId(Operations operationId) internal returns (bytes32) {
        // increment number requests
        numRequests[msg.sender]++;

        // create id from hash of contract address, requestor address, requestor address count, and operation id
        return keccak256(abi.encodePacked(this, msg.sender, numRequests[msg.sender], operationId));
    }

    /**
     * @param operationId operation id
     * @param pathParams encoded path parameters buffer
     * @param queryParams encoded query parameters buffer
     * @param options options string
     * @return bytes32 query id
     */
    function makeRequest(
        Operations operationId,
        bytes memory pathParams,
        bytes memory queryParams,
        string memory options
    ) internal returns (bytes32) {
        bytes32 queryId = generateQueryId(operationId);
        emit Log(msg.sender, queryId, operationId, pathParams, queryParams, options);
        return queryId;
    }
}
