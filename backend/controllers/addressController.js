import Address from "../models/Address.js";


// Add Address
export const saveAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);

        res.status(201).json({
            message: "Address saved successfully",
            address
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get User Addresses
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        const addresses = await Address.find({ userId })
            .sort({ createdAt: -1 });


        if (!addresses.length) {
            return res.status(404).json({
                message: "No address found"
            });
        }


        res.status(200).json(addresses);


    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};