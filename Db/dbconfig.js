import mongoose from "mongoose";

const dbconnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the database.");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database Connected");
  } catch (error) {
    console.log(error);
    console.log("Database Connection Failed");
  }
};

export default dbconnect;
