const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

  
const sequelize = new Sequelize('ticket', 'root', 'root', {
    dialect: 'mariadb'
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
    createdAt: {
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

const nodeJS = Categories.create({ 
    parent: 1, 
    name: "NodeJS",
    logo: "img/logo.png"
 });
console.log("CategoryID:", nodeJS.id);


sequelize.sync({ alert: true }).then((data) => {
    console.log("Table and model synced successfully");
}).catch((err) => {
    console.log("Error syncing the table and model!")
});

