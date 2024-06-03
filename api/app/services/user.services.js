const joi = require("joi");
const UserModel = require("../model/user.model");

class UserServices {

    validateData = (data) => {
        try {

            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().min(8).max(15).required(),
                phone: joi.string().min(10),
                role: joi.string().valid('admin', 'librarian', 'user').default('user'),
                preferredGenres: joi.alternatives().try(
                    joi.string(),
                    joi.array().items(joi.string())
                ),
                image: joi.string().allow(null, '')
            });
            const { error, value } = schema.validate(data);
            if (error) {
                throw new Error(error.details[0].message)
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
    getUserById = async (id) => {
        try {
            let user = await UserModel.findById(id);
            return user;
        } catch (e) {
            throw e;
        }
    }
    updateUser = async (id, data) => {
        try {
            let user = await UserModel.findByIdAndUpdate(id, {
                $set: data
            });
        } catch (e) {
            throw e;
        }
    }
    deleteUser = async (id) => {
        try {
            return await UserModel.deleteOne(id);
        } catch (e) {
            throw e;
        }
    }
    getAllUsers = async () => {
        try {
            return await UserModel.find();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserServices;