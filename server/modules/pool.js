const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
// First condition is for when the db url is available
console.log("Database URL was found");
pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
} else {
  // Otherwise we use local server
  console.log("Database URL was not found");
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });


}


// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
// if (process.env.DATABASE_URL) {
//     pool = new pg.Pool({
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//             rejectUnauthorized: false
//         }
//     });
// }
// // When we're running this app on our own computer
// // we'll connect to the postgres database that is 
// // also running on our computer (localhost)
// else {
//     pool = new pg.Pool({
//         database: 'auth_shelf',
//         host: 'localhost',
//         port: 5432,
//         max: 10, //max # of connections for pool.
         
//     });
// }

module.exports = pool;
