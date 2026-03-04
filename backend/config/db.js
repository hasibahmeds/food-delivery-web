// import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect(
//       'mongodb+srv://chadweekboseman1000_user:chadweek@cluster0.ukvpqh1.mongodb.net/food-del'
//     )
//     .then(() => console.log("DB Connected"));
// };




import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    //     .connect(
    //   'mongodb+srv://chadweekboseman1000_user:chadweek@cluster0.ukvpqh1.mongodb.net/food-del'
    // )
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected"));
};

