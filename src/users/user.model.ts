import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (errSalt, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (!err) {
        this.password = hash;
        next();
      } else {
        next(err);
      }
    });
  });
});
