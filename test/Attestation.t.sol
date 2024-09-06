// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import {Attestation} from "../src/Attestation.sol";
import {IAvailBridge} from "../src/interfaces/IAvailBridge.sol";
import {AvailBridgeMock} from "../src/mocks/AvailBridgeMock.sol";

contract AttestationTest is Test {
    Attestation public attestation;

    function setUp() public {
        attestation = new Attestation(IAvailBridge(address(new AvailBridgeMock())));
    }

    function test_Attest() public {
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/data3.json");
        string memory json = vm.readFile(path);
        bytes memory data = vm.parseJson(json);
        attestation.attestUntypedCalldata(data);
    }

    function test_ParseJson() public view {
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/data3.json");
        string memory json = vm.readFile(path);
        bytes memory data = vm.parseJson(json);
        console.logBytes(data);
    }
}
