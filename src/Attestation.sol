// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

import {IAvailBridge} from "./interfaces/IAvailBridge.sol";

contract Attestation {
    IAvailBridge public bridge;

    constructor(IAvailBridge _bridge) {
        bridge = _bridge;
    }

    function attest(IAvailBridge.MerkleProofInput memory input) external {
        require(bridge.verifyBlobLeaf(input), "Invalid proof");
    }

    function attestCalldata(IAvailBridge.MerkleProofInput calldata input) external {
        require(bridge.verifyBlobLeaf(input), "Invalid proof");
    }

    function attestTypedToUntyped(IAvailBridge.MerkleProofInput memory input) external returns (bytes memory) {
        bytes memory data = abi.encode(input);
        require(bridge.verifyBlobLeaf(input), "Invalid proof");
        return data;
    }

    function attestTypedToUntypedCalldata(IAvailBridge.MerkleProofInput calldata input)
        external
        returns (bytes memory)
    {
        bytes memory data = abi.encode(input);
        require(bridge.verifyBlobLeaf(input), "Invalid proof");
        return data;
    }

    function attestUntyped(bytes memory input) external {
        require(bridge.verifyBlobLeaf(abi.decode(input, (IAvailBridge.MerkleProofInput))), "Invalid proof");
    }

    function attestUntypedCalldata(bytes calldata input) external {
        require(bridge.verifyBlobLeaf(abi.decode(input, (IAvailBridge.MerkleProofInput))), "Invalid proof");
    }
}
