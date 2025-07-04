import { addAlbum, getAlbumById, listAlbum, removeAlbum } from "../controllers/albumController.js";
import express from "express";
import upload from "../middleware/multer.js";

const albumRouter = express.Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.get('/list/:id', getAlbumById);
albumRouter.delete('/remove/:id', removeAlbum)


export default albumRouter;

//1234