import { describe, it, expect, beforeAll } from "bun:test";
import { app } from "..";
import { resetDatabase } from "./helper";

describe("PostComment E2E", () => {
  let cookie: string;
  let createdPostId: string;
  let createdCommentId: string;

  beforeAll(async () => {
    await resetDatabase();

    // SIGN UP
    await app.request("/api/v1/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "commenter@test.com",
        password: "takin12345678",
        name: "Commenter",
      }),
    });

    // SIGN IN
    const loginRes = await app.request("/api/v1/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "commenter@test.com",
        password: "takin12345678",
      }),
    });

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers.get("set-cookie") as string;
    if (!cookie) throw new Error("Cookie tidak ditemukan");

    const authHeaders = () => ({
      "Content-Type": "application/json",
      Cookie: cookie,
    });

    // CREATE POST
    const postRes = await app.request("/api/v1/posts", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        caption: "Hello World",
        imageUrl: "https://example.com/image.png",
      }),
    });

    expect(postRes.status).toBe(201);
    const postBody = await postRes.json();
    createdPostId = postBody.data.id;
  });

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Cookie: cookie,
  });

  it("should create a comment", async () => {
    const res = await app.request("/api/v1/posts/comments", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        postId: createdPostId,
        content: "This is a comment",
      }),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    createdCommentId = body.data.id;
  });

  it("should get comments for post", async () => {
    const res = await app.request(`/api/v1/posts/comments?postId=${createdPostId}`, {
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("should get comment by id", async () => {
    const res = await app.request(`/api/v1/posts/comments/${createdCommentId}`, {
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.content).toBe("This is a comment");
  });

  it("should update comment", async () => {
    const res = await app.request(`/api/v1/posts/comments/${createdCommentId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        content: "Updated comment",
      }),
    });

    expect(res.status).toBe(200);

    const getRes = await app.request(`/api/v1/posts/comments/${createdCommentId}`, {
      headers: authHeaders(),
    });
    const body = await getRes.json();
    expect(body.data.content).toBe("Updated comment");
  });

  it("should delete comment", async () => {
    const res = await app.request(`/api/v1/posts/comments/${createdCommentId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);

    const getRes = await app.request(`/api/v1/posts/comments/${createdCommentId}`, {
      headers: authHeaders(),
    });
    expect(getRes.status).toBe(404);
  });
});
