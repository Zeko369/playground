import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";

import nextConnect from "next-connect";
import { NextApiRequest } from "next";
import multer from "multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp/stemi",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

export interface UploadReq extends NextApiRequest {
  file: Express.Multer.File;
}

export const getHandler = () =>
  nextConnect({
    onNoMatch(req, res) {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: `Method '${req.method}' Not Allowed` }));
    },
  });

const handler = getHandler();

export type ApiAnalyzeOk = {
  status: "success";
};
export type ApiAnalyzeError = { status: "error"; error: string };
export type ApiAnalyze = ApiAnalyzeOk | ApiAnalyzeError;

handler.use(upload.single("file"));
handler.post(async (req: UploadReq, res) => {
  try {
    const { filename } = req.file;

    const transaction = [];

    fs.createReadStream(filename)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
        console.log(row);

        // add prisma thingy here
        transaction.push(row);
      })
      .on("end", (rowCount: number) => {
        // run prisma transaction here
        console.log(`Parsed ${rowCount} rows`);
      });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        status: "success",
      })
    );
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        status: "error",
        error: err,
      })
    );
  }
});

export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
