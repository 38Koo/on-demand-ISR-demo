import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const secret = req.query.secret;
  const articleID = req.query.slug;

  if (secret !== process.env.CLIENT_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!articleID) {
    return res
      .status(400)
      .json({ message: "Parameter `slug` is not provided" });
  }

  const reqURL = `http://localhost:1337/api/articles/${articleID}`;
  const response = await fetch(reqURL);
  const article = await response.json();

  console.log(reqURL);
  console.log(article);

  res.setPreviewData({});
  res.redirect(307, `/article/${article.data.id}`);
};

export default handler;
