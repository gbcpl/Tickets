const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelize = require("../config/database-config.js");

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

const LogIn = sequelize.define('login', {
    idDiscord: {
        type: DataTypes.CHAR
    },
    username: {
        type: DataTypes.STRING,
    },
    profilePictre: {
        type: DataTypes.STRING,
    },
    logID: {
        type: DataTypes.STRING,
    },
    passID: {
        type: DataTypes.STRING,
    },
    expiration: {
        type: DataTypes.BIGINT,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

const Token = sequelize.define('token', {
    token: {
        type: DataTypes.CHAR
    },
    expire: {
        type: DataTypes.DATE,
    },
    loginfo: {
        type: DataTypes.STRING,
        primaryKey: true
    }
})

const Categories = sequelize.define('categories', {
    parent: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 20]
        }
    },
}, {
    timestamps: false
});

/*
const html = Categories.create({ 
    name: "html"
})

const css = Categories.create({ 
    name: "css"
})
const js = Categories.create({ 
    name: "js"
})
const php = Categories.create({ 
    name: "php"
})
const sql = Categories.create({ 
    name: "sql"
})
const react = Categories.create({ 
    name: "react"
})
const reactnative = Categories.create({ 
    name: "reactnative"
})
const flutter = Categories.create({ 
    name: "flutter"
})
const symphony = Categories.create({ 
    name: "symphony"
})
const bootstrap = Categories.create({ 
    name: "bootstrap"
})
*/


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
 

sequelize.sync({ alert: true }).then(_data => {
    console.log("Table and model synced successfully");
}).catch((err) => {
    console.log("Error syncing the table and model!")
    console.error(err)
});

module.exports = Tickets;