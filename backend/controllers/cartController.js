import Cart from "../models/Cart.js";

// add items to crt

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        } else {

            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        const updatedCart = await Cart.findOne({ userId })
            .populate("items.productId");

        res.status(200).json(updatedCart);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// remove items from cart

export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );

        await cart.save();
        const updatedCart = await Cart.findOne({ userId })
            .populate("items.productId");

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// update item quantity in cart

export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        item.quantity = quantity;

        await cart.save();
        const updatedCart = await Cart.findOne({ userId })
            .populate("items.productId");

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
// get cart items by userid

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
// export const getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const cart = await Cart.findOne({ userId })
//       .populate("items.productId");

//     console.log(JSON.stringify(cart, null, 2)); // <-- Add this

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };