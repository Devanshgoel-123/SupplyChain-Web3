//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Tracking {
    event ShipmentCreated(
        address indexed sender,
        address indexed to,
        uint256 pickupTime,
        uint256 distance,
        uint256 price,
        string orderInfo
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
        string orderInfo;
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
        string orderInfo;
    }
    TypeShipment[] typeShipments;

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address sender,
        uint256 pickupTime,
        uint256 price,
        uint256 distance,
        string memory orderInfo
    ) public payable {
        require(
            msg.value == price,
            "Payment Amount must Match the Delivery amount"
        );
        Shipment memory shipment = Shipment(
            sender,
            msg.sender,
            pickupTime,
            0,
            distance,
            price,
            ShipmentStatus.Pending,
            false,
            orderInfo
        );
        shipmentsArr[sender].push(shipment);
        shipmentCount++;
        typeShipments.push(
            TypeShipment(
                sender,
                msg.sender,
                pickupTime,
                0,
                distance,
                price,
                ShipmentStatus.Pending,
                false,
                orderInfo
            )
        );
        emit ShipmentCreated(
            msg.sender,
            sender,
            pickupTime,
            distance,
            price,
            orderInfo
        );
    }

    function startShipment(
        address receiver,
        uint256 index,
        address sender
    ) public {
        Shipment storage shipment = shipmentsArr[sender][index - 1];
        TypeShipment storage typeShipment = typeShipments[index - 1];
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
            bool,
            string memory
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
            shipment.isPaid,
            shipment.orderInfo
        );
    }

    function getShipmentsCount(address sender) public view returns (uint256) {
        return shipmentsArr[sender].length;
    }

    function getAllTransactions() public view returns (TypeShipment[] memory) {
        require(typeShipments.length > 0, "No shipments available.");
        return typeShipments;
    }
}
