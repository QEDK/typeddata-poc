// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {AvailAttestation} from "./lib/AvailAttestation.sol";
import {IAvailBridge} from "./interfaces/IAvailBridge.sol";

contract ValidiumL1DAValidator is AvailAttestation {
    constructor(IAvailBridge _bridge) AvailAttestation(_bridge) {}

    function checkDA(
        uint256, // _chainId
        uint256, // _batchNumber
        bytes32, // _l2DAValidatorOutputHash
        bytes calldata _operatorDAInput,
        uint256 // maxBlobsSupported
    ) external returns (bytes memory output) {
        // For Validiums, we expect the operator to just provide the data for us.
        // We don't need to do any checks with regard to the l2DAValidatorOutputHash.

        IAvailBridge.MerkleProofInput memory input = abi.decode(_operatorDAInput, (IAvailBridge.MerkleProofInput));
        _attest(input);
    }
}
