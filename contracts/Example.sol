pragma solidity ^0.5.0;

import "./OracleAPI.sol";

/**
 * @title Example contract using LiveScore oracle
 * @author TruSource
 * @notice Example contract using LiveScore oracle
 * @dev Demonstrates usage of OracleAPI and building queryParams
 */
contract Example is OracleAPI {
    event LogResult(bytes32 queryId, Oracle.Oracle.Operations operationId, uint256 statusCode, string result);

    constructor(address resolverAddress) public OracleAPI(resolverAddress) {}

    /**
     * @notice Make getLeagues query
     * @dev Make getLeagues query, queryId is returned to be used to handle query result
     */
    function getLeagues() external {
        trusource_getLeagues("soccer");
    }

    /**
     * @notice Make getMatchesDetail query
     * @dev Make getMatchesDetail query, queryId is returned to be used to handle query result
     */
    function getMatchesDetail() external {
        trusource_getMatchesDetail("soccer", 3065852, 1);
    }

    /**
     * @notice Make getTable query
     * @dev Make getTable query, queryId is returned to be used to handle query result
     */
    function getTable() external {
        trusource_getTable("soccer", 3065852, 1);
    }

    /**
     * @notice Make getMatchesByDate query
     * @dev Make getMatchesByDate query, queryId is returned to be used to handle query result
     */
    function getMatchesByDate() external {
        trusource_getMatchesByDate("soccer", "2019-08-04");
    }

    /**
     * @notice Make getMatchesLeague query
     * @dev Make getMatchesLeague query, queryId is returned to be used to handle query result
     */
    function getMatchesLeague() external {
        trusource_getMatchesLeague("soccer", "england");
    }

    /**
     * @dev Handle query result using queryId, operationId and statusCode
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
    ) external checkAddress checkQueryId(queryId) {
        if (operationId == Oracle.Oracle.Operations.getLeagues) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getMatchesDetail) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getTable) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getMatchesByDate) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }

        if (operationId == Oracle.Oracle.Operations.getMatchesLeague) {
            emit LogResult(queryId, operationId, statusCode, result);
            return;
        }
    }
}
