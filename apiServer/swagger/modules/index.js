(function () {

    const role = require('./roles/index')
    const user = require('./user/index')
    exports.paths = {
        ...role,
        ...user
    };
})();
