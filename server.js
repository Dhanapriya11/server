const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Grocery App Backend Running");
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const groceryRoutes = require('./routes/grocery');
app.use('/api/grocery', groceryRoutes);


const cron = require('node-cron');
cron.schedule('0 0 * * *', async () => {
    const today = new Date();
    const upcomingExpiries = await Grocery.find({ expiryDate: { $lt: new Date(today.setDate(today.getDate() + 7)) } });
    upcomingExpiries.forEach(item => {
        console.log(`Reminder: Your ${item.itemName} is expiring soon!`);
    });
});

const chatbotRoutes = require('./routes/chatbot');
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
