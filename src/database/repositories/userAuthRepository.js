const { UsersModel, RefreshToken } = require('../models/index');

class AuthRepository {
    async findUserByPhone(phoneNo) {
        return UsersModel.findOne({ phoneNo });
    }

    async createUser({ userName, phoneNo, password }) {
        const user = new UsersModel({ userName, phoneNo, password });
        return user.save();
    }

    async saveRefreshToken(userId, token) {
        const rt = await RefreshToken.create({ user: userId, token });
        return rt.save();
    }

    async findRefreshToken(token) {
        return RefreshToken.findOne({ token });
    }

    async deleteRefreshToken(token) {
        return RefreshToken.deleteOne({ token });
    }

    async getAllUsers() {
        return UsersModel.find()
    }
}

module.exports = new AuthRepository();
