const { describe, it, expect } = require("@jest/globals");
const { Post } = require("../src/models/postModel");
const { getPostsById } = require("../src/services/postServices");

describe("Posts tests", () => {
  it("It should get post based on provided userId and postId", async () => {
    const mPostId = "1";
    const mUserId = "2";

    const post = {
      _id: mPostId,
      topic: "",
      userId: mUserId,
      text: "",
    };
    // eslint-disable-next-line no-undef
    jest.spyOn(Post, "findOne").mockImplementationOnce( () => post);

    const result = await getPostsById(mPostId, mUserId);

    expect(result._id).toEqual(post._id);
    expect(result.topic).toBeDefined();
    expect(result.text).toBeDefined();
    expect(result.userId).toEqual(post.userId);

  });
});
