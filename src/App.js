// src/App.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import HealthcareContract from "./contracts/Healthcare.json";
import TokenContract from "./contracts/Token.json";

const App = () => {
  const [account, setAccount] = useState("");
  const [healthcare, setHealthcare] = useState(null);
  const [token, setToken] = useState(null);
  const [patientData, setPatientData] = useState("");
  const [balance, setBalance] = useState(0);

  // Load Web3 and Contracts
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();

        // Load Healthcare Contract
        const healthcareData = HealthcareContract.networks[networkId];
        if (healthcareData) {
          const healthcareInstance = new web3.eth.Contract(
            HealthcareContract.abi,
            healthcareData.address
          );
          setHealthcare(healthcareInstance);
        } else {
          alert("Healthcare contract not deployed to the detected network.");
        }

        // Load Token Contract
        const tokenData = TokenContract.networks[networkId];
        if (tokenData) {
          const tokenInstance = new web3.eth.Contract(
            TokenContract.abi,
            tokenData.address
          );
          setToken(tokenInstance);
          const tokenBalance = await tokenInstance.methods.balanceOf(accounts[0]).call();
          setBalance(tokenBalance);
        } else {
          alert("Token contract not deployed to the detected network.");
        }
      } else {
        alert("Please install MetaMask to use this application.");
      }
    };

    loadBlockchainData();
  }, []);

  // Function to update patient data
  const updatePatientData = async () => {
    if (healthcare) {
      try {
        await healthcare.methods.updatePatientData(patientData).send({ from: account });
        alert("Patient data updated successfully!");
      } catch (error) {
        console.error("Error updating patient data:", error);
      }
    }
  };

  return (
    <div>
      <h1>Blockchain-Based Healthcare Application</h1>
      <p><strong>Account:</strong> {account}</p>
      <p><strong>Token Balance:</strong> {balance}</p>

      <div>
        <h2>Update Patient Data</h2>
        <input
          type="text"
          placeholder="Enter patient data"
          value={patientData}
          onChange={(e) => setPatientData(e.target.value)}
        />
        <button onClick={updatePatientData}>Submit</button>
      </div>
    </div>
  );
};

export default App;
