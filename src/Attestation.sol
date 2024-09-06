// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.26;

import {IAvailBridge} from "./interfaces/IAvailBridge.sol";

contract Attestation {
    function attest(IAvailBridge.MerkleProofInput memory input) external returns (bytes memory) {
        bytes memory data = abi.encode(input);
        return data;
    }

    function attestCalldata(IAvailBridge.MerkleProofInput calldata input) external returns (bytes memory) {
        bytes memory data = abi.encode(input);
        return data;
    }

    function attestTypedToUntyped(IAvailBridge.MerkleProofInput memory input) external returns (bytes memory) {
        bytes memory data = abi.encode(input);
        return data;
    }

    function attestTypedToUntypedCalldata(IAvailBridge.MerkleProofInput calldata input) external returns (bytes memory) {
        bytes memory data = abi.encode(input);
        return data;
    }

    function attestUntyped(bytes memory input) external returns (IAvailBridge.MerkleProofInput memory) {
        IAvailBridge.MerkleProofInput memory proof = abi.decode(input, (IAvailBridge.MerkleProofInput));
        return proof;
    }

    function attestUntypedCalldata(bytes calldata input) external returns (IAvailBridge.MerkleProofInput memory) {
        IAvailBridge.MerkleProofInput memory proof = abi.decode(input, (IAvailBridge.MerkleProofInput));
        return proof;
    }
}
