const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

// Omogući CORS
app.use(cors());

// Konfiguracija proxy-ja
const proxyOptions = {
	target: "https://titlovi.com",
	changeOrigin: true,
	pathRewrite: {
		"^/proxy": "",
	},
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
		Accept:
			"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
		"Accept-Language": "en-US,en;q=0.9",
		Cookie: "sid=1",
	},
};

// Proxy middleware
app.use("/proxy", createProxyMiddleware(proxyOptions));

// Health check endpoint
app.get("/health", (req, res) => {
	res.send("Proxy server is running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Proxy server running on port ${PORT}`);
});
