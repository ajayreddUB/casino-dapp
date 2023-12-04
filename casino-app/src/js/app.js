const contractAddress = '0xD596a3b15fcb0422a0Daf2D73f19cF95aB546cBb';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_casinoChipAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_casinoNFTAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC1155InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC1155InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "idsLength",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "valuesLength",
				"type": "uint256"
			}
		],
		"name": "ERC1155InvalidArrayLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC1155InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC1155InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC1155InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC1155MissingApprovalForAll",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approveCasinoChip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ownerNFT",
				"type": "address"
			}
		],
		"name": "approveCasinoNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "erc20Amount",
				"type": "uint256"
			}
		],
		"name": "buyNFTWithERC20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "chosenNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userProvidedSeed",
				"type": "uint256"
			}
		],
		"name": "rollDice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "setPriceofNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFTWithETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			}
		],
		"name": "customSafeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
let contract;
let userAccount;

// Load the contract ABI and address asynchronously
// fetch('../abis/CasinoItems.json')
// 	.then(response => response.json())
// 	.then(data => {
// 		const contractABI = data.abi;
// 		const contractAddress = data.networks["11155111"].address;

// 		// Initialize web3 and the contract after fetching ABI and address
// 		if (typeof window.ethereum !== 'undefined') {
// 			window.web3 = new Web3(window.ethereum);
// 			contract = new web3.eth.Contract(contractABI, contractAddress);
// 		} else {
// 			console.log('Metamask not found. Install or enable Metamask.');
// 		}
// 	})
// 	.catch(error => console.error('Error loading ABI:', error));


// let contract;
// let userAccount;

window.addEventListener('load', function () {
	if (typeof window.ethereum !== 'undefined') {
		window.web3 = new Web3(window.ethereum);
		contract = new web3.eth.Contract(contractABI, contractAddress);
	} else {
		console.log('Metamask not found. Install or enable Metamask.');
	}
});
async function loadNFTs() {
	const NFT_ID_START = 2; // Starting ID for NFTs, adjust based on your contract
	const NFT_ID_END = 3 /* Some maximum ID, or you can fetch the current counter from CasinoNFT */;

	for (let i = NFT_ID_START; i <= NFT_ID_END; i++) {
		const balance = await contract.methods.balanceOf(userAccount, i).call();
		if (balance > 0) {
			const tokenURI = await contract.methods.uri(i).call();
			fetchNFTMetadata(tokenURI, i);
		}
	}
}
document.getElementById('approveCasinoChip').onclick = async function () {
	const amount = document.getElementById('chipAmount').value;
	await contract.methods.approveCasinoChip(web3.utils.toWei(amount, 'ether')).send({ from: userAccount });
};

document.getElementById('approveCasinoNFT').onclick = async function () {
	await contract.methods.approveCasinoNFT(userAccount).send({ from: userAccount });
};

async function getTokenURIForNFT(nftId) {
	// Implement this function based on how your contract stores or retrieves NFT URIs
	// This is just a placeholder
	return "https://example.com/nft/metadata/" + nftId;
}
async function fetchNFTMetadata(tokenURI, tokenId) {
	try {
		const response = await fetch(tokenURI);
		const metadata = await response.json();
		displayNFT(metadata.image, tokenId);
	} catch (error) {
		console.error("Error fetching NFT metadata:", error);
	}
}

function displayNFT(imageUrl, tokenId) {
	const nftGallery = document.getElementById('nftGallery');
	const imgElement = document.createElement('img');
	imgElement.src = imageUrl;
	imgElement.alt = `NFT Image ${tokenId}`;
	imgElement.style.width = '150px'; // Set the size as per your layout
	nftGallery.appendChild(imgElement);
}


document.getElementById('connectWallet').onclick = async function () {
	try {
		const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
		userAccount = accounts[0];
		console.log(`Connected with: ${userAccount}`);
		await loadNFTs();
	} catch (error) {
		console.error("Error connecting to MetaMask:", error);
	}
};
// document.getElementById('connectWallet').onclick = async function () {
// 	// Your existing logic for connecting wallet
// 	// Ensure contract is initialized before proceeding
// 	if (contract) {
// 		try {
// 			// Your existing logic
// 		} catch (error) {
// 			console.error("Error connecting to MetaMask:", error);
// 		}
// 	} else {
// 		console.log('Contract not initialized. Please wait or check your setup.');
// 	}
// };
document.getElementById('rollDice').onclick = async function () {
	const betAmount = document.getElementById('bet').value;
	const betNumber = document.getElementById('desiredOutcome').value;
	const seed = document.getElementById('seed').value;

	// Check balance before roll
	const initialBalance = await contract.methods.balanceOf(userAccount, 1).call();

	// Call rollDice function
	await contract.methods.rollDice(web3.utils.toWei(betAmount, 'ether'), betNumber, seed).send({ from: userAccount });

	// Wait for a few seconds to allow transaction to process
	setTimeout(async () => {
		// Check balance after roll
		const finalBalance = await contract.methods.balanceOf(userAccount, 1).call();

		// Compare balances to determine if user won
		if (finalBalance > initialBalance) {
			alert("You won!");
		} else {
			alert("Better luck next time!");
		}
	}, 10000); // Adjust the timeout as needed
};
document.getElementById('buyTokens').onclick = async function () {
	const ethAmount = document.getElementById('ethAmount').value;
	await contract.methods.buyTokens().send({ from: userAccount, value: web3.utils.toWei(ethAmount, 'ether') });
};

document.getElementById('withdrawTokens').onclick = async function () {
	const tokenAmount = document.getElementById('tokenWithdrawAmount').value;
	await contract.methods.withdrawTokens(web3.utils.toWei(tokenAmount, 'ether')).send({ from: userAccount });
};

document.getElementById('transferTokens').onclick = async function () {
	const tokenTrAmount = document.getElementById('tokenTransferAmount').value;
	const recipient = document.getElementById('recipientAddress').value;
	await contract.methods.transferTokens(web3.utils.toWei(recipient, 'ether'), web3.utils.toWei(tokenTrAmount, 'ether')).send({ from: userAccount });
};

document.getElementById('withdrawETH').onclick = async function () {
	await contract.methods.withdrawETH().send({ from: userAccount });
};


