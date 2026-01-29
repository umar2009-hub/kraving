// const mongoose = require("mongoose");
// const { Schema } = mongoose;


// const orderSchema = new Schema({
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     order_data:{
//         type:Array,
//         required:true
//     }
// })

// module.exports = mongoose.model('order',orderSchema)
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  name: String,
  img: String,
  qty: Number,
  size: String,
  price: Number,
});

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: [
    {
      order_date: {
        type: String,
        required: true,
      },
      items: [orderItemSchema],
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
