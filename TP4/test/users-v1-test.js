const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Users tests", () => {
  it("should list ALL users on /v1/users GET", done => {
    chai
      .request(app)
      .get("/v1/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        expect(res.body.length).eq(1);
        done();
      });
  });

  it("should list a SINGLE user on /v1/users/<id> GET", done => {
    chai
      .request(app)
      .get("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("should add a SINGLE user on /v1/users POST", done => {
    chai
      .request(app)
      .get("/v1/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        let length = res.body.length;
        chai
          .request(app)
          .post("/v1/users")
          .send({
            name: "Test TEST",
            login: "TEST",
            age: 99
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an("object");
            chai
              .request(app)
              .get("/v1/users")
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                expect(res.body.length).eq(length + 1);
                done();
              });
          });
      });
  });

  it("should update a SINGLE user on /v1/users/<id> PATCH", done => {
    chai
      .request(app)
      .patch("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
      .send({
        name: "Test TEST"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        chai
          .request(app)
          .get("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("name", "Test TEST");
            done();
          });
      });
  });

  it("should delete a SINGLE user on /v1/users/<id> DELETE", done => {
    chai
      .request(app)
      .get("/v1/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        let length = res.body.length;
        chai
          .request(app)
          .delete("/v1/users/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")
          .end((err, res) => {
            expect(res).to.have.status(200);
            chai
              .request(app)
              .get("/v1/users")
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("array");
                expect(res.body.length).eq(length - 1);
                done();
              });
          });
      });
  });
});
