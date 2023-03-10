const WNClient = require("./src/common/classes/WNClient");
const client = new WNClient();

require("./deploy")(client);
