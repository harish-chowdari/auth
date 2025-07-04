const authService = require('../services/authServices');

const signUp = async (req, res) => {
    try {
        const user = await authService.signUp(req.body);
        return res.status(201).json(user);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const tokens = await authService.login(req.body);
        return res.json(tokens);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

const refreshTokenHandler = async (req, res) => {
    try {
        const { token } = req.body;
        const tokens = await authService.refreshToken(token);
        return res.json(tokens);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const { token } = req.body;
        await authService.logout(token);
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

module.exports = {
    signUp,
    login,
    refreshTokenHandler,
    logout
};
