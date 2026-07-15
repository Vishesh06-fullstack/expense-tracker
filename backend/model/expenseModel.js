const mongoose = require("mongoose");
const {Schema} = mongoose;

const expenseSchema = new Schema({
    user : {
         type : Schema.Types.ObjectId , 
         ref:'User',
         required : true
    },
    title : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ["income" , "expense"],
        required : true
    },
    paymentMode: {
      type: String,
      enum: ["UPI", "Credit Card", "Debit Card", "Bank Transfer", "Cash", "Other"],
      required: true, 
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
} , {timestamps : true});

const expenseModel = mongoose.model('Expense' , expenseSchema);
module.exports = expenseModel;
