import express from "express";
import cors from "cors";
import followRoutes from "./src/routes/follow.routes.js";
import genreRoutes from "./src/routes/genre.routes.js";
import likeRoutes from "./src/routes/like.routes.js";
import music_genreRoutes from "./src/routes/music_genre.routes.js";
import musicRoutes from "./src/routes/music.routes.js";
import playlist_likeRoutes from "./src/routes/playlist_like.routes.js";
import playlist_musicRoutes from "./src/routes/playlist_music.routes.js";
import playlistRoutes from "./src/routes/playlist.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/music", musicRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/music_genre", music_genreRoutes);
app.use("/api/playlist_like", playlist_likeRoutes);
app.use("/api/playlist_music", playlist_musicRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/users", userRoutes);

export default app;
