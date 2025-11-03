import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mockCases } from "../shared/mock-data";
import type { Case, Discipline, Difficulty } from "../shared/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =
  process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

app.use(express.json());

const favorites = new Set<string>();

app.get("/api/cases", (req, res) => {
  try {
    const {
      search,
      disciplines,
      tags,
      difficulty,
      favorites: showFavorites,
    } = req.query;

    let filteredCases = mockCases.map(c => ({
      ...c,
      isFavorite: favorites.has(c.id),
    }));

    if (search) {
      const searchLower = String(search).toLowerCase();
      filteredCases = filteredCases.filter(
        c =>
          c.title.toLowerCase().includes(searchLower) ||
          c.keyInsight.toLowerCase().includes(searchLower) ||
          c.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          c.problem.toLowerCase().includes(searchLower) ||
          c.solution.toLowerCase().includes(searchLower)
      );
    }

    if (disciplines) {
      const disciplineList = String(disciplines).split(",") as Discipline[];
      filteredCases = filteredCases.filter(c =>
        disciplineList.includes(c.discipline)
      );
    }

    if (tags) {
      const tagList = String(tags).split(",");
      filteredCases = filteredCases.filter(c =>
        tagList.some(tag => c.tags.includes(tag))
      );
    }

    if (difficulty) {
      const difficultyList = String(difficulty).split(",") as Difficulty[];
      filteredCases = filteredCases.filter(c =>
        difficultyList.includes(c.difficulty)
      );
    }

    if (showFavorites === "true") {
      filteredCases = filteredCases.filter(c => c.isFavorite);
    }

    res.json(filteredCases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Failed to fetch cases" });
  }
});

app.post("/api/cases/:id/favorite", (req, res) => {
  try {
    const { id } = req.params;
    const caseItem = mockCases.find(c => c.id === id);

    if (!caseItem) {
      return res.status(404).json({ error: "Case not found" });
    }

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }

    res.json({
      id,
      isFavorite: favorites.has(id),
      message: favorites.has(id)
        ? "Added to favorites"
        : "Removed from favorites",
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
});

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
