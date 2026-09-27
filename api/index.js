module.exports = async (req, res) => {
    try {
        const app = require('../backend/server');
        return await app(req, res);
    } catch (error) {
        console.error('API STARTUP ERROR:', error);

        return res.status(500).json({
            error: 'Backend startup failed',
            message: error.message
        });
    }
};