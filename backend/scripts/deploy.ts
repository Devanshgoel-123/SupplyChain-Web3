import { ethers } from "hardhat";

async function main() {
    const Tracking = await ethers.deployContract("Tracking");
    await Tracking.waitForDeployment();// Wait for deployment to complete
    console.log("Tracking Contract deployed to:"+Tracking.target);
}

// Run the script and handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error); // Use console.error for errors
        process.exit(1);
    });
