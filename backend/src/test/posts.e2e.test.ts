import { describe, it, expect, beforeAll } from "bun:test";
import { app } from "..";
import { resetDatabase } from "./helper";

describe("Posts E2E", () => {
  let cookie: string;
  let createdPostId: string;

  beforeAll(async () => {
    await resetDatabase();

    // SIGN UP
    await app.request("/api/v1/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "post@test.com",
        password: "password123456",
        name: "Post User",
      }),
    });

    // SIGN IN
    const loginRes = await app.request("/api/v1/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "post@test.com",
        password: "password123456",
      }),
    });

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers.get("set-cookie") as string;

    if (!cookie) {
      throw new Error("Auth cookie not found");
    }
  });

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Cookie: cookie,
  });

  it("should create post", async () => {
    const res = await app.request("/api/v1/posts", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        caption: "Hello World",
        imageUrl: "https://example.com/image.png",
      }),
    });

    expect(res.status).toBe(201);

    const body = await res.json();
    createdPostId = body.data.id;

    expect(createdPostId).toBeDefined();
  });

  it("should get all posts", async () => {
    const res = await app.request("/api/v1/posts", {
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("should get post by id", async () => {
    const res = await app.request(`/api/v1/posts/${createdPostId}`, {
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.id).toBe(createdPostId);
  });

  it("should update post", async () => {
    const res = await app.request(`/api/v1/posts/${createdPostId}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({
        caption: "Updated Caption",
      }),
    });

    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.data.caption).toBe("Updated Caption");
  });

  it("should delete post", async () => {
    const res = await app.request(`/api/v1/posts/${createdPostId}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    expect(res.status).toBe(200);
  });

  it("should return 404 when getting deleted post", async () => {
    const res = await app.request(`/api/v1/posts/${createdPostId}`, {
      headers: authHeaders(),
    });

    expect(res.status).toBe(404);
  });
});
