//import path package
const path = require('path');
//exporting index.html as a response to app.get
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
