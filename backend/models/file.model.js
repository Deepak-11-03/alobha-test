const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  repository: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository', required: true },
  versions: [{
    version: { type: Number, required: true },
    content: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const File = mongoose.model('File', fileSchema);
module.exports = File