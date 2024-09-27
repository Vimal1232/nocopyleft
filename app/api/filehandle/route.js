import dbconnect from "@/Db/dbconfig";
import file from "@/Models/fileModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formdata = await req.formData();

    const sessionId = formdata.get("sessionId");
    const fileId = formdata.get("fileId");
    const data = formdata.get("data");

    const arraybuffer = await data.arrayBuffer();
    const buffer = Buffer.from(arraybuffer);

    await dbconnect();

    await file.create({
      sessionId,
      fileId,
      data: buffer,
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error" });
  }
}
