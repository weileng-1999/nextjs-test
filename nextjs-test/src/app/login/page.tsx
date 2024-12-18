'use client'; // For client-side state handling
import { useState } from "react";
import axios from 'axios';
import crypto from "crypto"; // For password hashing (or install bcryptjs)
import Navbar from '../Components/Navbar';  // Import the Navbar component

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

  // get transaction history
 const handleTransactionHistory = async () => {
   
   try {
    const response = await axios.get("/api/transaction-history");

      if (response.status === 200) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <div>
     {!loggedIn && <Navbar />}
      <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>

          {step === 1 && (
            <div>
              <h2>Enter Username</h2>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleUsernameSubmit}>Submit</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Secure Word</h2>
              <p>Your secure word: <strong>{secureWord}</strong></p>
              <button onClick={() => setStep(3)}>Next</button>
            </div>
          )}

        {step === 3 && (
          <div>
            <h2>Enter Password</h2>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}

        {step === 4 && loggedIn && 
           <div>
           <h2>Transaction History</h2>
           {transactions.length > 0 ? (
             <ul>
               {transactions.map((transaction) => (
                 <li key={transaction.id}>
                   <p><strong>Date:</strong> {transaction.date}</p>
                   <p><strong>Amount:</strong> ${transaction.amount}</p>
                   <p><strong>Description:</strong> {transaction.description}</p>
                 </li>
               ))}
             </ul>
           ) : (
             <p>No transactions found.</p>
           )}
         </div>
        }
      </div>
    </div>
  );
};

export default Login;