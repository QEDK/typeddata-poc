import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";
import fs from "fs";
import { encodeAbiParameters } from 'viem'

describe("Attestation", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAttestationFixture() {
    const attestation = await hre.viem.deployContract("Attestation");

    return {
      attestation
    };
  }

  describe("Deployment", async function () {
    it("Load typed data (memory)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attest([json]);
    });

    it("Load typed data (calldata)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attestCalldata([json]);
      await attestation.write.attestCalldata([json]);
    });

    it("Convert typed data into untyped data (memory)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attestTypedToUntyped([json]);
      await attestation.write.attestTypedToUntyped([json]);
    });

    it("Convert typed data into untyped data (calldata)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attestTypedToUntypedCalldata([json]);
      await attestation.write.attestTypedToUntypedCalldata([json]);
    });

    it("Load untyped data (memory)", async function () {

      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      const encoded = encodeAbiParameters([
        {
          "internalType": "bytes32[]",
          "name": "dataRootProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "leafProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "rangeHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "dataRootIndex",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "blobRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "bridgeRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "leafIndex",
          "type": "uint256"
        }
      ], Object.values(json));
      await attestation.simulate.attestUntyped([encoded]);
      await attestation.write.attestUntyped([encoded]);
    });

    it("Load untyped data (calldata)", async function () {

      const { attestation } = await loadFixture(deployAttestationFixture);

      const data = fs.readFileSync("data.json", "utf8");
      const json = JSON.parse(data);

      const encoded = encodeAbiParameters([
        {
          "internalType": "bytes32[]",
          "name": "dataRootProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "leafProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "rangeHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "dataRootIndex",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "blobRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "bridgeRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "leafIndex",
          "type": "uint256"
        }
      ], Object.values(json));
      await attestation.simulate.attestUntypedCalldata([encoded]);
      await attestation.write.attestUntypedCalldata([encoded]);
    });

    it("Load typed data 2 (memory)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      // load json from data.json
      const data = fs.readFileSync("data2.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attest([json]);
      await attestation.write.attest([json]);
    });

    it("Load typed data 2 (calldata)", async function () {
      const { attestation } = await loadFixture(deployAttestationFixture);

      // load json from data.json
      const data = fs.readFileSync("data2.json", "utf8");
      const json = JSON.parse(data);

      await attestation.simulate.attestCalldata([json]);
      await attestation.write.attestCalldata([json]);
    });

    it("Load untyped data 2 (memory)", async function () {

      const { attestation } = await loadFixture(deployAttestationFixture);

      // load json from data.json
      const data = fs.readFileSync("data2.json", "utf8");
      const json = JSON.parse(data);

      const encoded = encodeAbiParameters([
        {
          "internalType": "bytes32[]",
          "name": "dataRootProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "leafProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "rangeHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "dataRootIndex",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "blobRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "bridgeRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "leafIndex",
          "type": "uint256"
        }
      ], Object.values(json));
      await attestation.simulate.attestUntyped([encoded]);
      await attestation.write.attestUntyped([encoded]);
    });

    it("Load untyped data 2 (calldata)", async function () {

      const { attestation } = await loadFixture(deployAttestationFixture);

      // load json from data.json
      const data = fs.readFileSync("data2.json", "utf8");
      const json = JSON.parse(data);

      const encoded = encodeAbiParameters([
        {
          "internalType": "bytes32[]",
          "name": "dataRootProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "leafProof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "rangeHash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "dataRootIndex",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "blobRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "bridgeRoot",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "leafIndex",
          "type": "uint256"
        }
      ], Object.values(json));
      await attestation.simulate.attestUntypedCalldata([encoded]);
      await attestation.write.attestUntypedCalldata([encoded]);
    });
  });
});
