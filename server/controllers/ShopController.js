import Shop from "../models/Shop.js";

export const createShop = async (req, res) => {

    const newShop = new Shop(req.body);

    try {
        await newShop.save();
        res.status(201).json(newShop);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        res.status(200).json(shops);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateShop = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body; // Assuming req.body contains the fields to update

        // Log the received file data
        console.log("Received file:", req.file);

        // If a file is uploaded, add its path to updateData
        if (req.file) {
            console.log("File path:", req.file.path);
            // Remove the 'public/assets/' prefix from the file path
            updateData.picturePath = req.file.path.replace('public/assets/', '');
        }
        
        // Log the updateData to verify its content
        console.log("Update data:", updateData);

        // Update the category with the given ID
        const updatedShop = await Shop.findByIdAndUpdate(id, updateData, { new: true });
       
        if (!updatedShop) {
            return res.status(404).json({ success: false, error: "Shop not found." });
        }

        return res.status(200).json({ success: true, data: updatedShop });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};






export const deleteShop = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShop = await Shop.findByIdAndDelete(id);
        if (!deletedShop) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getShopById = async (req, res) => {
    const { id } = req.params;

    try {
        const shop = await Shop.findById(id);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.status(200).json(shop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Method to approve shop
export const approveShop = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
        
        if (!shop) {
            return res.status(404).json({ success: false, error: "Shop not found." });
        }

        return res.status(200).json({ success: true, data: shop });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

// Method to reject shop
export const rejectShop = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await Shop.findByIdAndUpdate(id, { status: 'refused' }, { new: true });
        
        if (!shop) {
            return res.status(404).json({ success: false, error: "Shop not found." });
        }

        return res.status(200).json({ success: true, data: shop });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

