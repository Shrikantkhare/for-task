require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const checkInOutRoutes = require('./routers/routes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', checkInOutRoutes);


mongoose.connect('mongodb+srv://emeter:Lg26qKrbMM8qQyUA@atlascluster.iaya85o.mongodb.net/tast-1', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
  
}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });