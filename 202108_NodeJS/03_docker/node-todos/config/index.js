var configValues = require("./config.json");

module.exports = {
    getDBConnectionString: function () {
        return `${configValues.username} ${configValues.password}`;
    }
}