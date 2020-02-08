var express = require('express');
var router = express.Router();

const tagsController = require("../controllers/tagsController")
/* GET tags listing. */
router.get('/', tagsController.getTags);
/* GET create tags. */
router.get('/create', tagsController.creatTag);
/* save tag */
router.post('/create', tagsController.creatTags);
/* delete tag */
router.get('/delete/:id', tagsController.deleteTag);
/* edit tag. */
router.get('/edit/:id', tagsController.editTag);
/* update tag */
router.post('/update', tagsController.updateTag);


module.exports = router;
