import User from "../model/userModel.js";

// add an item+size to the user's cart (stored on the User document)
export const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        // cart is a nested object: { [itemId]: { [size]: quantity } }
        let cartData = user.cartData || {};

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.status(201).json({ message: "Added to cart" });
    } catch (error) {
        console.log("addToCart error", error);
        return res.status(500).json({ message: "Failed to add to cart" });
    }
};

// update quantity of a specific item+size
export const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body;
        const user = await User.findById(req.userId);
        let cartData = user.cartData;

        cartData[itemId][size] = quantity;

        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.status(200).json({ message: "Cart updated" });
    } catch (error) {
        console.log("updateCart error", error);
        return res.status(500).json({ message: "Failed to update cart" });
    }
};

// return the user's full cart object
export const getUserCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        return res.status(200).json(user.cartData);
    } catch (error) {
        console.log("getUserCart error", error);
        return res.status(500).json({ message: "Failed to get cart" });
    }
};
