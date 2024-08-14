//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    event ShipmentCreated(
        address indexed sender,
        address indexed to,
        uint256 pickupTime,
        uint256 distance,
        uint256 price
    );
    event ShipmentTransit(
        address indexed sender,
        address indexed receiver,
        uint256 pickupTime
    );
    event ShipmentDelivered(
        address indexed sender,
        address indexed to,
        uint256 indexed deliveryTime
    );
    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );
    enum ShipmentStatus {
        Pending,
        In_Transit,
        Completed
    }
    enum qualityChecked {
        Upto_The_Mark,
        Product_Missing,
        Needs_Improvement,
        Damaged,
        Rework_Required
    }
    struct Shipment {
        // This will be used to store data on the blokkchain
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }
    mapping(address => Shipment[]) public shipmentsArr;
    uint256 public shipmentCount;

    struct TypeShipment {
        // This will be used to store data on the blokkchain
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }
    TypeShipment[] typeShipments;

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        // This function is there to notify that the product is ready for shipment
        address receiver,
        uint256 pickupTime,
        uint256 price,
        uint256 distance
    ) public payable {
        require(
            msg.value == price,
            "Payment Amount must Match the Delivery amount"
        );
        Shipment memory shipment = Shipment(
            msg.sender,
            receiver,
            pickupTime,
            0,
            distance,
            price,
            ShipmentStatus.Pending,
            false
        );
        shipmentsArr[msg.sender].push(shipment);
        shipmentCount++;
        typeShipments.push(
            TypeShipment(
                msg.sender,
                receiver,
                pickupTime,
                0,
                distance,
                price,
                ShipmentStatus.Pending,
                false
            )
        );
        emit ShipmentCreated(msg.sender, receiver, pickupTime, distance, price);
    }

    function startShipment(
        address receiver,
        uint256 index,
        address sender
    ) public {
        Shipment storage shipment = shipmentsArr[sender][index];
        TypeShipment storage typeShipment = typeShipments[index];
        require(shipment.receiver == receiver, "Invalid Receiver");
        require(
            shipment.status == ShipmentStatus.Pending,
            "Shipment already in Transit"
        );
        shipment.status = ShipmentStatus.In_Transit;
        typeShipment.status = ShipmentStatus.In_Transit;
        emit ShipmentTransit(sender, receiver, shipment.pickupTime);
    }

    function completeShipment(
        address sender,
        address receiver,
        uint256 index
    ) public {
        Shipment storage shipment = shipmentsArr[sender][index];
        TypeShipment storage typeShipment = typeShipments[index];
        require(shipment.receiver == receiver, "Invalid Receiver");
        require(
            shipment.status == ShipmentStatus.In_Transit,
            "Shipment not in Transit"
        );
        require(!shipment.isPaid, "Shipment already paid");
        shipment.status = ShipmentStatus.Completed;
        typeShipment.status = ShipmentStatus.Completed;
        shipment.deliveryTime = block.timestamp;
        typeShipment.deliveryTime = block.timestamp;
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);
        shipment.isPaid = true;
        typeShipment.isPaid = true;
        emit ShipmentDelivered(sender, receiver, block.timestamp);
        emit ShipmentPaid(sender, receiver, amount);
    }

    function getShipment(
        address sender,
        uint256 index
    )
        public
        view
        returns (
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            ShipmentStatus,
            bool
        )
    {
        Shipment memory shipment = shipmentsArr[sender][index];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.price,
            shipment.distance,
            shipment.status,
            shipment.isPaid
        );
    }

    function getShipmentsCount(address sender) public view returns (uint256) {
        return shipmentsArr[sender].length;
    }

    function getAllTransactions() public view returns (TypeShipment[] memory) {
        // because we are returning the data inside the function
        return typeShipments;
    }
}
