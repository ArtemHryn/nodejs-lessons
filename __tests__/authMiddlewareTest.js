const { describe, it, expect } = require("@jest/globals");
const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../src/helper/errors");
require("dotenv").config();

const { authMiddleware } = require("../src/middlewares/authMiddleware");

describe("auth middleware test", () => {
  it("should call next() and add user and token properties to req object", () => {
    const user = {
      _id: "1",
      createdAt: new Date().getTime(),
    };
    const token = jwt.sign(
      {
        _id: user._id,
        createdAt: user.createdAt,
      },
      process.env.JWT_SERCRET,
      { expiresIn: "1d" }
    );
    const mReq = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const mRes = {};
    // eslint-disable-next-line no-undef
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mReq.token).toEqual(token);
    expect(mReq.user._id).toEqual(user._id);
    expect(mReq.user.createdAt).toEqual(user.createdAt);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should call next() with error in case no token", () => {

    const mReq = {
      headers: {},
    };
    const mRes = {};
    // eslint-disable-next-line no-undef
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new NotAuthorizedError(
        "Please, provide a token in request authorization header"
      )
    );
  });
});
