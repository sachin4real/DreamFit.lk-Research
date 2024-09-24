import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
    name: {type:String,required: true},
    email: {type:String,required: true},
    phoneNumber: {type:String,required:true},
    subject: { type:String,required:true},
    issueType:{type:String,enum:['technical','billing','general'],required:true},
    description: {type:String,required: true},
    status: {type:String ,enum: ['open', 'in progress', 'closed'], default: 'open' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});







const Support = mongoose.model('Support', supportSchema);

export default Support;
