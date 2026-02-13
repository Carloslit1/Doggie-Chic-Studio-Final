const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productosRoutes = require("./routes/productos.routes");
const { connectDB } = require("./db");

const app = express();

/* MIDDLEWARES */
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

/* DB middleware */
app.use(async (req, res, next) => {
  if (req.path === "/health" || req.path === "/__version") return next();

  try {
    await connectDB();
    next();
  } catch (e) {
    return res.status(500).json({ error: "Error conectando a MongoDB" });
  }
});

/* RUTAS */
app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);

/* HEALTH */
app.get("/health", (req, res) => {
  res.json({ ok: true, msg: "health-ok" });
});

app.get("/__version", (req, res) => {
  res.json({
    ok: true,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    now: new Date().toISOString(),
  });
});

/* 404 */
app.use((req, res) =>
  res.status(404).json({ error: "Ruta no encontrada" })
);

module.exports = app;

