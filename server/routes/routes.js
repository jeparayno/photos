const UserRouter = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/api', UserRouter.index);
    app.post('/api/new', UserRouter.register);
    app.post('/api/login', UserRouter.login);
    app.get('/api/all', UserRouter.getAll);
}