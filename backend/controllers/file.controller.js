const Repository = require("../models/repository.model");
const File = require("../models/file.model");


const uploadFile = async (req, res) => {

  try {

    
    const fileName = req.file?.originalname?.toLowerCase()
    const repository = await Repository.findOne({ _id: req.params.repoId, owner: req.user._id });
    if (!repository) return res.status(404).send({ message: 'Repository not found' });

    let file = await File.findOne({ fileName, repository: req.params.repoId });
    if (!file) {
      file =  await File.create({
        fileName,
        repository: req.params.repoId,
        versions: [{ version: 1, content:req.file.buffer.toString('base64') }],
      });
    } else {
      file.versions.push({ version: file.versions.length + 1, content:req.file.buffer.toString('base64') });
      await file.save();
    }
    return res.status(201).send(file);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Server error' });
  }
}

const getRepoFiles = async (req, res) => {
  try {
    const repository = await Repository.findOne({ _id: req.params.repoId, owner: req.user._id });
    if (!repository) return res.status(404).send({ message: 'Repository not found' });

    const files = await File.find({ repository: req.params.repoId });
    return res.status(200).send(files);
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
}

const getFileHistory = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId).populate('repository');
    if (!file || file.repository.owner.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: 'File not found' });
    }
    return res.status(200).send(file.versions);
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
}

const downloadFileVersion = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId).populate('repository');
    if (!file || file.repository.owner.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: 'File not found' });
    }
    const version = file.versions.find(v => v.version === parseInt(req.params.version));
    if (!version) return res.status(404).send({ message: 'Version not found' });
    return res.status(200).send({ fileName: file.fileName, content: version.content, createdAt: version.createdAt });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
}

module.exports ={uploadFile,getRepoFiles,getFileHistory,downloadFileVersion}