import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import {ILink, ILinkMutation} from "./types";
import Link from "./models/Link";
import random from "random-string-generator";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/links", async (req, res, next) => {
    try {
        const random = require('random-string-generator');
        const randomUrl: string = random(6, 'scoped:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        if (!req.body.originalUrl || req.body.originalUrl.trim() === "") {
            res.status(400).send({error: "Missing URL"});
            return;
        }

        const savedLink = await Link.findOne({originalUrl: req.body.originalUrl});

        if (savedLink) {
            res.send(savedLink);
            return;
        }

        const newLink: ILinkMutation = {
            shortUrl: randomUrl,
            originalUrl: req.body.originalUrl,
        }

        const link = new Link(newLink);
        await link.save();
        res.send(link);
    } catch (e) {
        next(e);
    }
});

app.get("/:shortUrl", async (req, res, next) => {
   try {
       const params = req.params.shortUrl;
       const link: ILink | null = await Link.findOne({shortUrl: params});

       if (!link) {
           res.status(404).send({error: "URL not found"});
           return;
       }

       res.status(301).redirect(link.originalUrl);
   } catch (e) {
       next(e);
   }
});

const run = async () => {
    await mongoose.connect('mongodb://localhost/short-link');

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);