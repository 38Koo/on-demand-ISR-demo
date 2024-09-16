import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  res.clearPreviewData();

  res.status(200).end();
};

export default handler;
