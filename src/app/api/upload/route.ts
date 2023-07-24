// import { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import path from "path";

// const uploadDir = "./public/categories";

// export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//   // export async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // if (req.method === "POST") {
//   const file = req.body.file;
//   if (!file) {
//     // return res.status(400).json({ message: "No file received" });
//   }

//   if (!fs.existsSync(uploadDir)) {
//     // Create the upload directory if it doesn't exist
//     try {
//       fs.mkdirSync(uploadDir);
//     } catch (err) {
//       console.error("Error creating directory:", err);
//       // return res.status(500).json({ message: "Error creating directory" });
//     }
//   }

//   const imageExtension = file.name.split(".").pop(); // Get the file extension
//   if (!imageExtension) {
//     // return res.status(400).json({ message: "Invalid file name" });
//   }

//   const imageName = `${Date.now()}.${imageExtension}`; // Generate a unique image name
//   const filePath = path.join(uploadDir, imageName); // Construct the file path

//   // Save the file to the server
//   fs.writeFile(filePath, file.data, (err) => {
//     if (err) {
//       console.error("Error saving file:", err);
//       // return res.status(500).json({ message: "Error saving file" });
//     } else {
//       console.log("File saved successfully");
//       // return res
//       //   .status(200)
//       //   .json({ message: "File uploaded and saved successfully" });
//     }
//   });
//   // } else {
//   //   return res.status(405).end(); // Method Not Allowed
//   // }
// };

// import mime from "mime";
// import { join } from "path";
// import { stat, mkdir, writeFile } from "fs/promises";

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const formData = await request.formData();

//   const file = formData.get("file") as Blob | null;
//   if (!file) {
//     return NextResponse.json(
//       { error: "File blob is required." },
//       { status: 400 }
//     );
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
//   const uploadDir = join(process.cwd(), "public", relativeUploadDir);

//   try {
//     await stat(uploadDir);
//   } catch (e: any) {
//     if (e.code === "ENOENT") {
//       await mkdir(uploadDir, { recursive: true });
//     } else {
//       console.error(
//         "Error while trying to create directory when uploading a file\n",
//         e
//       );
//       return NextResponse.json(
//         { error: "Something went wrong." },
//         { status: 500 }
//       );
//     }
//   }

//   try {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     const filename = `${file.name.replace(
//       /\.[^/.]+$/,
//       ""
//     )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
//     await writeFile(`${uploadDir}/${filename}`, buffer);
//     return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
//   } catch (e) {
//     console.error("Error while trying to upload a file\n", e);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 }
//     );
//   }
// }

//https://codersteps.com/articles/building-a-file-uploader-from-scratch-with-next-js-app-directory
