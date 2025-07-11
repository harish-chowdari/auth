const authService = require('../services/authServices');

const userSignUp = async (req, res) => {
    try {
        const user = await authService.userSignUp(req.body);
        return res.status(201).json(user);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const tokens = await authService.userLogin(req.body);
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

const userLogout = async (req, res) => {
    try {
        const { token } = req.body;
        await authService.userLogout(token);
        return res.json({ message: 'Logged out successfully' });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await authService.getAllUsers();
        return res.json(users);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
};

async function blockUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await authService.blockUser(userId);
        return res.json(user);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
}

async function unblockUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await authService.unblockUser(userId);
        return res.json(user);
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({ message: error.message });
    }
}

module.exports = {
    userSignUp,
    userLogin,
    refreshTokenHandler,
    userLogout,
    getAllUsers,
    blockUser,
    unblockUser
};
