const abiDecoder = require("abi-decoder");

// pulled from Allowlist.json "abi" field
const testABI = [
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "_createAllowlister",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
abiDecoder.addABI(testABI);

// add in your input data hash as a string here
const testData = "";
const decodedData = abiDecoder.decodeMethod(testData);
console.log(decodedData);
