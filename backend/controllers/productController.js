const db = require("../database/db");

module.exports.getProduct = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  console.log(req.query);

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  db.query(
    `SELECT p.id, p.title, p.image, p.price, p.short_desc, p.quantity,
          c.title as category FROM products p JOIN categories c ON
              c.id = p.cat_id LIMIT ${startValue}, ${limit}`,
    (err, results) => {
      if (err) console.log(err);
      else {
        console.log({ results });
        res.json(results);
      }
    }
  );
};

module.exports.getAllProduct = async (req, res) => {
  db.query(
    `SELECT p.id, p.title, p.image, p.price, p.short_desc, p.quantity,
              c.title as category FROM products p JOIN categories c ON
                  c.id = p.cat_id`,
    (err, results) => {
      if (err) console.log(err);
      else {
        console.log({ results });
        res.json(results);
      }
    }
  );
};

module.exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity, p.short_desc,
          c.title as category FROM products p JOIN categories c ON
              c.id = p.cat_id WHERE p.id = ${productId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
};

module.exports.getProductByCategory = async (req, res) => {
  const { categoryId } = req.params;
  db.query(
    `SELECT p.id, p.title, p.image, p.images, p.description, p.price, p.quantity, p.short_desc,
                c.title as category FROM products p JOIN categories c ON
                    c.id = p.cat_id WHERE c.id = ${categoryId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results);
    }
  );
};

module.exports.addProduct = async (req, res) => {
  const { title, image, images, description, price, quantity, cat_id} = req.body;
  db.query(
      `INSERT INTO products (title, image, images, description, price, quantity, cat_id) 
      VALUES ("${title ?? ""}","${image ?? ""}","${images ?? ""}","${
          description ?? ""
      }",${price ?? 0},${quantity ?? 0},${cat_id ?? 0})`,
      (err, results) => {
          if (err) console.log(err);
          else console.log(results);
      }
  );
}