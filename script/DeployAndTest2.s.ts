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
    const attestation = await hre.viem.getContractAt("Attestation", "0xa23504c800133eab6c86acacca26ed20ad23fa0d");
    const data = fs.readFileSync("data.json", "utf8");
    const json = JSON.parse(data);

    const tx = await attestation.write.attest([json]);
    await attestation.write.attestCalldata([json]);
    await attestation.write.attestTypedToUntyped([json]);
    await attestation.write.attestTypedToUntypedCalldata([json]);
    const encoded = encodeAbiParameters(merkleProofInputABI, [json]);
    await attestation.write.attestUntypedCalldata([encoded], {
        maxFeePerGas: parseGwei("17"),
        maxPriorityFeePerGas: parseGwei("3"),
    });
}

main()
