import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the URI stored in the environment variables.
 * @returns {void}
 * @throws {Error} - Throws an error if the database connection fails.
 */
export const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => { console.log("DB Connected") })
        .catch(err => {
            console.error("Database connection error:", err);
            throw new Error("Failed to connect to the database");
        });
};
