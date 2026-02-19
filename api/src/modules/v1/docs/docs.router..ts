import { Hono } from "hono";
import { readdir, readFile } from "fs/promises";
import { marked } from "marked";
import path from "path";

const DOCS_PATH = path.join(process.cwd(), "src/modules/v1/docs");

const docsRouter = new Hono().basePath("/docs");

docsRouter.get("/", async (c) => {
  try {
    const files = await readdir(DOCS_PATH);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const listItems = mdFiles
      .map((file, index) => {
        const name = file.replace(".md", "");
        return `<li><a href="/api/v1/docs/${name}">${index + 1}. ${name}</a></li>`;
      })
      .join("");

    return c.html(`
      <html>
        <head>
          <title>API Documentation</title>
          <style>
            body { font-family: Arial; padding: 40px; max-width: 800px; margin: auto; }
            h1 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
            ul { list-style: none; padding: 0; }
            li { margin: 10px 0; }
            a { text-decoration: none; color: #2563eb; font-weight: bold; }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>API Documentation</h1>
          <ul>
            ${listItems}
          </ul>
        </body>
      </html>
    `);
  } catch {
    return c.json({ error: "Docs folder not found" }, 500);
  }
});

docsRouter.get("/:name", async (c) => {
  try {
    const name = c.req.param("name");
    const filePath = path.join(DOCS_PATH, `${name}.md`);
    const markdown = await readFile(filePath, "utf-8");
    const html = marked.parse(markdown);

    return c.html(`
      <html>
        <head>
          <title>${name} Documentation</title>
          <style>
            body { font-family: Arial; padding: 40px; max-width: 800px; margin: auto; }
            h1, h2, h3 { margin-top: 30px; }
            pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
            code { background: #f4f4f4; padding: 2px 4px; }
            a { color: #2563eb; }
            .back { margin-bottom: 20px; display: inline-block; }
          </style>
        </head>
        <body>
          <a class="back" href="/api/v1/docs">← Back to Docs</a>
          ${html}
        </body>
      </html>
    `);
  } catch {
    return c.json({ error: "Documentation not found" }, 404);
  }
});

export default docsRouter;
``
