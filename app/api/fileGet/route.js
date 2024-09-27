import dbconnect from "@/Db/dbconfig";
import { NextResponse } from "next/server";
import file from "@/Models/fileModel";

import { arrayBufferToBlob } from "blob-util";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileID = searchParams.get("fileID");

    await dbconnect();
    const result = await file.findOne({ fileId: fileID });

    if (!result) {
      return NextResponse.json({ message: "File Not Found" });
    }
    const buffer = result.data;

    const Blob64 = buffer.toString("base64");

    const Response = {
      sessionId: result.sessionId,
      fileId: result.fileId,
      data: Blob64,
    };

    return NextResponse.json(Response);
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
}
