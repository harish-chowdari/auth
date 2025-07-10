const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserAuthRepository} = require('../database/index');
const logger = require('../utils/logger');
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_SECRET, REFRESH_EXPIRES_IN } = require('../config/constants');

class AuthService {
    async userSignUp({ userName, phoneNo, password }) {
        const exists = await UserAuthRepository.findUserByPhone(phoneNo);
        if (exists) {
            const err = new Error('User already exists');
            err.status = 400;
            throw err;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await UserAuthRepository.createUser({ userName, phoneNo, password: hash });
        logger.info(`User ${userName} created`);
        return user;
    }

    async userLogin({ phoneNo, password }) {
        const user = await UserAuthRepository.findUserByPhone(phoneNo);
        if (!user) {
            const err = new Error('User not found');
            err.status = 400;
            throw err;
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            const err = new Error('Invalid credentials');
            err.status = 400;
            throw err;
        }
        const payload = { user: { id: user.id } };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
        await UserAuthRepository.saveRefreshToken(user.id, refreshToken);
        logger.info(`User ${user.userName} logged in`);
        return { accessToken, refreshToken };
    }

    async refreshToken(oldToken) {
        if (!oldToken) {
            const err = new Error('Refresh token required');
            err.status = 401;
            throw err;
        }
        const saved = await UserAuthRepository.findRefreshToken(oldToken);
        if (!saved) {
            const err = new Error('Invalid refresh token');
            err.status = 403;
            throw err;
        }
        let decoded;
        try {
            decoded = jwt.verify(oldToken, REFRESH_SECRET);
        } catch {
            const err = new Error('Invalid refresh token');
            err.status = 403;
            throw err;
        }
        await UserAuthRepository.deleteRefreshToken(oldToken);
        const payload = { user: { id: decoded.user.id } };
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
        await UserAuthRepository.saveRefreshToken(decoded.user.id, refreshToken);
        return { accessToken, refreshToken };
    }

    async userLogout(token) {
        if (!token) {
            const err = new Error('Refresh token required');
            err.status = 401;
            throw err;
        }
        const saved = await UserAuthRepository.findRefreshToken(token);
        if (!saved) {
            const err = new Error('Invalid refresh token');
            err.status = 403;
            throw err;
        }
        await UserAuthRepository.deleteRefreshToken(token);
        logger.info(`User logged out: ${saved.user}`);
        return;
    }
}

module.exports = new AuthService();
