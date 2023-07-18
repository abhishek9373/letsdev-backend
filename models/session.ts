import mongoose from 'mongoose';
export const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    expiresAt: {
        type: String,
        default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toDateString(), //7 days
    },
    deviceId: String,
    firebaseToken: String,
    refreshToken: {type: String},
    deviceOS: String,
    deviceModel: String,
    appVersion: String,
    ip: {type: String},
    userAgent: {type: String},
}, {strict: false, timestamps: true})
