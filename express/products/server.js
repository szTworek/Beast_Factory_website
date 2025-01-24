const express = require("express")
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json())

app.listen(3000, ()=>{
    console.log("Product service running on port 3000")
})

const { sequelize, Items } = require('./database.js');


app.get('/api/items', async (req, res) => {
    const items = await Items.findAll();
    items.forEach((item) => item.image = item.image ? item.image.toString('base64') : null);
    res.json(items);
});
app.get('/api/items/category/:id', async (req, res) => {
    if(!req.params.id) return res.json([]);

    const items = await Items.findAll({
        where: {
            category: req.params.id,
          },
      });
    items.forEach((item) => item.image = item.image ? item.image.toString('base64') : null);
    res.json(items);
});

app.delete('/api/items/:id', async (req, res) => {
    const rowsDeleted = await Items.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) res.status(204).end();
    else res.status(404).json({ error: 'Item not found' });
});
// app.get('/api/books/:id', async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) res.json(book);
//     else res.status(404).json({ error: 'Book not found' });
// });

// app.post('/api/item', async (req, res) => {
//     const { id, author, title,description,category,price,discountPercentage,stock,brand,image } = req.body;
//     const item = await Items.create({ id, author, title,description,category,price,discountPercentage,stock,brand,image });
//     res.json({ id: item.id });
// });
const multer = require('multer');
const upload = multer(); 

app.post('/api/item', upload.single('image'), async (req, res) => {
    try {
        const { id, title, description, category, price, discountPercentage, stock, brand } = req.body;

        const imageBuffer = req.file ? req.file.buffer : null;

        const item = await Items.create({
            id,
            title,
            description,
            category,
            price,
            discountPercentage,
            stock,
            brand,
            image: imageBuffer,
        });

        res.json({ id: item.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save item' });
    }
});
// app.delete('/api/books/:id', async (req, res) => {
//     const rowsDeleted = await Book.destroy({ where: { id: req.params.id } });
//     if (rowsDeleted) res.status(204).end();
//     else res.status(404).json({ error: 'Book not found' });
// });