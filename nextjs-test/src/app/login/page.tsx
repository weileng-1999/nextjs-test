'use client';
import { useState } from "react";
import axios from 'axios';
import crypto from "crypto";
import Navbar from '../Components/Navbar'; 

const Login = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Handle username submission
  const handleUsernameSubmit = async () => {
    try {
      const response = await axios.post("/api/getSecureWord", { username });
      setSecureWord(response.data.secureWord);
      setStep(2); // Move to Step 3
    } catch (error) {
      console.error("Error fetching secure word:", error);
    }
  };

  // Handle password submission
  const handleLogin = async () => {
    try {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex"); // Hash the password

      const response = await axios.post("/api/login", {
        username,
        encryptedPassword: hashedPassword,
      });

      if (response.status === 200) {
        alert("Login successful!");
        setLoggedIn(true);
        setStep(4);
        handleTransactionHistory();
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Get transaction history
  const handleTransactionHistory = async () => {
    try {
      const response = await axios.get("/api/transactionHistory");
      if (response.status === 200) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <div className="h-screen">
      {!loggedIn && <Navbar />}
      <div className="max-w-md w-full px-4 py-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Enter Username</h2>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={handleUsernameSubmit}
            >
              Submit
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Secure Word</h2>
            <p>Your secure word: <strong>{secureWord}</strong></p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Enter Password</h2>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        )}

        {step === 4 && loggedIn && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Reference ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.refId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.to}</div>
                    <div className="text-sm text-gray-500">Recipient references will go here...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      RM {transaction.amount.toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Login;