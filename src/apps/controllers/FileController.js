const fsp = require("fs/promises");
const B2 = require("backblaze-b2");

const b2 = new B2({
  applicationKeyId: "822c090f8a9f", // or accountId: 'accountId'
  applicationKey: "0040fe9111c6898f4c5b3ba71ddbc1bb0efc94cc6a", // or masterApplicationKey
});

class FileController {
  async upload(req, res) {
    const { filename } = req.file;
    console.log(filename);

    try {
      const file = await fsp.readFile(`uploads/${filename}`, (err, data) => {
        if (err) {
          throw err;
        }

        return data;
      });

      await b2.authorize();

      const {
        data: { uploadUrl, authorizationToken },
      } = await b2.getUploadUrl({
        bucketId: "28f2e26c706950bf88da091f",
      });

      const { data } = await b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: authorizationToken,
        fileName: filename,
        data: file,
      });

      return res.send({
        url: `https://f004.backblazeb2.com/file/curso-nodeJS/${data.fileName}`,
      });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao fazer Upload" });
    }
  }
}

module.exports = new FileController();
