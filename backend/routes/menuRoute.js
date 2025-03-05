import express from "express"
import { addMenu, removeMenu ,listMenu,updateMenu} from "../controllers/menuController.js"
import multer from "multer"

const menuRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

menuRouter.post("/addMenu",upload.single("image"),addMenu);
menuRouter.get("/listMenu",listMenu);
menuRouter.put("/updateMenu/:id",updateMenu);
menuRouter.delete("/removeMenu/:id",removeMenu);


export default menuRouter;