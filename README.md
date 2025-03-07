#  Supply Chain Tracking App 

## 📌 Overview  
The **Supply Chain Tracking App** leverages **blockchain technology** to ensure **transparent, tamper-proof** tracking of shipments. It provides **real-time updates** on shipments, stores data on-chain, and offers a **decentralized** way to verify transactions.  

## 🛠️ Tech Stack  
- **Frontend:** Next.js (React, Tailwind CSS)  
- **Smart Contracts:** Solidity (Ethereum)
- **Blockchain Interaction:** Ethers.js, web3Modal 
- **Wallet Integration:** MetaMask 

---

## ✨ Features  
✅ **Immutable Record Keeping:** Shipment data is stored on-chain, preventing manipulation.  
✅ **Real-Time Updates:** Users can track shipments at different checkpoints.  
✅ **Decentralized Verification:** Blockchain ensures trust and authenticity.  

---

## 🔧 Installation & Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Devanshgoel-123/SupplyChain-Web3.git
cd backend
```

### **2️⃣ Install Dependencies**  
```sh
npm install   # or yarn install
```

### **3️⃣ Deploy Smart Contracts**  
1. Ensure you have **Node.js (v18+)** and **Hardhat** installed:  
   ```sh
   npm install -g hardhat
   ```
2. Set up environment variables:  
   Create a `.env` file and add:  
   ```
   PRIVATE_KEY=your_wallet_private_key
   ```
3. Compile and deploy the smart contract:  
   ```sh
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network sepolia
   ```
4. Copy the deployed **contract address** into the frontend `.env` file.

---

## 🏗️ Project Structure  
```bash
├── 📂 supplychain-app (Next.js App)
│   ├── 📂 components 
│   ├── 📂 pages
│   ├── 📜 package.json
│   └── 📜 .env
├── 📂 backend 
│   ├── 📂 contracts
│   │   ├── Tracking.sol # Smart Contract
│   ├── 📂 scripts # Deployment & Test Scripts
│   ├── 📜 hardhat.config.js
│   └── 📜 .env
└── 📜 README.md
```

## 🚀 Running the Project  

### **1️⃣ Start the Next.js App**  
```sh
cd frontend
npm run dev  # or yarn dev
```

### **2️⃣ Interacting with Blockchain**  
- Connect MetaMask.  
- Create a shipment.  
- Track and mark it as delivered.  

## 📜 Future Enhancements  
🚀 **AI-Powered Predictive Logistics:** Predict shipment delays using AI models.  
🚀 **NFT-Based Ownership Transfers:** Convert shipments into tradeable NFTs.  
🚀 **Cross-Chain Tracking:** Use LayerZero to track shipments across multiple blockchains.  

---

## 📄 License  
This project is licensed under the **MIT License**.  

---
