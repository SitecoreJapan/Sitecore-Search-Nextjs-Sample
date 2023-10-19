const axios = require("axios");
import type { NextApiRequest, NextApiResponse } from "next";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query as { url: string };
  const NEXT_PUBLIC_PLAYWRIGHT = process.env.NEXT_PUBLIC_PLAYWRIGHT;

  const AZURE_STORAGE_ACCOUNT = process.env["AZURE_STORAGE_ACCOUNT"] || "";
  const AZURE_STORAGE_ACCESS_KEY =
    process.env["AZURE_STORAGE_ACCESS_KEY"] || "";
  const AZURE_STORAGE_CONTAINER = process.env["AZURE_STORAGE_CONTAINER"] || "";

  let domain: string | null = null;
  let path: string | null = null;
  let filename: string | null = null;

  // domain check
  try {
    if (typeof url === "string") {
      const parsedUrl = new URL(url);
      domain = parsedUrl.hostname;
      path = parsedUrl.pathname;

      if (!/\..{2,}$/.test(domain)) {
        throw new Error("Invalid URL: Domain is not correct");
      }

      // If the first character is /, remove
      path = path.substring(1);

      // If path is less than 1 character, rewrite it to index
      filename = path.replace(/\./g, "_").replace(/\//g, "_");

      // If the last character of filename is _, delete
      if (filename.endsWith("_")) {
        filename = filename.slice(0, -1);
      }

      if (filename.length <= 1) {
        filename = "index";
      }
    } else {
      throw new Error("Invalid URL");
    }
  } catch (error) {
    console.log(error);

    // Returns the response if an error occurs
    return { status: 400, body: "Invalid URL" };
  }

  // Azure Blob Storageの認証情報を作成
  const sharedKeyCredential = new StorageSharedKeyCredential(
    AZURE_STORAGE_ACCOUNT,
    AZURE_STORAGE_ACCESS_KEY
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const containerClient = blobServiceClient.getContainerClient(
    AZURE_STORAGE_CONTAINER
  );

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(
      domain + "/" + filename + ".png"
    );
    const exists = await blockBlobClient.exists();

    if (!exists) {
      const externalApiUrl =
        NEXT_PUBLIC_PLAYWRIGHT + "/api/screenshot?url=" + url;
      const response = await axios.get(externalApiUrl);
      const imageData = response.data.screenshot;
      const decodedImageData = Buffer.from(imageData, "base64");

      await blockBlobClient.uploadData(decodedImageData);
      console.log("Image was uploaded");

      res.setHeader("Content-Type", "image/png");
      res.status(200).end(decodedImageData, "binary");
    } else {
      const downloadResponse = await blockBlobClient.downloadToBuffer();

      console.log("file is exist");

      res.setHeader("Content-Type", "image/png");
      res.status(200).end(downloadResponse, "binary");
    }
  } catch (error) {
    return res.status(500).json({ error: "Can't get content data" });
  }
}
