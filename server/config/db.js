const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MONGODB_URI = 'mongodb+srv://theone:4aQ954QTx2TlGB1J@cluster0.zfzmd.mongodb.net/projektor?retryWrites=true&w=majority' || 'mongodb://localhost:27017/projektor';

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  
})
  // eslint-disable-next-line no-console
  .then(() => { console.log('Mongodb running'); })
  // eslint-disable-next-line no-console
  .catch(err => console.error(err)
  );