import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};
const server = http.createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" });
      return res.end();
    }
    const url = new URL(req.url, "http://localhost");
    let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    const stat = await fs.stat(file).catch(() => null);
    if (stat?.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(308, { Location: url.pathname + "/" + url.search });
        return res.end();
      }
      file = path.join(file, "index.html");
    }
    let data,
      status = 200;
    try {
      data = await fs.readFile(file);
    } catch {
      status = 404;
      file = path.join(root, "404.html");
      data = await fs.readFile(file);
    }
    res.writeHead(status, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Local: http://localhost:${port}`),
);
