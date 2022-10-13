const { model, Schema } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        default: 'No entregado',
    }, 
    isActive:{
        type: Boolean,
        default: true,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }

}, {
    versionKey: false,
    timestamps: true
});

module.exports = model('Task', taskSchema);