const Repository = require("../models/repository.model");



const createRepo =  async (req, res) => {
  const { name } = req.body;
  try {
    const repository = await Repository.create({ name, owner: req.user._id });
    return res.status(201).send({data:repository});
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
}

const renameRepo = async (req, res) => {
    const { name } = req.body;
    try {
      const repository = await Repository.findOne({ _id: req.params.id, owner: req.user._id });
      if (!repository) return res.status(404).send({ message: 'Repository not found' });

      repository.name = name;
      await repository.save();
      return res.status(200).send({data:repository});
    } catch (error) {
      return res.status(500).send({ message: 'Server error' });
    }
  }

const deleteRepo = async (req, res) => {
  try {
    const repository = await Repository.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!repository) return res.status(404).send({ message: 'Repository not found' });
    return res.status(200).send({ message: 'Repository deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
}

const getRepos = async (req, res) => {
  try {
    // console.log(req.user)
    const repositories = await Repository.find({ owner: req.user._id });
    return res.status(200).send(repositories);
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
}

module.exports = {createRepo,renameRepo,deleteRepo,getRepos}