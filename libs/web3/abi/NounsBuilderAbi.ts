export const NounsBuilderGovernorAbi = [
  {
    stateMutability: "payable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "address", type: "address" }],
  },
  { type: "error", inputs: [], name: "ADDRESS_ZERO" },
  { type: "error", inputs: [], name: "ALREADY_INITIALIZED" },
  { type: "error", inputs: [], name: "ALREADY_VOTED" },
  { type: "error", inputs: [], name: "BELOW_PROPOSAL_THRESHOLD" },
  { type: "error", inputs: [], name: "DELEGATE_CALL_FAILED" },
  { type: "error", inputs: [], name: "EXPIRED_SIGNATURE" },
  { type: "error", inputs: [], name: "INITIALIZING" },
  { type: "error", inputs: [], name: "INVALID_CANCEL" },
  { type: "error", inputs: [], name: "INVALID_PROPOSAL_THRESHOLD_BPS" },
  { type: "error", inputs: [], name: "INVALID_QUORUM_THRESHOLD_BPS" },
  { type: "error", inputs: [], name: "INVALID_SIGNATURE" },
  { type: "error", inputs: [], name: "INVALID_TARGET" },
  {
    type: "error",
    inputs: [{ name: "impl", internalType: "address", type: "address" }],
    name: "INVALID_UPGRADE",
  },
  { type: "error", inputs: [], name: "INVALID_VOTE" },
  { type: "error", inputs: [], name: "INVALID_VOTING_DELAY" },
  { type: "error", inputs: [], name: "INVALID_VOTING_PERIOD" },
  { type: "error", inputs: [], name: "NOT_INITIALIZING" },
  { type: "error", inputs: [], name: "ONLY_CALL" },
  { type: "error", inputs: [], name: "ONLY_DELEGATECALL" },
  { type: "error", inputs: [], name: "ONLY_MANAGER" },
  { type: "error", inputs: [], name: "ONLY_OWNER" },
  { type: "error", inputs: [], name: "ONLY_PENDING_OWNER" },
  { type: "error", inputs: [], name: "ONLY_PROXY" },
  { type: "error", inputs: [], name: "ONLY_UUPS" },
  { type: "error", inputs: [], name: "ONLY_VETOER" },
  { type: "error", inputs: [], name: "PROPOSAL_ALREADY_EXECUTED" },
  { type: "error", inputs: [], name: "PROPOSAL_DOES_NOT_EXIST" },
  {
    type: "error",
    inputs: [{ name: "proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "PROPOSAL_EXISTS",
  },
  { type: "error", inputs: [], name: "PROPOSAL_LENGTH_MISMATCH" },
  {
    type: "error",
    inputs: [{ name: "proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "PROPOSAL_NOT_QUEUED",
  },
  { type: "error", inputs: [], name: "PROPOSAL_TARGET_MISSING" },
  { type: "error", inputs: [], name: "PROPOSAL_UNSUCCESSFUL" },
  { type: "error", inputs: [], name: "UNSAFE_CAST" },
  { type: "error", inputs: [], name: "UNSUPPORTED_UUID" },
  { type: "error", inputs: [], name: "VOTING_NOT_STARTED" },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "canceledOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnerCanceled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "pendingOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnerPending",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "ProposalCanceled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "targets",
        internalType: "address[]",
        type: "address[]",
        indexed: false,
      },
      {
        name: "values",
        internalType: "uint256[]",
        type: "uint256[]",
        indexed: false,
      },
      {
        name: "calldatas",
        internalType: "bytes[]",
        type: "bytes[]",
        indexed: false,
      },
      {
        name: "description",
        internalType: "string",
        type: "string",
        indexed: false,
      },
      {
        name: "descriptionHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "proposal",
        internalType: "struct GovernorTypesV1.Proposal",
        type: "tuple",
        components: [
          { name: "proposer", internalType: "address", type: "address" },
          { name: "timeCreated", internalType: "uint32", type: "uint32" },
          { name: "againstVotes", internalType: "uint32", type: "uint32" },
          { name: "forVotes", internalType: "uint32", type: "uint32" },
          { name: "abstainVotes", internalType: "uint32", type: "uint32" },
          { name: "voteStart", internalType: "uint32", type: "uint32" },
          { name: "voteEnd", internalType: "uint32", type: "uint32" },
          { name: "proposalThreshold", internalType: "uint32", type: "uint32" },
          { name: "quorumVotes", internalType: "uint32", type: "uint32" },
          { name: "executed", internalType: "bool", type: "bool" },
          { name: "canceled", internalType: "bool", type: "bool" },
          { name: "vetoed", internalType: "bool", type: "bool" },
        ],
        indexed: false,
      },
    ],
    name: "ProposalCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "ProposalExecuted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      { name: "eta", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "ProposalQueued",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevBps",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newBps",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "ProposalThresholdBpsUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
    ],
    name: "ProposalVetoed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevBps",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newBps",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "QuorumVotesBpsUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "impl",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "Upgraded",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevVetoer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "newVetoer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "VetoerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "voter",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "proposalId",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      {
        name: "support",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "weight",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "reason",
        internalType: "string",
        type: "string",
        indexed: false,
      },
    ],
    name: "VoteCast",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevVotingDelay",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newVotingDelay",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "VotingDelayUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "prevVotingPeriod",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "newVotingPeriod",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "VotingPeriodUpdated",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_PROPOSAL_THRESHOLD_BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_QUORUM_THRESHOLD_BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_VOTING_DELAY",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_VOTING_PERIOD",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_PROPOSAL_THRESHOLD_BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_QUORUM_THRESHOLD_BPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_VOTING_DELAY",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_VOTING_PERIOD",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "VOTE_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "burnVetoer",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "cancel",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [],
    name: "cancelOwnershipTransfer",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "bytes32", type: "bytes32" },
      { name: "_support", internalType: "uint256", type: "uint256" },
    ],
    name: "castVote",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_voter", internalType: "address", type: "address" },
      { name: "_proposalId", internalType: "bytes32", type: "bytes32" },
      { name: "_support", internalType: "uint256", type: "uint256" },
      { name: "_deadline", internalType: "uint256", type: "uint256" },
      { name: "_v", internalType: "uint8", type: "uint8" },
      { name: "_r", internalType: "bytes32", type: "bytes32" },
      { name: "_s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "castVoteBySig",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_proposalId", internalType: "bytes32", type: "bytes32" },
      { name: "_support", internalType: "uint256", type: "uint256" },
      { name: "_reason", internalType: "string", type: "string" },
    ],
    name: "castVoteWithReason",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "contractVersion",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_targets", internalType: "address[]", type: "address[]" },
      { name: "_values", internalType: "uint256[]", type: "uint256[]" },
      { name: "_calldatas", internalType: "bytes[]", type: "bytes[]" },
      { name: "_descriptionHash", internalType: "bytes32", type: "bytes32" },
      { name: "_proposer", internalType: "address", type: "address" },
    ],
    name: "execute",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "getProposal",
    outputs: [
      {
        name: "",
        internalType: "struct GovernorTypesV1.Proposal",
        type: "tuple",
        components: [
          { name: "proposer", internalType: "address", type: "address" },
          { name: "timeCreated", internalType: "uint32", type: "uint32" },
          { name: "againstVotes", internalType: "uint32", type: "uint32" },
          { name: "forVotes", internalType: "uint32", type: "uint32" },
          { name: "abstainVotes", internalType: "uint32", type: "uint32" },
          { name: "voteStart", internalType: "uint32", type: "uint32" },
          { name: "voteEnd", internalType: "uint32", type: "uint32" },
          { name: "proposalThreshold", internalType: "uint32", type: "uint32" },
          { name: "quorumVotes", internalType: "uint32", type: "uint32" },
          { name: "executed", internalType: "bool", type: "bool" },
          { name: "canceled", internalType: "bool", type: "bool" },
          { name: "vetoed", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_account", internalType: "address", type: "address" },
      { name: "_timestamp", internalType: "uint256", type: "uint256" },
    ],
    name: "getVotes",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "_targets", internalType: "address[]", type: "address[]" },
      { name: "_values", internalType: "uint256[]", type: "uint256[]" },
      { name: "_calldatas", internalType: "bytes[]", type: "bytes[]" },
      { name: "_descriptionHash", internalType: "bytes32", type: "bytes32" },
      { name: "_proposer", internalType: "address", type: "address" },
    ],
    name: "hashProposal",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_treasury", internalType: "address", type: "address" },
      { name: "_token", internalType: "address", type: "address" },
      { name: "_vetoer", internalType: "address", type: "address" },
      { name: "_votingDelay", internalType: "uint256", type: "uint256" },
      { name: "_votingPeriod", internalType: "uint256", type: "uint256" },
      {
        name: "_proposalThresholdBps",
        internalType: "uint256",
        type: "uint256",
      },
      { name: "_quorumThresholdBps", internalType: "uint256", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_account", internalType: "address", type: "address" }],
    name: "nonce",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "pendingOwner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "proposalDeadline",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "proposalEta",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "proposalSnapshot",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "proposalThreshold",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "proposalThresholdBps",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "proposalVotes",
    outputs: [
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_targets", internalType: "address[]", type: "address[]" },
      { name: "_values", internalType: "uint256[]", type: "uint256[]" },
      { name: "_calldatas", internalType: "bytes[]", type: "bytes[]" },
      { name: "_description", internalType: "string", type: "string" },
    ],
    name: "propose",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "queue",
    outputs: [{ name: "eta", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "quorum",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "quorumThresholdBps",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newOwner", internalType: "address", type: "address" }],
    name: "safeTransferOwnership",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "state",
    outputs: [
      {
        name: "",
        internalType: "enum GovernorTypesV1.ProposalState",
        type: "uint8",
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "token",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "treasury",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "_newProposalThresholdBps",
        internalType: "uint256",
        type: "uint256",
      },
    ],
    name: "updateProposalThresholdBps",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newQuorumVotesBps", internalType: "uint256", type: "uint256" }],
    name: "updateQuorumThresholdBps",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newVetoer", internalType: "address", type: "address" }],
    name: "updateVetoer",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newVotingDelay", internalType: "uint256", type: "uint256" }],
    name: "updateVotingDelay",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newVotingPeriod", internalType: "uint256", type: "uint256" }],
    name: "updateVotingPeriod",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_newImpl", internalType: "address", type: "address" }],
    name: "upgradeTo",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_newImpl", internalType: "address", type: "address" },
      { name: "_data", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "_proposalId", internalType: "bytes32", type: "bytes32" }],
    name: "veto",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "vetoer",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "votingDelay",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "votingPeriod",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
];
