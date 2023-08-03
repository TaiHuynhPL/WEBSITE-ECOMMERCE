const Order = require("../models/order");
const Product = require("../models/product");

const nodemailer = require("nodemailer");

exports.createOrder = async (req, res, next) => {
  const { customerInfo, products, totalValue, user } = req.body;
  try {
    const order = new Order({
      customerInfo: customerInfo,
      products: products,
      totalValue: totalValue,
      user: user,
    });
    await order.save();
    const productsArr = [];
    for (let i = 0; i < products.length; i++) {
      const product = await Product.findById(products[i].idProduct);
      productsArr.push(product);
    }
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    const convertPrice = (price) => {
      const newprice = new Intl.NumberFormat("vi-VN").format(price);
      return newprice;
    };

    const message = `<div style="background-color:black; color:white"}>
    <div style="margin-top: 32px;
    margin-left: 42px">
      <h1>Xin chào ${customerInfo.name}</h1>
      <p>Phone: ${customerInfo.phone}</p>
      <p>Address: ${customerInfo.address}</p>
      <table style=" width: 90%;
      margin-top: 24px;
      margin-bottom: 24px;
      color:white;">
      <tbody>
        <tr>
          <th style="border: 1px white solid;color:white;">Tên Sản Phẩm</th>
          <th style="border: 1px white solid;color:white;">Hình Ảnh</th>
          <th style="border: 1px white solid;color:white;">Giá</th>
          <th style="border: 1px white solid;color:white;">Số Lượng</th>
          <th style="border: 1px white solid;color:white;">Thành Tiền</th>
        </tr>
      ${productsArr?.map(
        (product, index) =>
          `<tr key={product._id}>
            <td style="border: 1px white solid;color:white;text-align: center;">${
              product.name
            }</td>
            <td style="border: 1px white solid;color:white;text-align: center;">
              <img
                src=${product.img1}
                alt=${product.name}
                style="width:42px"
              />
            </td>
            <td style="border: 1px white solid;color:white;text-align: center;">${convertPrice(
              product.price
            )} VND</td>
            <td style="border: 1px white solid;color:white;text-align: center;">${
              products[index].quantity
            }</td>
            <td style="border: 1px white solid;color:white;text-align: center;">${convertPrice(
              product.price * products[index].quantity
            )} VND</td>
          </tr>`
      )}
      </tbody>
    </table>
    <h3 style="color:white;">Tổng Thanh Toán:</h3>
    <h3 style="color:white;">${convertPrice(totalValue)} VND</h3>
    <h2 style="color:white;">Cảm ơn bạn!</h2>
  </div>
</div>
    `;

    await transporter.sendMail(
      {
        from: process.env.USER,
        to: customerInfo.email,
        subject: "Order succeeded",
        html: message,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrdersByUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Order.findById(id).populate("products.idProduct");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.find()
      .populate("user")
      .populate("products.idProduct")
      .sort({ createdAt: -1 });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateDelivery = async (req, res, next) => {
  const { id } = req.params;
  const { delivery } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { delivery: delivery },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {}
};

exports.updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {}
};
