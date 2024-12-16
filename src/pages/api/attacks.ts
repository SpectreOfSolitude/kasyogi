import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb"; // Sesuaikan path ke lib/mongodb.ts

type Data = {
  success: boolean;
  data?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Koneksi ke MongoDB
    const client = await clientPromise;
    const db = client.db("mnemosyne"); // Nama database Anda
    const collection = db.collection("session"); // Nama koleksi Anda (sesuaikan)

    // Ambil semua data dari koleksi
    const data = await collection.find({}).toArray();

    // Kirim respon sukses
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: "Database connection error" });
  }
}