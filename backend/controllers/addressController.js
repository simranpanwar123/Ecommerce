import Address from "../models/Address.js";

export const saveAddress = async (req, res) => {
    try{
        const address = await Address.create(req.body);
        res.json({ message: "Address saved successfully", address }); 
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export const getAddress = async (req, res) => {
    try{
        const { userId } = req.params;
        const address = await Address.findOne({ userId });
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.json(address);
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
