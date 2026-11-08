import { createServer } from "vite";

// These local HTTP fixtures exist only in this diagnostic server. They never
// ship in the production build or send contact messages to a real recipient.
const server = await createServer({
  server: { host: "localhost", port: 5188, strictPort: true },
  plugins: [
    {
      name: "behavior-check-fixtures",
      configureServer(server) {
        server.middlewares.use("/checks/submission", (request, response) => {
          const result = new URL(
            request.url,
            "http://localhost",
          ).searchParams.get("result");
          let body = "";
          request.on("data", (chunk) => {
            body += chunk;
          });
          request.on("end", () => {
            if (
              request.method !== "POST" ||
              !new URLSearchParams(body).get("form-name")
            ) {
              response.writeHead(400).end("Invalid form");
              return;
            }
            if (result === "disconnect") {
              response.destroy();
              return;
            }
            const timer = setTimeout(
              () => {
                response.writeHead(result === "rejected" ? 503 : 200, {
                  "Content-Type": "text/html",
                });
                response.end(
                  result === "rejected"
                    ? "Unavailable"
                    : "Submission accepted by local test fixture",
                );
              },
              result === "slow" ? 20000 : 250,
            );
            response.on("close", () => clearTimeout(timer));
          });
        });
      },
    },
  ],
});
await server.listen();
console.log(
  "Open http://localhost:5188/checks/browser.html in Safari or Chrome.",
);
console.log(
  "Checks report behavior and compositing hit tests; no screenshots are taken.",
);
