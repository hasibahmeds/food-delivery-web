// every things work perfect but without ipn


// import SSLCommerzPayment from "sslcommerz-lts";
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// const store_id = process.env.SSL_STORE_ID;
// const store_passwd = process.env.SSL_STORE_PASSWORD;
// const is_live = false; 

// const DELIVERY_FEES = {
//   "Motijheel": 50,
//   "Shahbag": 40,
//   "Dhanmondi": 30,
//   "Farmgate": 30,
//   "Agargaon": 40,
//   "Mohammadpur": 50,
//   "Mirpur": 50,
//   "Gulshan": 60,
//   "Banani": 60,
//   "Uttara": 70
// };

// export const sslInit = async (req, res) => {
//   try {
//     const { amount, items, customer, address } = req.body;
//     const userId = req.body.userId || req.user?.id; 

//     if (!customer?.deliveryArea && !address?.deliveryArea) {
//       return res.status(400).json({ success: false, message: "Delivery area is required" });
//     }

//     const selectedArea = customer?.deliveryArea || address?.deliveryArea;
//     const expectedFee = DELIVERY_FEES[selectedArea] || 0;

//     const realSubtotal = items.reduce((sum, item) => {
//       return sum + (Number(item.price) * Number(item.quantity));
//     }, 0);

//     const expectedTotal = realSubtotal + expectedFee;

//     if (Math.abs(Number(amount) - expectedTotal) > 1) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid payment amount - delivery fee or subtotal mismatch"
//       });
//     }

//     const tran_id = "TXN_" + Date.now();


//     const addressMerged = {
//       fullName: customer?.fullName || address?.fullName || "",
//       email: customer?.email || address?.email || "",
//       phone: customer?.phone || address?.phone || "",
//       address: address?.address || customer?.address || "",
//       deliveryArea: selectedArea,
//     };


//     await orderModel.create({
//       userId,
//       items,
//       amount: expectedTotal,
//       address: addressMerged,
//       payment: false,
//       transactionId: tran_id,
//       paymentStatus: "pending"
//     });


//     const backend_url = process.env.BACKEND_URL || "http://localhost:4000";

//     const sslData = {
//       total_amount: expectedTotal,
//       currency: "BDT",
//       tran_id,
//       success_url: `${backend_url}/api/order/ssl-success`,
//       fail_url: `${backend_url}/api/order/ssl-fail`,
//       cancel_url: `${backend_url}/api/order/ssl-cancel`,
//       ipn_url: `${backend_url}/api/order/ssl-ipn`,
//       shipping_method: "NO",
//       product_name: items.map(i => i.name).join(", "),
//       product_category: "Food",
//       product_profile: "general",
//       cus_name: addressMerged.fullName || "Customer",
//       cus_email: addressMerged.email || "customer@email.com",
//       cus_phone: addressMerged.phone || "01700000000",
//       cus_add1: addressMerged.address || "Dhaka",
//       cus_city: addressMerged.deliveryArea || "Dhaka",
//     };

//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//     const apiResponse = await sslcz.init(sslData);

//     res.json(apiResponse);
//   } catch (error) {
//     console.error("SSL Init error:", error);
//     res.status(500).json({ success: false, message: "Payment initialization failed" });
//   }
// };



// export const sslSuccess = async (req, res) => {
//   try {
//     const { tran_id } = req.body || req.query;
//     const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

//     if (!tran_id) {
//        console.error("SSL Success: No transaction ID found");
//        return res.redirect(`${frontend_url}/myorders`);
//     }
    
//     const order = await orderModel.findOneAndUpdate(
//       { transactionId: tran_id },
//       { payment: true, paymentStatus: "success" },
//       { new: true }
//     );

//     if (order) {
//       await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
//     }

//     res.redirect(`${frontend_url}/myorders`);
//   } catch (error) {
//     console.error("SSL Success error:", error);
//     const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
//     res.redirect(`${frontend_url}/myorders`);
//   }
// };

// export const sslFail = async (req, res) => {
//   const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
//   res.redirect(`${frontend_url}/order`);
// };

// export const sslCancel = async (req, res) => {
//   const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
//   res.redirect(`${frontend_url}/order`);
// };




// every things work perfect but without ipn




import SSLCommerzPayment from "sslcommerz-lts";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWORD;
const is_live = false; // change to true in production

const DELIVERY_FEES = {
  "Motijheel": 50,
  "Shahbag": 40,
  "Dhanmondi": 30,
  "Farmgate": 30,
  "Agargaon": 40,
  "Mohammadpur": 50,
  "Mirpur": 50,
  "Gulshan": 60,
  "Banani": 60,
  "Uttara": 70
};

