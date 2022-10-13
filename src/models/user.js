const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },

}, {
    versionKey: false,
    timestamps: true
});

UserSchema.methods.toJSON = () => {
    const methods = typeof UserSchema.methods !== 'object' ? UserSchema.methods.toObject() : UserSchema.methods;
    const { password, _id, ...user } = methods;
    user.uid = _id;

    return user;
}





module.exports = model('Users', UserSchema);