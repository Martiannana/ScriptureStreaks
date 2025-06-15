import Award from "../Models/Award.js";

const getAwards = async (req, res) => {
  try {
    const awards = await Award.find({});
    res.json({ awards });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export { getAwards };
