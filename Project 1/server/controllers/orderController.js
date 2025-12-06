
const Order = require("../models/Orders");

const placeOrder = async (req, res) => {
  try {
    const { userId, bookId, title, quantity, price, totalAmount, address } = req.body;

    // Create order with direct fields, no array
    const order = new Order({
      userId,
      bookId,
      title,
      quantity,
      price,
      totalAmount,
      address,
      orderDate: new Date(),
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days later
    });

  
    await order.save();

    return res.status(200).json({ msg: "Order placed", order });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


const myOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};


const orderController ={placeOrder,myOrders};
module.exports=orderController;
