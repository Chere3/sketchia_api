import { Request, Response, Router } from "express";
import * as fresh from "fresh";

const router = Router();



router.get("*", (req, res) => {
    

    if (isFresh(req, res)) {
        res.status(304).end();
        return; 
        
    }

    res.status(200).sendFile(process.cwd() + "/src/public" + req.path, (err) => {
        console.log(process.cwd() + "/src/public" + req.path);
        if (err) res.status(404).json({message: "El archivo no existe.", status: 404});
    });
});


function isFresh(req: Request, res: Response) {
    return fresh(req.headers,  {
        'etag': res.getHeader('ETag'),
        'last-modified': res.getHeader('Last-Modified')
    })
}


module.exports = router;
