const router = require("express").Router();
const livroRouter = require("./livro");

router.use("/", livroRouter);

module.exports = router;