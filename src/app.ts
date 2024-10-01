import express from "express";
import recipeRoutes from "./routes/recipeRoutes";

const app = express();

app.use(express.json());

app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
