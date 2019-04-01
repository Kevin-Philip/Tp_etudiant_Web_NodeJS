const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Users tests", () => {
  it("should list ALL users on /v1/users GET", done => {
    chai.request(app)
        .get("/v1/users")
        .end((err, res) =>{
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
  });
});
