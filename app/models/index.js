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
    createdDate: "2023-03-01",
})

const deuxiemeTicket = Tickets.create({ 
    author: 2,
    title: "comment créer un tableau",
    description: "je suis tout pourri en html et je souhaiterais l'aide d'un professionnel",
    category: 1,
    createdDate: "2023-03-13",
})

const maReponse = LogTickets.create({ 
    ticket: 1,
    author: 1,
    message: "Tu es naze",
    state: "en cours",
    date: "2023-03-02",
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

