import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let mongodbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    const projectName = "resume-builder";

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    if (mongodbURI.endsWith("/")) {
      mongodbURI = mongodbURI.slice(0, -1);
    }

    const baseURI = mongodbURI.endsWith(`/${projectName}`)
      ? mongodbURI
      : `${mongodbURI}/${projectName}`;

    await mongoose.connect(baseURI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.log("Continuing without MongoDB. Some features may not work until the database is available.");
  }
};

export default connectDB;
