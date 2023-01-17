const server = require('./src/app.js');
const { conn } = require('./src/db.js');
conn.sync(/* { force: true } */).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('port listening at '+process.env.PORT); // eslint-disable-line no-console
  });
});
