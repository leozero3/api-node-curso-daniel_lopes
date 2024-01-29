class FileController {
  async upload(req, res) {
    const { filename } = req.file;
    console.log(filename);
    return res.status(200).json({ url: `uploads/${filename}` });
  }
}

module.exports = new FileController();
