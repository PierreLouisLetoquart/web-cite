export type BibTeXEntry = {
  entryType: string;
  key: string;
  fields: { [key: string]: string };
};

export type CitationResponse = {
  bibtex: string;
  endnote: string;
  plaintext: string;
};
