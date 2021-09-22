import { useState, useEffect } from "react";

import Navbar from "./components/UI/Navbar";
import Body from "./components/UI/Body";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyLoans from "./components/Loan/MyLoans";
import Admin from "./components/Admin/Admin";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import monyaraAbi from "./contracts/monyara.abi.json";
import IERC20 from "./contracts/IERC.abi.json";
import { captureRejections } from "events";

const ERC20_DECIMALS = 18;

const monyaraContractAddress = "0xb68dF09062c055ff163645c428dcfc05b46812Cb";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [usdBalance, setUsdBalance] = useState(0);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [loans, setLoans] = useState([]);
  const [myLoans, setMyLoans] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  // UseEffects
  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      return getUSDBalance();
    } else {
      console.log("no kit or address");
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      isUserAdmin();
      getLoans();
    }
  }, [contract]);

  const connectWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        // notificationOff()
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log("There is an error");
        console.log({ error });
      }
    } else {
      console.log("please install the extension");
    }
  };

  const getUSDBalance = async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      console.log(USDBalance);
      const contract = new kit.web3.eth.Contract(
        monyaraAbi,
        monyaraContractAddress
      );
      setcontract(contract);
      setUsdBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (
    _name,
    _address,
    _occupation,
    _purpose,
    _nin,
    _amount,
    _duration
  ) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC20, cUSDContractAddress);
    try {
      const loanRegistrationAmount = new BigNumber(1)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(monyaraContractAddress, loanRegistrationAmount)
        .send({ from: address });

      // call the function to submit the loan for verification
      await contract.methods
        .submitLoan(
          _name,
          _address,
          _occupation,
          _purpose,
          _nin,
          _amount,
          _duration
        )
        .send({ from: address });
      getLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const getLoans = async () => {
    try {
      const loanLength = await contract.methods.getLoanLength().call();
      const _loans = [];

      for (let index = 0; index < loanLength; index++) {
        let _loan = new Promise(async (resolve, reject) => {
          try {
            let loan = await contract.methods.getLoans(index).call();
            resolve({
              index: index,
              borrowerAddress: loan[0],
              name: loan[1],
              borrowerHomeAddress: loan[2],
              occupation: loan[3],
              purpose: loan[4],
              nationalId: loan[5],
              verification: loan[6],
              amount: loan[7],
              loanTenure: loan[8],
              isPaid: loan[9],
              timestamp: loan[10],
            });
          } catch (error) {
            console.log("User is not Admin");
          }
        });
        _loans.push(_loan);
      }
      const loans = await Promise.all(_loans);
      const _myLoans = loans.filter((loan) => loan.borrowerAddress === address);
      console.log(loans);
      setLoans(loans);
      setMyLoans(_myLoans);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserAdmin = async () => {
    try {
      const isAdmin = await contract.methods.isUserAdmin(address).call();
      setIsAdmin(isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyLoan = async (loan) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC20, cUSDContractAddress);
    const loanAmount = new BigNumber(loan.amount)
      .shiftedBy(ERC20_DECIMALS)
      .toString();
    try {
      await cUSDContract.methods
        .approve(monyaraContractAddress, loanAmount)
        .send({ from: address });
      await contract.methods
        .verifyApplicant(loan.index)
        .send({ from: address });
      getLoans();
    } catch (error) {
      console.log(error);
    }
  };
  const unverifyLoan = async (loan) => {
    try {
      await contract.methods
        .unVerifyApplicant(loan.index)
        .send({ from: address });
      getLoans();
    } catch (error) {
      console.log(error);
    }
  };

  const redeemLoan = async (loan) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(
        IERC20,
        cUSDContractAddress
      );
      const amount = parseInt(loan.amount);
      const loanAmount = new BigNumber((10 / 100) * amount + amount)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(monyaraContractAddress, loanAmount)
        .send({ from: address });
      await contract.methods.reedem(loan.index).send({ from: address });
      getLoans();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <Navbar isAdmin={isAdmin} usdBalance={usdBalance} />
      <Switch>
        <Route exact path="/">
          <Body submitForm={submitForm} />
        </Route>
        <Route path="/my-loans">
          <MyLoans
            myLoans={myLoans}
            redeemLoan={redeemLoan}
            address={address}
          />
        </Route>
        <Route path="/admin">
          {isAdmin && (
            <Admin
              verifyLoan={verifyLoan}
              unverifyLoan={unverifyLoan}
              loans={loans}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
