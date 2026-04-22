import type { NextApiRequest, NextApiResponse } from "next";
import getMongoClient from "../../lib/mongodb";

const COLLECTION =
  process.env.MONGODB_ANALYSIS_LOG_COLLECTION || "analysis_log";

type Body = {
  message?: string;
  content?: string;
};

function getClientIp(req: NextApiRequest): string | null {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() || null;
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0]?.split(",")[0]?.trim() || null;
  }
  const raw = req.socket?.remoteAddress;
  return raw ?? null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body as Body;
  const raw =
    typeof body.message === "string"
      ? body.message
      : typeof body.content === "string"
        ? body.content
        : "";
  const message = raw.trim();
  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  const userAgent =
    typeof req.headers["user-agent"] === "string"
      ? req.headers["user-agent"]
      : null;

  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || "aiassistant";
    const db = client.db(dbName);
    await db.collection(COLLECTION).insertOne({
      message,
      messageLength: message.length,
      createdAt: new Date(),
      status: "pending_review",
      source: "simple_ai_assistant_web",
      userAgent,
      clientIp: getClientIp(req),
      reviewedAt: null,
      reviewedBy: null,
      adminNotes: null,
    });
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("save-chat:", err);
    return res.status(500).json({ error: "Failed to save analysis log" });
  }
}
