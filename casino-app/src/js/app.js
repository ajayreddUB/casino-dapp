// App = {
//   web3: null,
//   contracts: {},
//   // address: "0x4Fea45A08783A32997e358e2286fb51DFFd06a79",
//   address: "0x673205d07C8c6C9e48fFEcED3ba05711fBB4f25b",
//   names: new Array(),
//   url: "http://127.0.0.1:7545",
//   chairPerson: null,
//   currentAccount: null,

//   init: function () {
//     $.getJSON("../proposals.json", function (data) {
//       var proposalsRow = $("#proposalsRow");
//       var proposalTemplate = $("#proposalTemplate");

//       for (i = 0; i < data.length; i++) {
//         proposalTemplate.find(".card-title").text(data[i].name);
//         proposalTemplate.find("img").attr("src", data[i].picture);
//         proposalTemplate.find(".btn-vote").attr("data-id", data[i].id);

//         proposalsRow.append(proposalTemplate.html());
//         App.names.push(data[i].name);
//       }
//     });
//     return App.initWeb3();
//   },

//   initWeb3: function () {
//     if (typeof web3 !== "undefined") {
//       App.web3 = new Web3(Web3.givenProvider);
//     } else {
//       App.web3 = new Web3(App.url);
//     }
//     ethereum.request({ method: "eth_requestAccounts" });

//     App.populateAddress();
//     return App.initContract();
//   },

//   initContract: function () {
//     App.contracts.Casino = new App.web3.eth.Contract(App.abi, App.address, {});
//     return App.bindEvents();
//   },

//   bindEvents: function () {
//     $(document).on("click", ".btn-vote", App.handleVote);
//     $(document).on("click", "#win-count", App.handleWinner);
//     $(document).on("click", "#register", App.handleRegister);
//   },

//   populateAddress: async function () {
//     const userAccounts = await App.web3.eth.getAccounts();
//     App.handler = userAccounts[0];
//     document.getElementById("currentUserAddress").innerText =
//           "Current User Address: " + App.handler;

//     // new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts(
//     //   (err, accounts) => {
//     //     document.getElementById("currentUserAddress").innerText =
//     //       "Current User Address: " + App.handler;
//     //     jQuery("#enter_address").empty();
//     //     for (let i = 0; i < accounts.length; i++) {
//     //       if (App.handler != accounts[i]) {
//     //         var optionElement =
//     //           '<option value="' + accounts[i] + '">' + accounts[i] + "</option";
//     //         jQuery("#enter_address").append(optionElement);
//     //       }
//     //     }
//     //   }
//     // );
//   },

//   handleRegister: function () {
//     var option = { from: App.handler };
//     App.contracts.Casino.methods
//       .register()
//       .send(option)
//       .on("receipt", (receipt) => {
//         toastr.success("Success! Address: " + App.handler + " has been registered.");
//       })
//       .on("error", (err) => {
//         toastr.error(App.getErrorMessage(err), "Reverted!");
//       });
//   },

//   handleVote: function (event) {
//     event.preventDefault();
//     var proposalId = parseInt($(event.target).data("id"));

//     var option = { from: App.handler };
//     App.contracts.Casino.methods
//       .vote(proposalId)
//       .send(option)
//       .on("receipt", (receipt) => {
//         toastr.success("Success! Vote has been casted.");
//       })
//       .on("error", (err) => {
//         toastr.error(App.getErrorMessage(err), "Reverted!");
//       });
//   },

//   handleWinner: function () {
//     App.contracts.Casino.methods
//       .reqWinner()
//       .call()
//       .then((winner) => {
//         toastr.success(App.names[winner] + " is the winner!");
//       })
//       .catch((err) => {
//         toastr.error(
//           "A proposal must have greater than 2 votes to be declared as winner.",
//           "Error insufficient votes!"
//         );
//       });
//   },

//   getErrorMessage: function (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     let errorReason = "";

//     if (errorCode === 4001) {
//       return "User rejected the request!";
//     } else if (
//       errorMessage.includes("Access Denied: user is not the chairperson!")
//     ) {
//       return "Access Denied: user is not the chairperson!";
//     } else if (errorMessage.includes("Access Denied: Not a Registered Voter")) {
//       return "Access Denied: Not a Registered Voter!";
//     } else if (
//       errorMessage.includes("Vote Denied: This user has already casted a vote!")
//     ) {
//       return "Vote Denied: This user has already casted a vote!";
//     } else if (
//       errorMessage.includes(
//         "Invalid Vote: The vote proposal entered is invalid!"
//       )
//     ) {
//       return "Invalid Vote: The vote proposal entered is invalid!";
//     } 
//     else if (
//       errorMessage.includes(
//         "Access Denied: User has been registered already!"
//       )
//     ) {
//       return "Access Denied: User has been registered already!";
//     }else {
//       return "Unexpected Error!";
//     }
//   },

//   abi: [
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "numProposals",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "register",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "reqWinner",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "winningProposal",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "toProposal",
//           "type": "uint256"
//         }
//       ],
//       "name": "vote",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ],
// };

// $(function () {
//   $(window).load(function () {
//     App.init();
//     toastr.options = {
//       closeButton: true,
//       debug: false,
//       newestOnTop: false,
//       progressBar: false,
//       positionClass: "toast-bottom-full-width",
//       preventDuplicates: false,
//       onclick: null,
//       showDuration: "300",
//       hideDuration: "1000",
//       timeOut: "5000",
//       extendedTimeOut: "1000",
//       showEasing: "swing",
//       hideEasing: "linear",
//       showMethod: "fadeIn",
//       hideMethod: "fadeOut",
//     };
//   });
// });

// /* Detect when the account on metamask is changed */
// window.ethereum.on("accountsChanged", () => {
//   App.populateAddress();
// });

// /* Detect when the network on metamask is changed */
// window.ethereum.on("chainChanged", () => {
//   App.populateAddress();
// });
const contractAddress = '0xCE305195b1477dB99bc02254B14eeB427e8D40F9';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialsuppy",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
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
			}
		],
		"name": "ERC20InsufficientBalance",
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
		"name": "ERC20InvalidApprover",
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
		"name": "ERC20InvalidReceiver",
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
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
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
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
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
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
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
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
		"inputs": [],
		"name": "withdrawETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
		"stateMutability": "payable",
		"type": "receive"
	}
];

let contract;
let userAccount;

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        console.log('Metamask not found. Install or enable Metamask.');
    }
});

document.getElementById('connectWallet').onclick = async function() {
  try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      console.log(`Connected with: ${userAccount}`);
  } catch (error) {
      console.error("Error connecting to MetaMask:", error);
  }
};

document.getElementById('buyTokens').onclick = async function() {
    const ethAmount = document.getElementById('ethAmount').value;
    await contract.methods.buyTokens().send({ from: userAccount, value: web3.utils.toWei(ethAmount, 'ether') });
};

document.getElementById('withdrawTokens').onclick = async function() {
    const tokenAmount = document.getElementById('tokenWithdrawAmount').value;
    await contract.methods.withdrawTokens(tokenAmount).send({ from: userAccount });
};

document.getElementById('transferTokens').onclick = async function() {
    const tokenAmount = document.getElementById('tokenTransferAmount').value;
    const recipient = document.getElementById('recipientAddress').value;
    await contract.methods.transferTokens(recipient, tokenAmount).send({ from: userAccount });
};

document.getElementById('withdrawETH').onclick = async function() {
    await contract.methods.withdrawETH().send({ from: userAccount });
};


