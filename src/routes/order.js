import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Koneksi Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// =========================
//      ROUTES /orders
// =========================

// GET semua order
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("tanggal_masuk", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET order by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: "Order tidak ditemukan" });
  res.json(data);
});

// POST tambah order baru
router.post("/", async (req, res) => {
  const { nama_pelanggan, nomor_telepon, nama_sepatu, tipe_layanan } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([{ nama_pelanggan, nomor_telepon, nama_sepatu, tipe_layanan }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PATCH ubah status order
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, tanggal_selesai } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({ status, tanggal_selesai })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE order
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Order berhasil dihapus" });
});

export default router;
