const Sequelize = require('sequelize');
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

function generateSlug(title) {
  if(!title) {
    let arr = [];
    for(let i = 0; i < 10; i++) {
      let arrIndex = Math.floor(Math.random() * (90 - 65) + 65);
      arr.push(arrIndex);
    }
    title = arr.map((currentIndex) => {
      return String.fromCharCode(currentIndex).toLowerCase();
    }).join('');
  }
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.beforeValidate((pageInstance, optionsObject) => {
  pageInstance.slug = generateSlug(pageInstance.title);
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db, Page, User
};


