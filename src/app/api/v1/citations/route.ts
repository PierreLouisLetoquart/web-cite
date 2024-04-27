import { type VideoListResponse } from "@/lib/youtube.types";
import {
  formatBibTeXEntry,
  videoToBibTeX,
  videoToEndNoteXML,
  videoToPlainTextCitation,
} from "@/lib/utils";

export async function POST(req: Request) {
  const { url } = await req.json();
  const yt_url = new URL(url);

  if (yt_url.hostname !== "www.youtube.com") {
    return new Response("Invalid Youtube URL", { status: 400 });
  }

  const videoId = yt_url.searchParams.get("v");

  if (!videoId) {
    return new Response("Video's ID missing in the url", { status: 400 });
  }

  const apiKey = process.env.GOOGLE_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,id,snippet,statistics,status&id=${videoId}&key=${apiKey}`,
  );

  const data = (await response.json()) as VideoListResponse;

  if (data.items.length === 0) {
    return new Response("Video not found", { status: 404 });
  }

  const video = data.items[0];

  const bibtexEntry = videoToBibTeX(video);
  const formattedBibtex = formatBibTeXEntry(bibtexEntry);
  const endNoteXML = videoToEndNoteXML(video);
  const plaintext = videoToPlainTextCitation(video);

  return new Response(
    JSON.stringify({
      bibtex: formattedBibtex,
      endnote: endNoteXML,
      plaintext: plaintext,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
