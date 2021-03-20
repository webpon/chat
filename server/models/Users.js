const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    select: true, //当select为false时，password不会被查询出来
    required: true,
    // set(val) {
    //   return require('bcrypt').hashSync(val, 10)
    // },
  },
  imgSrc:{
    type: String, required: true
  }
})

module.exports = mongoose.model('Users', schema)
