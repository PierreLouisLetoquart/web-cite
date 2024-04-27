import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function videoToBibTeX(video: Video): BibTeXEntry {
  const authors = video.snippet.channelTitle;
  const title = `"${video.snippet.title}"`;
  const year = video.snippet.publishedAt.substring(0, 4);
  const month = video.snippet.publishedAt.substring(5, 7);
  const day = video.snippet.publishedAt.substring(8, 10);
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const accessed = new Date().toISOString().slice(0, 10);

  const fields: { [key: string]: string } = {
    author: authors,
    title: title,
    year: year,
    month: month,
    day: day,
    url: url,
    urldate: accessed,
  };

  return {
    entryType: "misc",
    key: video.id,
    fields: fields,
  };
}

export function formatBibTeXEntry(entry: BibTeXEntry): string {
  const fields = Object.entries(entry.fields)
    .map(([key, value]) => `  ${key} = {${value}},`)
    .join("\n");

  return `@${entry.entryType}{${entry.key},\n${fields}\n}`;
}

export function videoToEndNoteXML(video: Video): string {
  const authors = video.snippet.channelTitle;
  const title = video.snippet.title;
  const year = video.snippet.publishedAt.substring(0, 4);
  const month = video.snippet.publishedAt.substring(5, 7);
  const day = video.snippet.publishedAt.substring(8, 10);
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const accessed = new Date().toISOString().slice(0, 10);

  const xml = `
<record>
  <rec-number>1</rec-number>
  <contributors>
    <authors>
      <author>
        <last-name>${authors}</last-name>
      </author>
    </authors>
  </contributors>
  <titles>
    <title>${title}</title>
  </titles>
  <dates>
    <year>${year}</year>
    <month>${month}</month>
    <day>${day}</day>
  </dates>
  <electronic-article-material>
    <url>${url}</url>
    <date-accessed>${accessed}</date-accessed>
  </electronic-article-material>
</record>
`;

  return xml;
}

export function videoToPlainTextCitation(video: Video): string {
  const authors = video.snippet.channelTitle;
  const title = `"${video.snippet.title}"`;
  const year = video.snippet.publishedAt.substring(0, 4);
  const month = video.snippet.publishedAt.substring(5, 7);
  const day = video.snippet.publishedAt.substring(8, 10);
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const accessed = new Date().toISOString().slice(0, 10);

  const citation = `${authors}. ${title}. ${year}-${month}-${day}. Available at: ${url}. Accessed on: ${accessed}.`;

  return citation;
}
