exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.superadminBoard = (req, res) => {
  res.status(200).send("Superdmin Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.directorBoard = (req, res) => {
  res.status(200).send("Director Content.");
};

exports.hoeBoard = (req, res) => {
  res.status(200).send("Head of Engineering Content.");
};

exports.operatorBoard = (req, res) => {
  res.status(200).send("Operator.");
};