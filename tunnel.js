const localtunnel = require('localtunnel');
require("dotenv").config();
(async () => { 
  const port = process.env.PORT;
  console.log(`tunneling http://localhost:${port}`);
  const tunnel = await localtunnel({ port });
  console.log("tunneled URL",tunnel.url);
  tunnel.on('close', () => {
    console.log("tunnel closed!!!")
  });
})();
