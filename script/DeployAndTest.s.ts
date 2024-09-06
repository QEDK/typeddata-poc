import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
  import { expect } from "chai";
  import hre from "hardhat";
  import { getAddress, parseGwei } from "viem";
  import fs from "fs";
  import { encodeAbiParameters } from 'viem';

  const merkleProofInputABI = [
    {
        "name": "input",
        "type": "tuple",
        "internalType": "struct IAvailBridge.MerkleProofInput",
        "components": [
            {
                "name": "dataRootProof",
                "type": "bytes32[]",
                "internalType": "bytes32[]"
            },
            {
                "name": "leafProof",
                "type": "bytes32[]",
                "internalType": "bytes32[]"
            },
            {
                "name": "rangeHash",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "dataRootIndex",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "blobRoot",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "bridgeRoot",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "leaf",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "leafIndex",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    }
  ]

const main = async () => {
    const attestation = await hre.viem.getContractAt("ValidiumL1DAValidator", "0x9e804085267c8998d7a0a15eeb2e53ce84ede846");
    console.log("Attestation deployed to:", attestation.address);
    const data = fs.readFileSync("data.json", "utf8");
    const json = JSON.parse(data);

    const encoded = encodeAbiParameters(merkleProofInputABI, [json]);                    
    await attestation.write.checkDA([BigInt(0), BigInt(0), "0x0000000000000000000000000000000000000000000000000000000000000000", encoded, BigInt(0)]);
}

main()
