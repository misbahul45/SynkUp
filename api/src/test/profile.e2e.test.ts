import { describe, it, expect, beforeAll } from "bun:test";
import { app } from "..";
import { resetDatabase } from "./helper";

describe("Profile E2E - Better Auth", () => {
  let cookie: string;
  let createdProfileId: string;

  beforeAll(async () => {
    await resetDatabase();

    // SIGN UP
    await app.request("/api/v1/auth/sign-up/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "misbahop@test.com",
        password: "takin12345678",
        name: "Misbah",
      }),
    });

    // SIGN IN
    const loginRes = await app.request("/api/v1/auth/sign-in/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "misbahop@test.com",
        password: "takin12345678",
      }),
    });

    expect(loginRes.status).toBe(200);

    cookie = loginRes.headers.get("set-cookie") as string;

    if (!cookie) {
      throw new Error("Cookie tidak ditemukan");
    }
  });

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Cookie: cookie,
  });

  it("should create profile", async () => {
    const res = await app.request("/api/v1/profiles", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({
        bio: "AI Engineer",
        image: "https://example.com/avatar.png",
      }),
    });

    expect(res.status).toBe(201);

    const body = await res.json();

    createdProfileId = body.data.id; 
    // sesuaikan kalau successResponse kamu pakai format lain
  });

  it("should get profile by id", async () => {
    const res = await app.request(
      `/api/v1/profiles/${createdProfileId}`,
      {
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(200);
  });

  it("should update profile", async () => {
    const res = await app.request(
      `/api/v1/profiles/${createdProfileId}`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          bio: "Senior AI Engineer",
        }),
      }
    );

    expect(res.status).toBe(200);
  });

  it("should delete profile", async () => {
    const res = await app.request(
      `/api/v1/profiles/${createdProfileId}`,
      {
        method: "DELETE",
        headers: authHeaders(),
      }
    );

    expect(res.status).toBe(200);
  });
});
