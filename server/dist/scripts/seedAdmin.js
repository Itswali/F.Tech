"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../src/models/User"));
dotenv_1.default.config();
const seedAdmin = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the environment variables.');
        }
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const email = 'Faizan@ftech.com';
        const password = 'FTech@123';
        const existingAdmin = await User_1.default.findOne({ email });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            process.exit(0);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        const admin = new User_1.default({
            email,
            passwordHash,
        });
        await admin.save();
        console.log('Admin user created successfully.');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};
seedAdmin();
