const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Create album", () => {
  describe("/artists/:id/albums", () => {
    let artists;

    beforeEach(async () => {
      const { rows } = await db.query(
        "INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *",
        ["Tame Impala", "rock"]
      );

      artists = rows;
    });

    describe("POST", () => {
      it("creates a new album in the database", async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artists[0].id}/albums`)
          .send({
            name: "Innerspeaker",
            year: 2010,
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal("Innerspeaker");
        expect(body.year).to.equal(2010);
        expect(body.artist_id).to.equal(artists[0].id);

        const { rows } = await db.query(
          `SELECT * FROM Album WHERE id = ${body.id}`
        );
        expect(rows[0].name).to.equal("Innerspeaker");
        expect(rows[0].year).to.equal(2010);
        expect(rows[0].artist_id).to.equal(artists[0].id);
      });
    });
  });
});
