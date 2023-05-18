const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Delete Artist", () => {
  let artist;
  let album;

  beforeEach(async () => {
    const artistResponse = await db.query(
      "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
      ["Tame Impala", "rock"]
    );

    artist = artistResponse.rows[0];

    const albumResponse = await db.query(
      "INSERT INTO Album (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *",
      ["Some album", 2021, artist.id]
    );

    album = albumResponse.rows[0];
  });

  describe("DELETE /albums/{id}", () => {
    it("deletes the album and returns the deleted data", async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "Some album",
        year: 2021,
        artist_id: artist.id,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .delete("/albums/999999999")
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });
});
