const joi = require("joi");
const UserModel = require("../model/user.model");

class UserServices {

    validateData = (data) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().min(8).max(15).required(),
                phone: joi.string().min(10).max(10).required(),
                address: joi.string(),
                role: joi.string().default('buyer'),
                status: joi.string().default('inactive'),
                image: joi.string().empty()
            });
            let result = schema.validate(data);
            if (result.error) {
                throw result.error.details[0].message;
            }
        } catch (e) {
            throw e;
        }
    }
    createUser = async (data) => {

        try {
            let user_obj = new UserModel(data);
            return await user_obj.save();
        } catch (e) {

            if (e.code === 11000) {
                let keys = Object.keys(e.keyPattern);
                throw keys.join(", ") + " should be unique";
            } else {
                throw e;
            }
        }
    }
    getUserByEmail = async (data) => {
        try {
            let result = await UserModel.findOne({
                email: data.email
            });
            return result;
        } catch (e) {
            throw e;
        }
    }
    getUserById = async (data) => {
        try {
            let user = await UserModel.findById(id);
            return user;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = UserServices;