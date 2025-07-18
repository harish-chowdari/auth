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
        return UsersModel.find().select('-password');
    }

    async getUserById(userId) {
        return UsersModel.findById(userId).select('-password').select('-cartItems');
    }

    async addUserAddress(userId, address) {
        return UsersModel.updateOne({ _id: userId }, { $set: { fullAddress: address } });
    }

    async blockUser(userId) {
        return UsersModel.updateOne({ _id: userId }, { $set: { isBlocked: true } });
    }

    async unblockUser(userId) {
        return UsersModel.updateOne({ _id: userId }, { $set: { isBlocked: false } });
    }

    async getUserStats() {
	const now = new Date()
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
	const totalUsersPromise = UsersModel.countDocuments()
	const registeredThisMonthPromise = UsersModel.countDocuments({ createdAt: { $gte: startOfMonth, $lte: now } })
	const blockedUsersPromise = UsersModel.countDocuments({ isBlocked: true })
	const [totalUsers, registeredThisMonth, blockedUsers] = await Promise.all([
		totalUsersPromise,
		registeredThisMonthPromise,
		blockedUsersPromise
	])
	return { totalUsers, registeredThisMonth, blockedUsers }
}
}

module.exports = new AuthRepository();
