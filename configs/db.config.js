const mongoose = require('mongoose');

mongoose
.connect(`${process.env.DBURL}`, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
.catch(err => {console.error('Error connecting to mongo', err)});

mongoose.set('useCreateIndex', true);

module.exports = mongoose;