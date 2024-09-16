import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const articleID = req.body.entry.id;

  if (!articleID) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    await res.revalidate(`/article/${articleID}`);
    return res.json({ revalidate: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
};

export default handler;
