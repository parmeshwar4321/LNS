import twitterLogo from "../../assets/twitter-logo.svg";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAbi from "../../utils/DomainAbi.json";
import { networks } from "../../utils/networks";
// Constants
const TWITTER_HANDLE = "luvnft";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// Add the domain you will be minting
const tld = ".luv";
const CONTRACT_ADDRESS = "0x21eCE5879f17A9c0C4A3B2b3794A84C86DE81d04";

export default function Hero() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [domain, setDomain] = useState("");
  const [record, setRecord] = useState("");
  const [mints, setMints] = useState([]);
  const checkIfWalletIsConnected = async () => {
    // First make sure we have access to window.ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have MetaMask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    // Check if we&apos;re authorized to access the user&apos;s wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // Users can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    setNetwork(networks[chainId]);

    ethereum.on("chainChanged", handleChainChanged);

    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  // Implement your connectWallet method here
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      // Fancy method to request access to account.
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      // Boom! This should print out public address once we authorize Metamask.
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Polygon Mumbai Testnet",
                  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                  nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (error) {
            console.log(error);
          }
        }
        console.log(error);
      }
    } else {
      alert(
        "MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html"
      );
    }
  };

  const mintDomain = async () => {
    // Don&apos;t run if the domain is empty
    if (!domain) {
      return;
    }
    // Alert the user if the domain is too short
    if (domain.length < 3) {
      alert("Domain must be at least 3 characters long");
      return;
    }
    // Calculate price based on length of domain (change this to match your contract)
    // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
    const price =
      domain.length === 3 ? "0.5" : domain.length === 4 ? "0.3" : "0.1";
    console.log("Minting domain", domain, "with price", price);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let tx = await contract.register(domain, {
          value: ethers.utils.parseEther(price),
        });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();

        // Check if the transaction was successfully completed
        if (receipt.status === 1) {
          console.log(
            "Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          // Set the record for the domain
          tx = await contract.setRecord(domain, record);
          await tx.wait();

          console.log(
            "Record set! https://mumbai.polygonscan.com/tx/" + tx.hash
          );

          setRecord("");
          setDomain("");
        } else {
          alert("Transaction failed! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create a function to render if wallet is not connected yet
  const renderNotConnectedContainer = () => (
    <div className="sm:flex justify-center ">
      <button
        onClick={connectWallet}
        className="m-1 bg-[#cc43f5] hover:bg-grey text-grey-darkest font-bold py-3 px-6 rounded inline-flex items-center"
      >
        <span className="ml-1 "> Connect Wallet</span>
      </button>
    </div>
  );
  // Form to enter domain name and data
  const renderInputForm = () => {
    if (network !== "Polygon Mumbai Testnet") {
      return (
        <div className="connect-wallet-container">
          <h2>Please switch to Polygon Mumbai Testnet</h2>
          <button className="cta-button mint-button" onClick={switchNetwork}>
            Click here to switch
          </button>
        </div>
      );
    }
    return (
      <div className="container px-5 py-24 mx-auto font-bold flex">
        <div className="bg-[hsla(0,0%,100%,.1)] bg-opacity-75 rounded-lg p-8 flex flex-col md:ml-auto w-full shadow-md">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="py-2 text-lg text-white bg-zinc-900 rounded-md pl-14 focus:outline-none focus:bg-zinc-600 focus:text-white-900 w-full"
            />
            <p className="tld"> {tld} </p>
          </div>
          <input
            type="text"
            value={record}
            placeholder=" Your .luv name motto"
            onChange={(e) => setRecord(e.target.value)}
            className="py-2 text-lg text-white bg-zinc-900 rounded-md pl-14 focus:outline-none focus:bg-zinc-600 focus:text-white-900 w-full"
          />

          {editing ? (
            <div className="">
              <button
                className="bg-[#68E099]  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={loading}
                onClick={updateDomain}
              >
                Set record
              </button>
              <button
                className="bg-[#68E099]  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={() => {
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="bg-[#68E099]  border-0 py-2 px-6 focus:outline-none rounded text-lg"
              disabled={loading}
              onClick={mintDomain}
            >
              MINT
            </button>
          )}
        </div>
      </div>
    );
  };
  const updateDomain = async () => {
    if (!record || !domain) {
      return;
    }
    setLoading(true);
    console.log("Updating domain", domain, "with record", record);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );

        let tx = await contract.setRecord(domain, record);
        await tx.wait();
        console.log("Record set https://mumbai.polygonscan.com/tx/" + tx.hash);

        fetchMints();
        setRecord("");
        setDomain("");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const editRecord = (name) => {
    console.log("Editing record for", name);
    setEditing(true);
    setDomain(name);
  };
  const fetchMints = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractAbi.abi,
          signer
        );

        const names = await contract.getAllNames();
        console.log(names);

        const mintRecords = await Promise.all(
          names.map(async (name) => {
            const mintRecord = await contract.records(name);
            const owner = await contract.domains(name);
            return {
              id: names.indexOf(name),
              name: name,
              record: mintRecord,
              owner: owner,
            };
          })
        );

        console.log("MINTS FETCHED ", mintRecords);
        setMints(mintRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderMints = () => {
    if (currentAccount && mints.length > 0) {
      return (
        <div className="container">
          <p className="mb-8 leading-relaxed">Recently minted domains!</p>
          <div className="mint-list">
            {mints.map((mint, index) => {
              return (
                <div className="mint-item" key={index}>
                  <div className="mint-row">
                    <a
                      className="link"
                      href={`https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${mint.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="mb-8 leading-relaxed">
                        {mint.name}
                        {tld}{" "}
                      </span>
                    </a>
                    {mint.owner.toLowerCase() ===
                    currentAccount.toLowerCase() ? (
                      <button
                        className="edit-button"
                        onClick={() => editRecord(mint.name)}
                      >
                        <img
                          className="edit-icon"
                          src="https://img.icons8.com/metro/26/000000/pencil.png"
                          alt="Edit button"
                        />
                      </button>
                    ) : null}
                  </div>
                  <p> {mint.record} </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  // This runs our function when the page loads.
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (network === "Polygon Mumbai Testnet") {
      fetchMints();
    }
  }, [currentAccount, network]);

  return (
    <section className="text-white body-font">
      <div className="container mx-auto flex px-5 py-16 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <div>
            <h1 className="title-font sm:text-7xl text-5xl font-bold mb-4 font-medium font-['Archivo']">
              Blockchain <s>ownership</s> <br />
              own-ya-shit starts by owning your
              <span className="text-[#cc43f5] font-serif"> Polygon </span>
              .luv name
            </h1>
            <p className="mb-8 leading-relaxed font-['Poppins'] ">
              All the cool kids on social media have have .eth/.sol name
              domains. Here &apos;s how you can become cooler than them: by
              making your own .luv Polygon name domain! Your .luv domain is your
              all-in-one domain/hosting, banking and billing, online
              identification, user management, authentication and more.
            </p>
          </div>

          {!currentAccount && renderNotConnectedContainer()}
          <div className="container bg-[hsla(0,0%,100%,.1)] bg-opacity-75">
            {currentAccount && renderInputForm()}
            {mints && renderMints()}
          </div>

          <div className="container mx-auto flex px-5 py-16 items-center justify-center flex-col ">
            <h2 className="title-font text-4xl font-medium  font-bold	 text-white-900 mb-12 text-center tracking-wider font-['Archivo']">
              WHAT&apos;S YOUR .LUV NAME? IS THE NEW WHAT&apos;S YOUR CA$H APP NAME?
            </h2>
            <p className="mb-6 text-xm font-['Poppins']   font-medium">
              You need another Cash App user’s email, phone number or $Cashtag
              to send money with the fee of 3% of total amount you send. Cash
              App also charges you 1.5% (Minimum 25 cents, maximum $15 to send
              money instantly.
            </p>
            <p className="mb-6 text-xm font-['Poppins'] font-medium">
              All you need is another user’s .LUV name to send $MATIC or $LUV
              with the fee of .1 to send money instantly no matter the total
              amount.
            </p>
          </div>

          <div></div>
          <section className="text-gray-100 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="p-5 lg:w-1/3">
                  <div className="h-full bg-[hsla(0,0%,100%,.1)] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <div className="text-4xl mb-4">🧠📝</div>
                    <h1 className="font-['Archivo'] font-bold title-font sm:text-2xl text-xl font-medium mb-3">
                      Pick up Polygon: a secure, low-cost, eco-friendly chain.{" "}
                    </h1>
                    <p className="leading-relaxed mb-3 font-['Poppins'] ">
                      We&apos;ll be building on a &quot;Layer 2&quot; PoS chain
                      built on top of Ethereum on the Polygon protocol.
                      It&apos;s as secure as Ethereum, but with a way better UX!
                    </p>
                  </div>
                </div>
                <div className="p-4 lg:w-1/3">
                  <div className="h-full bg-[hsla(0,0%,100%,.1)] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <div className="text-4xl mb-4">✍️🏗</div>
                    <h1 className="font-['Archivo'] font-bold -font sm:text-2xl text-xl font-medium mb-3">
                      Build a dApp with React, Replit and Metamask.
                    </h1>
                    <p className="leading-relaxed mb-3 font-['Poppins'] ">
                      We&apos;ll do something magical: make a React application
                      that interacts with your smart contracts on the
                      blockchain. We&apos;ll cover storing and fetching data,
                      tracking transactions, and working with Metamask to change
                      networks.
                    </p>
                  </div>
                </div>
                <div className="p-4 lg:w-1/3">
                  <div className="h-full bg-[hsla(0,0%,100%,.1)] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                    <div className="text-4xl mb-4">💻🪢</div>
                    <h1 className="font-['Archivo'] font-bold title-font sm:text-2xl text-xl font-medium mb-3">
                      Let your friends come in and mint a domain to their
                      wallets.{" "}
                    </h1>
                    <p className="leading-relaxed mb-3 font-['Poppins'] ">
                      We&apos;re going to write some client-side code to connect
                      to our Ethereum wallet and call functions on our smart
                      contract.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
