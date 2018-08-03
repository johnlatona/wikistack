const express = require('express');
const models = require('../models/index');
const views = require('../views');
const mainLayout = require('../views/layout');
const router = express.Router();

router.get('/', async(req, res, next) => {
  let allPages = await models.Page.findAll({});
  res.send(views.main(allPages));
});

router.get('/add', (req, res, next) => {
  res.send(views.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const thisPage = await models.Page.findOne({
      where: {slug: req.params.slug}
    });
    res.send(views.wikiPage(thisPage));
  }
  catch(error) { next(error) };
});

router.post('/', async (req, res, next) => {
  try {
    const [ user, wasCreated ] = await models.User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });
    const page = await models.Page.create(req.body);
    page.setAuthor(user)
    res.redirect(`/wiki/${page.slug}`);
  }
  catch(error) { next(error) };
});

module.exports = router;
