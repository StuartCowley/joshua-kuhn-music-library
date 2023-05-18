const db = require("../db/index");

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id } = req.params;

  try {
    const { rows } = await db.query(
      "INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *",
      [name, year, id]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * from Album");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query("SELECT * from Album WHERE id = $1", [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const putAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(
      "UPDATE Album SET name = $1, year = $2 WHERE id = $3 RETURNING *",
      [name, year, id]
    );

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const patchAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id } = req.params;

  let query, params;

  if (name && year) {
    query = "UPDATE Album SET name = $1, year = $2 WHERE id = $3 RETURNING *";
    params = [name, year, id];
  } else {
    query =
      "UPDATE Artists SET " +
      (name ? "name = $1" : "year = $1") +
      "WHERE id = $2 RETURNING *";
    params = [name || year, id];
  }

  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query("DELETE from Album WHERE id = $1 RETURNING *", [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  putAlbum,
  patchAlbum,
  deleteAlbum,
};
