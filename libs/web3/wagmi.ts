// Generated by @wagmi/cli@0.1.15 on 4/13/2023 at 6:49:39 PM

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'addedValue', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'subtractedValue', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'approved', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', type: 'address' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'id', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', type: 'address' },
      { name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'index', type: 'uint256' },
    ],
    name: 'tokenByIndex',
    outputs: [{ name: 'tokenId', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Drop
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5Eb5bABCEFEa846b220C82f222F00Df95934F5f0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xf59ae75C5599876c0F56017BCCC90EcA15743C74)
 */
export const erc721DropABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_zoraERC721TransferHelper', internalType: 'address', type: 'address' },
      {
        name: '_factoryUpgradeGate',
        internalType: 'contract IFactoryUpgradeGate',
        type: 'address',
      },
      { name: '_marketFilterDAOAddress', internalType: 'address', type: 'address' },
      { name: '_mintFeeAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_mintFeeRecipient', internalType: 'address payable', type: 'address' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'Access_MissingRoleOrAdmin',
  },
  { type: 'error', inputs: [], name: 'Access_OnlyAdmin' },
  { type: 'error', inputs: [], name: 'Access_WithdrawNotAllowed' },
  {
    type: 'error',
    inputs: [{ name: 'proposedAddress', internalType: 'address', type: 'address' }],
    name: 'Admin_InvalidUpgradeAddress',
  },
  { type: 'error', inputs: [], name: 'Admin_UnableToFinalizeNotOpenEdition' },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'ApprovalToCurrentOwner' },
  { type: 'error', inputs: [], name: 'ApproveToCaller' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'ExternalMetadataRenderer_CallFailed' },
  { type: 'error', inputs: [], name: 'MarketFilterDAOAddressNotSupportedForChain' },
  { type: 'error', inputs: [], name: 'MintFee_FundsSendFailure' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'Mint_SoldOut' },
  { type: 'error', inputs: [], name: 'ONLY_OWNER' },
  { type: 'error', inputs: [], name: 'ONLY_PENDING_OWNER' },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'OperatorNotAllowed',
  },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'Presale_Inactive' },
  { type: 'error', inputs: [], name: 'Presale_MerkleNotApproved' },
  { type: 'error', inputs: [], name: 'Presale_TooManyForAddress' },
  { type: 'error', inputs: [], name: 'Purchase_TooManyForAddress' },
  {
    type: 'error',
    inputs: [{ name: 'correctPrice', internalType: 'uint256', type: 'uint256' }],
    name: 'Purchase_WrongPrice',
  },
  { type: 'error', inputs: [], name: 'RemoteOperatorFilterRegistryCallFailed' },
  { type: 'error', inputs: [], name: 'Sale_Inactive' },
  {
    type: 'error',
    inputs: [{ name: 'maxRoyaltyBPS', internalType: 'uint16', type: 'uint16' }],
    name: 'Setup_RoyaltyPercentageTooHigh',
  },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'Withdraw_FundsSendFailure' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousAdmin', internalType: 'address', type: 'address', indexed: false },
      { name: 'newAdmin', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_fromTokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '_toTokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address', indexed: true }],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'source', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'FundsReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newAddress', internalType: 'address', type: 'address', indexed: true },
      { name: 'changedBy', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'FundsRecipientChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'withdrawnBy', internalType: 'address', type: 'address', indexed: true },
      { name: 'withdrawnTo', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'feeRecipient', internalType: 'address', type: 'address', indexed: false },
      { name: 'feeAmount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'FundsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'mintFeeAmount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'mintFeeRecipient', internalType: 'address', type: 'address', indexed: false },
      { name: 'success', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'MintFeePayout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'numberOfMints', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'OpenMintFinalized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'potentialNewOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnerCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'potentialNewOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnerPending',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'previousAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'newAdminRole', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'account', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'quantity', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'pricePerToken', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'firstPurchasedTokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Sale',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'changedBy', internalType: 'address', type: 'address', indexed: true }],
    name: 'SalesConfigChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'renderer',
        internalType: 'contract IMetadataRenderer',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'UpdatedMetadataRenderer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'implementation', internalType: 'address', type: 'address', indexed: true }],
    name: 'Upgraded',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINTER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'SALES_MANAGER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'adminMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'recipients', internalType: 'address[]', type: 'address[]' }],
    name: 'adminMintAirdrop',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'callMetadataRenderer',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: 'metadataRenderer', internalType: 'contract IMetadataRenderer', type: 'address' },
      { name: 'editionSize', internalType: 'uint64', type: 'uint64' },
      { name: 'royaltyBPS', internalType: 'uint16', type: 'uint16' },
      { name: 'fundsRecipient', internalType: 'address payable', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractVersion',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'factoryUpgradeGate',
    outputs: [{ name: '', internalType: 'contract IFactoryUpgradeGate', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'finalizeOpenEdition',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_contractName', internalType: 'string', type: 'string' },
      { name: '_contractSymbol', internalType: 'string', type: 'string' },
      { name: '_initialOwner', internalType: 'address', type: 'address' },
      { name: '_fundsRecipient', internalType: 'address payable', type: 'address' },
      { name: '_editionSize', internalType: 'uint64', type: 'uint64' },
      { name: '_royaltyBPS', internalType: 'uint16', type: 'uint16' },
      { name: '_setupCalls', internalType: 'bytes[]', type: 'bytes[]' },
      { name: '_metadataRenderer', internalType: 'contract IMetadataRenderer', type: 'address' },
      { name: '_metadataRendererInit', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'isAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nftOwner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'enable', internalType: 'bool', type: 'bool' }],
    name: 'manageMarketFilterDAOSubscription',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'marketFilterDAOAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'metadataRenderer',
    outputs: [{ name: '', internalType: 'contract IMetadataRenderer', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'minter', internalType: 'address', type: 'address' }],
    name: 'mintedPerAddress',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721Drop.AddressMintDetails',
        type: 'tuple',
        components: [
          { name: 'totalMints', internalType: 'uint256', type: 'uint256' },
          { name: 'presaleMints', internalType: 'uint256', type: 'uint256' },
          { name: 'publicMints', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'presaleMintsByAddress',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'purchase',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'maxQuantity', internalType: 'uint256', type: 'uint256' },
      { name: 'pricePerToken', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'purchasePresale',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '_salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'royaltyAmount', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'saleDetails',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721Drop.SaleDetails',
        type: 'tuple',
        components: [
          { name: 'publicSaleActive', internalType: 'bool', type: 'bool' },
          { name: 'presaleActive', internalType: 'bool', type: 'bool' },
          { name: 'publicSalePrice', internalType: 'uint256', type: 'uint256' },
          { name: 'publicSaleStart', internalType: 'uint64', type: 'uint64' },
          { name: 'publicSaleEnd', internalType: 'uint64', type: 'uint64' },
          { name: 'presaleStart', internalType: 'uint64', type: 'uint64' },
          { name: 'presaleEnd', internalType: 'uint64', type: 'uint64' },
          { name: 'presaleMerkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'maxSalePurchasePerAddress', internalType: 'uint256', type: 'uint256' },
          { name: 'totalMinted', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSupply', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'salesConfig',
    outputs: [
      { name: 'publicSalePrice', internalType: 'uint104', type: 'uint104' },
      { name: 'maxSalePurchasePerAddress', internalType: 'uint32', type: 'uint32' },
      { name: 'publicSaleStart', internalType: 'uint64', type: 'uint64' },
      { name: 'publicSaleEnd', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleStart', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleEnd', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleMerkleRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newRecipientAddress', internalType: 'address payable', type: 'address' }],
    name: 'setFundsRecipient',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'newRenderer', internalType: 'contract IMetadataRenderer', type: 'address' },
      { name: 'setupRenderer', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setMetadataRenderer',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'publicSalePrice', internalType: 'uint104', type: 'uint104' },
      { name: 'maxSalePurchasePerAddress', internalType: 'uint32', type: 'uint32' },
      { name: 'publicSaleStart', internalType: 'uint64', type: 'uint64' },
      { name: 'publicSaleEnd', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleStart', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleEnd', internalType: 'uint64', type: 'uint64' },
      { name: 'presaleMerkleRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setSaleConfiguration',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'args', internalType: 'bytes', type: 'bytes' }],
    name: 'updateMarketFilterSettings',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newImplementation', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'withdraw', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'zoraERC721TransferHelper',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'zoraFeeForAmount',
    outputs: [
      { name: 'recipient', internalType: 'address payable', type: 'address' },
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5Eb5bABCEFEa846b220C82f222F00Df95934F5f0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xf59ae75C5599876c0F56017BCCC90EcA15743C74)
 */
export const erc721DropAddress = {
  1: '0x5Eb5bABCEFEa846b220C82f222F00Df95934F5f0',
  5: '0xf59ae75C5599876c0F56017BCCC90EcA15743C74',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x5Eb5bABCEFEa846b220C82f222F00Df95934F5f0)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xf59ae75C5599876c0F56017BCCC90EcA15743C74)
 */
export const erc721DropConfig = { address: erc721DropAddress, abi: erc721DropABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EditionMetadataRenderer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x192ce8267CbaB9C3C477D61e85D7f0c5fE3B46Af)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2f5C21EF9DdFf9A1FE76a1c55dd5112fcf2EfD39)
 */
export const editionMetadataRendererABI = [
  { type: 'error', inputs: [], name: 'Access_OnlyAdmin' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'target', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'newDescription', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DescriptionUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'target', internalType: 'address', type: 'address', indexed: true },
      { name: 'description', internalType: 'string', type: 'string', indexed: false },
      { name: 'imageURI', internalType: 'string', type: 'string', indexed: false },
      { name: 'animationURI', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'EditionInitialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'target', internalType: 'address', type: 'address', indexed: true },
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'imageURI', internalType: 'string', type: 'string', indexed: false },
      { name: 'animationURI', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'MediaURIsUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'initializeWithData',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'tokenInfos',
    outputs: [
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'imageURI', internalType: 'string', type: 'string' },
      { name: 'animationURI', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'newDescription', internalType: 'string', type: 'string' },
    ],
    name: 'updateDescription',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'imageURI', internalType: 'string', type: 'string' },
      { name: 'animationURI', internalType: 'string', type: 'string' },
    ],
    name: 'updateMediaURIs',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x192ce8267CbaB9C3C477D61e85D7f0c5fE3B46Af)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2f5C21EF9DdFf9A1FE76a1c55dd5112fcf2EfD39)
 */
export const editionMetadataRendererAddress = {
  1: '0x192ce8267CbaB9C3C477D61e85D7f0c5fE3B46Af',
  5: '0x2f5C21EF9DdFf9A1FE76a1c55dd5112fcf2EfD39',
} as const

/**
 * - [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x192ce8267CbaB9C3C477D61e85D7f0c5fE3B46Af)
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x2f5C21EF9DdFf9A1FE76a1c55dd5112fcf2EfD39)
 */
export const editionMetadataRendererConfig = {
  address: editionMetadataRendererAddress,
  abi: editionMetadataRendererABI,
} as const
