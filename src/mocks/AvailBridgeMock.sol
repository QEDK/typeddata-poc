// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {IAvailBridge} from "../interfaces/IAvailBridge.sol";

contract AvailBridgeMock {
    function verifyBlobLeaf(IAvailBridge.MerkleProofInput calldata input) external view returns (bool) {
        return true;
    }
}
