const login = async (req, res) => {
  const response = {
    message: 'Hello World',
    success: true
  }

  res.status(200).json(response);
}

module.exports = login;