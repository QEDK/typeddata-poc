// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import {Attestation} from "../src/Attestation.sol";
import {IAvailBridge} from "../src/interfaces/IAvailBridge.sol";

contract AttestationTest is Test {
    Attestation public attestation;

    function setUp() public {
        attestation = new Attestation();
    }

    function testRevert_Attest() public {
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/data.json");
        string memory json = vm.readFile(path);
        vm.expectRevert(); // too large to be loaded into memory
        bytes memory data = vm.parseJson(json);
        IAvailBridge.MerkleProofInput memory input = abi.decode(data, (IAvailBridge.MerkleProofInput));
        attestation.attest(input);
    }

    function test_ParseJson() public view {
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/data2.json");
        string memory json = vm.readFile(path);
        bytes memory data = vm.parseJson(json);
        console.logBytes(data);
    }
}
