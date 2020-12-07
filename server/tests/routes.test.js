/***************************************************************************************************************************/
//                                                                                                                         //
//   Before doing unit test must add                                                                                       //
// MONGODB_URI_TEST=mongodb+srv://admin:BthyMnJlVmZgZEt2@clusterpsw.rko8u.mongodb.net/testDB?retryWrites=true&w=majority   //               
//       to  .env file     and.....                                                                                        //
//                                                                                                                         //
//    add  process.env.MONGODB_URI_TEST                                                                                    //
//                                                                                                                         //
//      to server.js's mongoose.connect 's as first port                                                                   //     
//                                                                                                                         //
/***************************************************************************************************************************/


const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("1. Root Test for user", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });

  it("Root success", async () => {
    const res = await request(app).get("/api/users").send({});

    expect(res.statusCode).toEqual(200);
  });
});

describe("2. Sign up test", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });

  it("Sign up success", async () => {
    const res = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("3. User login", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("user login test", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
        applications: { type: Array },
      });
    //expect(res.statusCode).toEqual(200);

    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
      });

    expect(res2.statusCode).toEqual(200);
  });
});

describe("4. user forget password", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("user forget password", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
      });

    const res2 = await request(app)
      .post("/api/users/forgot-password")

      .send({
        email: "testsetest@outlook.com",
      });


    expect(res2.statusCode).toEqual(200);
  });
});

describe("5. Root Test for jobposting", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });

  it("Root jobposting success", async () => {
    const res = await request(app).get("/api/jobs").send({});

    expect(res.statusCode).toEqual(200);
  });
});

describe("6. Posting Job posting Test for jobposting", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
  
    return done();
  });

  it("Posting success", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Employer",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
      });
   

    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
      });

    const res3 = await request(app)
      .post("/api/jobs/post-job")
      .set("x-auth-token", res2.body.token)
      .send({
        positionTitle: "testjob3",
        companyName: "testjob3",
        contractType: "testjob2",
        description: "testjob2",
        duties: "testjob2",
        requirements: "testjob2",
        posterId: "testjob2",
      });

    expect(res3.statusCode).toEqual(400);
  });
});

describe("7. Detail Job posting Test for jobposting", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });

  it("Detail job posting success", async () => {
    const res1 = await request(app)
      .get("/api/jobs/job/" + "5fcd556d456c9b1dd81eb964")

      .send({});

    expect(res1.statusCode).toEqual(200);
  });
});

describe("8. Applying Job posting Test for jobposting", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    
    return done();
  });

  it("Applying success", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Employer",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
        applications: { type: Array },
      });
   

    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
      });

    const res3 = await request(app)
      .post("/api/jobs/job/apply/" + "5fcd556d456c9b1dd81eb964")
      .set("x-auth-token", res2.body.token)
      .send({});

    expect(res3.statusCode).toEqual(200);
  });
});

describe("9. user profile", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("user profile  test", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest3@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
        applications: { type: Array },
      });
    
    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest3@outlook.com",
        password: "Wnghks159357!",
      });

    const res3 = await request(app)
      .get("/api/users/" + "Juhwan Kim")
      .set("x-auth-token", res2.body.token)
      .send({});

    expect(res3.statusCode).toEqual(200);
  });
});

describe("10. user resume upload", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("user resume uploading test", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest3@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
        applications: { type: Array },
      });


    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest3@outlook.com",
        password: "Wnghks159357!",
      });

    const filePath = `${__dirname}/testfile.doc`;

    const res3 = await request(app)
      .post("/api/users/upload")
      .set("x-auth-token", res2.body.token)
      .attach("MyResume", filePath);

    expect(res3.statusCode).toEqual(200);
  });
});


// No longer used
/*
describe("12. User resetting password", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("User resetting password test", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest3@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
        applications: { type: Array },
      });
    //expect(res.statusCode).toEqual(200);

    const res2 = await request(app)
      .post("/api/users/forgot-password")

      .send({
        email: "testsetest@outlook.com",
      });

    const res3 = await request(app).post(
      "/api/users/reset-password/" +
        "e8ce6ad95528f891ea11b791ef53917750f8620c990bd206d396a6f97f859289"
    );

    expect(res3.statusCode).toEqual(200);
  });
});
*/


/*
describe("10. user scoring", () => {
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").catch(() => {});
    return done();
  });
  it("user scoring test", async () => {
    const res1 = await request(app)
      .post("/api/users/signup")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
        confirmPassword: "Wnghks159357!",
        userRole: "Candidate",
        userName: "Juhwan Kim",
        contactInfo: {
          firstName: "Juhwan",
          lastName: "kasdf",
          cellPhone: "12345",
        },
      });
    //expect(res.statusCode).toEqual(200);

    const res2 = await request(app)
      .post("/api/users/login")

      .send({
        email: "testsetest@outlook.com",
        password: "Wnghks159357!",
      });

    const res3 = await request(app)
      .post("/api/users/scoring")
      .set("x-auth-token", res2.body.token)
      .send({
        points: 4,
      });

    expect(res3.statusCode).toEqual(200);
  });
});
*/