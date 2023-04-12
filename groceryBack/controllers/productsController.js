const BaseController = require("./baseController");

class ProductsController extends BaseController {
  constructor(model) {
    super(model);
  }

  insertOne = async (req, res) => {
    const { name, price } = req.body;
    console.log("Reached controller");
    try {
      const newProduct = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        name: name,
        price: price,
      });
      return res.json(newProduct);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getOne = async (req, res) => {
    const id = req.params.productId;
    try {
      const output = await this.model.findByPk(id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = ProductsController;
