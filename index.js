const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
require('dotenv').config();

const sqlDB = process.env.SQLDB;
const sqlUser = process.env.SQLUSER;
const sqlPassword = process.env.SQLPASS;

const sequelize = new Sequelize(sqlDB, sqlUser, sqlPassword, {
    host: 'localhost',
    dialect: 'mariadb',
});


sequelize.drop({ match: /_test$/ });

const Tickets = sequelize.define('tickets', {
    author: {
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 30]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    screenshot: {
        type: DataTypes.BLOB,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subcategory: {
        type: DataTypes.INTEGER,
    },
    createdDate: {
        type: DataTypes.DATE,
    },
    closingDate: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
});

const LogTickets = sequelize.define('logTickets', {
    ticket: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false
});


const Categories = sequelize.define('categories', {
    parent: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 20]
        }
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

const leProbleme = Tickets.create({ 
    author: 1,
    title: "souci avec sequelize",
    description: "je ne comprends pas pourriez vous m'expliquer comment faire une foreign key",
    category: 1,
    createdDate: "01/03/2023",
})

const maReponse = LogTickets.create({ 
    ticket: 1,
    author: 1,
    message: "Tu es naze",
    state: "en cours",
    date: "02/03/2023",
})


Tickets.hasMany(LogTickets, {
    ondelete: "Cascade" })
    
LogTickets.belongsTo(Tickets, {
    foreignKey: 'ticket',
    as: "ticketdiscord",
    ondelete: "Cascade"
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 

sequelize.sync({ alert: true }).then((data) => {
    console.log("Table and model synced successfully");
}).catch((err) => {
    console.log("Error syncing the table and model!")
});

