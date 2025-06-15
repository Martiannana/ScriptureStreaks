import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
    },
    password: { 
        type: String,
        select: false, 
    },
    image: {
        type: String,
        default: null, 
    },
    role:{
        type: String,
        enum: ['Admin', 'User'],
        default: 'User',
    },
    streak: {
        type: Number,
        default: 1, 
    },
    chaptersCompleted:{
        type: [String],
        default: []
    },
    versesCompleted: {
        type: [String],
        default: []
    },
    booksCompleted:{
        type: [String],
        default: []
    },
    versesShared: {
        type: Number,
        default: 0, 
    },
    isVerified: {
        type: Boolean,
        default: false, 
    },
    awards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Award',
        }
    ],
    lastSignIn: {
        type: Date, 
        default: null
    },
}, {
    timestamps: true, 
});

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next(); 
        const salt = await genSalt(10); 
        this.password = await hash(this.password, salt); 
        next();
    } catch (err) {
        throw err;
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

UserSchema.methods.incrementPoints = async function (pointsEarned) {
    this.points += pointsEarned;

    await this.save();
    return this;
};

export default model('User', UserSchema);
