// mysql database

import Sequelize from 'sequelize';
var sequelize = new Sequelize ('db-pisos', 'node_api', '4EDAD:q8', { dialect: 'mysql', host: 'mysql_api', port: 3306});

sequelize.authenticate().then(function(err) {
    //console.log('Connection has been established successfully.');
}
).catch(function (err) {
    //console.log('Unable to connect to the database:', err);
}
);

export default sequelize;

