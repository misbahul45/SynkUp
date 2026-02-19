import { describe, it, expect, beforeAll } from "bun:test";
import { app } from "..";
import { resetDatabase } from "./helper";

describe("Post Like E2E", () => {
  let cookie: string;
  let createdPostId: string;

  beforeAll(async () => {
    await resetDatabase();

    // SIGN UP
    await app.request("/api/v1/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "like@test.com",
        password: "password123456",
        name: "Like User",
      }),
    });

    // SIGN IN
    const loginRes = await app.request("/api/v1/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "like@test.com",
        password: "password123456",
      }),
    });

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers.get("set-cookie") as string;

    if (!cookie) {
      throw new Error("Auth cookie not found");
    }

    // CREATE POST DULU
    const postRes = await app.request("/api/v1/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({
        caption: "Post for like test",
        imageUrl: "https://example.com/image.png",
      }),
    });

    const postBody = await postRes.json();
    createdPostId = postBody.data.id;

    expect(createdPostId).toBeDefined();
  });

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Cookie: cookie,
  });

  // =======================================
  // TEST LIKE
  // =======================================

  it("should like a post", async () => {
    const res = await app.request(
      `/api/v1/posts/like?postId=${createdPostId}`,
      {
        method: "POST",
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(201);
  });

  it("should not allow double like", async () => {
    const res = await app.request(
      `/api/v1/posts/like?postId=${createdPostId}`,
      {
        method: "POST",
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.message).toContain("already liked");
  });

  // =======================================
  // TEST UNLIKE
  // =======================================

  it("should unlike post", async () => {
    const res = await app.request(
      `/api/v1/posts/unlike?postId=${createdPostId}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(200);
  });

  it("should return 404 when unliking again", async () => {
    const res = await app.request(
      `/api/v1/posts/unlike?postId=${createdPostId}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(404);

    const body = await res.json();
    expect(body.message).toContain("not liked");
  });
});
