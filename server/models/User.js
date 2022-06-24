const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;//비밀번호를 몇 글자를 할건지
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema ({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {//패스워드가 변경되었을 경우에만 아래 암호화 작업을 한다는 조건.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        //this가 스키마를 가리켜 주므로 그 스키마 안에 있는 password를 가져온다. 사용자가 입력한 password!
        if (err) return next(err);
        user.password = hash; //user의 password를 암호화한 hash로 바꿔줌
        next();
      });
    });
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  let user = this;

  let token = jwt.sign(user._id.toString(), "mytoken");
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  })
}

userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  jwt.verify(token, "mytoken", function(err, decoded){
    user.findOne({"_id": decoded, "token": token}, function(err, user) {
      if (err) return cb(err);
      cb(null, user)
    })
  })
}



module.exports = mongoose.model("User", userSchema);