export const sslInit = async (req, res) => {
  try {
    const { amount, items, customer, address } = req.body;
    const userId = req.body.userId || req.user?.id; // depending on your auth

    if (!customer?.deliveryArea && !address?.deliveryArea) {
      return res.status(400).json({ success: false, message: "Delivery area is required" });
    }

    const selectedArea = customer?.deliveryArea || address?.deliveryArea;
    const expectedFee = DELIVERY_FEES[selectedArea] || 0;

    const realSubtotal = items.reduce((sum, item) => {
      return sum + (Number(item.price) * Number(item.quantity));
    }, 0);

    const expectedTotal = realSubtotal + expectedFee;

    if (Math.abs(Number(amount) - expectedTotal) > 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount - delivery fee or subtotal mismatch"
      });
    }

    const tran_id = "TXN_" + Date.now();

    // Merge address data
    const addressMerged = {
      fullName: customer?.fullName || address?.fullName || "",
      email: customer?.email || address?.email || "",
      phone: customer?.phone || address?.phone || "",
      address: address?.address || customer?.address || "",
      deliveryArea: selectedArea,
    };

    // Create pending order
    await orderModel.create({
      userId,
      items,
      amount: expectedTotal,
      address: addressMerged,
      payment: false,
      transactionId: tran_id,
      paymentStatus: "pending",
      paymentMethod: "Online Payment"
    });

    // Backend URL - Use local server for development callbacks
    // For Local Server: http://localhost:4000
    // For Live URL: https://your-live-backend-url.com
    const backend_url = process.env.BACKEND_URL || "https://food-delivery-backend-rqjq.onrender.com";

    const sslData = {
      total_amount: expectedTotal,
      currency: "BDT",
      tran_id,
      success_url: `${backend_url}/api/order/ssl-success`,
      fail_url: `${backend_url}/api/order/ssl-fail`,
      cancel_url: `${backend_url}/api/order/ssl-cancel`,
      ipn_url: `${backend_url}/api/order/ssl-ipn`,
      shipping_method: "NO",
      product_name: items.map(i => i.name).join(", "),
      product_category: "Food",
      product_profile: "general",
      cus_name: addressMerged.fullName || "Customer",
      cus_email: addressMerged.email || "customer@email.com",
      cus_phone: addressMerged.phone || "01700000000",
      cus_add1: addressMerged.address || "Dhaka",
      cus_city: addressMerged.deliveryArea || "Dhaka",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(sslData);

    res.json(apiResponse);
  } catch (error) {
    console.error("SSL Init error:", error);
    res.status(500).json({ success: false, message: "Payment initialization failed" });
  }
};


// Keep your existing success/fail/cancel handlers
export const sslSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body || req.query;
    const frontend_url = process.env.FRONTEND_URL || "https://food-delivery-frontend-6yax.onrender.com";

    if (!tran_id) {
       console.error("SSL Success: No transaction ID found");
       return res.redirect(`${frontend_url}/myorders`);
    }
    
    const order = await orderModel.findOneAndUpdate(
      { transactionId: tran_id },
      { payment: true, paymentStatus: "success" },
      { new: true }
    );

    if (order) {
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
    }

    res.redirect(`${frontend_url}/myorders`);
  } catch (error) {
    console.error("SSL Success error:", error);
    const frontend_url = process.env.FRONTEND_URL || "https://food-delivery-frontend-6yax.onrender.com";
    res.redirect(`${frontend_url}/myorders`);
  }
};

export const sslFail = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "https://food-delivery-frontend-6yax.onrender.com";
  res.redirect(`${frontend_url}/order`);
};

export const sslCancel = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || "https://food-delivery-frontend-6yax.onrender.com";
  res.redirect(`${frontend_url}/order`);
};

export const sslIpn = async (req, res) => {
  try {
    const { tran_id, status } = req.body;
    console.log(`Received IPN for transaction: ${tran_id}, Status: ${status}`);

    if (status === "VALID" || status === "AUTHENTICATED") {
      const order = await orderModel.findOneAndUpdate(
        { transactionId: tran_id },
        { payment: true, paymentStatus: "success" },
        { new: true }
      );

      if (order) {
        await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
        console.log(`Order ${tran_id} updated via IPN.`);
      }
    } else if (status === "FAILED") {
      await orderModel.findOneAndUpdate(
        { transactionId: tran_id },
        { paymentStatus: "failed" }
      );
    } else if (status === "CANCELLED") {
      await orderModel.findOneAndUpdate(
        { transactionId: tran_id },
        { paymentStatus: "cancelled" }
      );
    }

    // SSLCommerz expects a 200 OK response to acknowledge IPN
    res.status(200).send("IPN Received");
  } catch (error) {
    console.error("SSL IPN error:", error);
    res.status(500).send("IPN Error");
  }
};
