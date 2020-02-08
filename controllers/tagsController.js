const db = require("../models/index");

exports.getTags= async function (req, res, next) {
    res.render('admin/tags', { tags: await db.Tag.findAll({ order: [['name', 'DESC']] }) }
  )};

exports.creatTag=function (req, res) {
    res.render('admin/createTag');
  };
exports.creatTags=async function (req, res) {
    await db.Tag.create(req.body)
    res.redirect('/tags');
  }; 
exports.deleteTag= async function (req, res) {
    await db.Tag.destroy({ where: { id: req.params.id } })
    res.redirect("/tags")
  };
exports.editTag=async function (req, res) {

    res.render('admin/editTag', {
      tag: await db.Tag.findByPk(req.params.id)
    })
  };
exports.updateTag= async function (req, res) {
    await db.Tag.update(req.body, { where: { id: req.body.id } })
  };      
