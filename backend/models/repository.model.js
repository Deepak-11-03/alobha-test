const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Repository = mongoose.model('Repository', repositorySchema);

module.exports = Repository