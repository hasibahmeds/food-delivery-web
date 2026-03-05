// every things work perfect but without ipn

// import express from "express";
// import authMiddleware from "../middleware/auth.js";
// import {
//   placeOrder,
//   userOrders,
//   listOrders,
//   updateStatus,
//   deleteOrder,
//   getCancelledOrders,         
//   updateRefundStatus
// } from "../controllers/orderController.js";

// import {
//   sslInit,
//   sslSuccess,
//   sslFail,
//   sslCancel
// } from "../controllers/sslController.js";


// const orderRouter = express.Router();


// orderRouter.post("/place", authMiddleware, placeOrder);
// orderRouter.post("/userorders", authMiddleware, userOrders);
// orderRouter.get("/list", listOrders);
// orderRouter.post("/status", updateStatus);
// orderRouter.post("/delete", deleteOrder);



// orderRouter.post("/ssl-init", authMiddleware, sslInit);

// orderRouter.post("/ssl-success", sslSuccess);
// orderRouter.get("/ssl-success", sslSuccess);
// orderRouter.post("/ssl-fail", sslFail);
// orderRouter.get("/ssl-fail", sslFail);
// orderRouter.post("/ssl-cancel", sslCancel);
// orderRouter.get("/ssl-cancel", sslCancel);





// orderRouter.get("/cancelled", getCancelledOrders);
// orderRouter.patch("/:id/refund-status", updateRefundStatus);

// export default orderRouter;


// every things work perfect but without ipn









import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
  deleteOrder,
  getCancelledOrders,         // ← this line is probably missing or has typo
  updateRefundStatus
} from "../controllers/orderController.js";

import {
  sslInit,
  sslSuccess,
  sslFail,
  sslCancel,
  sslIpn
} from "../controllers/sslController.js";


const orderRouter = express.Router();

/* =====================================================
   CASH ON DELIVERY (EXISTING – DO NOT CHANGE)
===================================================== */
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/delete", deleteOrder);

/* =====================================================
   SSLCommerz – ONLINE PAYMENT INIT
===================================================== */
// Delegate SSL routes to controller which creates the pending order
orderRouter.post("/ssl-init", authMiddleware, sslInit);
// Support both POST (IPN) and GET (redirect) methods from SSLCommerz
orderRouter.post("/ssl-success", sslSuccess);
orderRouter.get("/ssl-success", sslSuccess);
orderRouter.post("/ssl-fail", sslFail);
orderRouter.get("/ssl-fail", sslFail);
orderRouter.post("/ssl-cancel", sslCancel);
orderRouter.get("/ssl-cancel", sslCancel);
orderRouter.post("/ssl-ipn", sslIpn);





orderRouter.get("/cancelled", getCancelledOrders);
orderRouter.patch("/:id/refund-status", updateRefundStatus);

export default orderRouter;


