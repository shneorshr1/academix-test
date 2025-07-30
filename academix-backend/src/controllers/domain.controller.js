const { Domain } = require('../../models');

exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.findAll();
    res.json(domains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDomainById = async (req, res) => {
  try {
    const domain = await Domain.findByPk(req.params.id);
    if (!domain) return res.status(404).json({ error: 'Domain not found' });
    res.json(domain);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDomain = async (req, res) => {
  try {
    const domain = await Domain.create(req.body);
    res.status(201).json(domain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateDomain = async (req, res) => {
  try {
    const domain = await Domain.findByPk(req.params.id);
    if (!domain) return res.status(404).json({ error: 'Domain not found' });

    await domain.update(req.body);
    res.json(domain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDomain = async (req, res) => {
  try {
    const domain = await Domain.findByPk(req.params.id);
    if (!domain) return res.status(404).json({ error: 'Domain not found' });

    await domain.destroy();
    res.json({ message: 'Domain deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
