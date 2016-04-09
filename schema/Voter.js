'use strict';

exports = module.exports = function(app, mongoose) {
  var userSchema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    name: {
      title: String,
      first: String,
      middle: String,
      last: String,
      suffix: String,
      full: String
    },
    birthDate: Date,
    registration: {
      date: Date,
      isActive: Boolean,
      party: String
    },
    precinct: {
      text: Number,
      name: String,
      ward: Number
    },
    email: String,
    phone: {
      area: Number,
      exchange: Number,
      last4: Number,
      full: Number
    },
    location: {
      number: Number,
      numberSuffix: String,
      streetDir: String,
      streetName: String,
      streetType: String,
      streetSuffix: String,
      unitType: String,
      unitNumber: String,
      city: String,
      state: String,
      zip5: Number,
      zip4: Number,
      neighborhood: String
    },
    mailing: {
      line1: String,
      line2: String,
      line3: String,
      lien4: String,
      city: String,
      state: String,
      zip5: Number,
      zip4: Number
    },
    history: [{election: String, method: String, party: String}],

    signature: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],

    search: [String]
  });
  userSchema.methods.isVerified = function(done){
    this.populate('roles.account', function(err, user){
      if(err){
        return done(err);
      }
      var flag = user.roles.account && user.roles.account.isVerified && user.roles.account.isVerified === 'yes';
      return done(null, flag);
    });
  };
  userSchema.methods.canPlayRoleOf = function(role) {
    if (role === "admin" && this.roles.admin) {
      return true;
    }

    if (role === "account" && this.roles.account) {
      return true;
    }

    return false;
  };
 };
