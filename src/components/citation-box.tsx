import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";
import { CopyIcon } from "@radix-ui/react-icons";
import { CitationResponse } from "@/lib/citations.types";

export type Citation = {
  type: "bibtex" | "endnote" | "plaintext";
  content: string;
};

export function CitationBox({ citations }: { citations: CitationResponse }) {
  return (
    <Tabs defaultValue="bibtex" className="w-full max-w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bibtex">Bibtex</TabsTrigger>
        <TabsTrigger value="plaintext">Plaintext</TabsTrigger>
      </TabsList>

      <TabsContent value="bibtex">
        <CitationCard type="bibtex" content={citations.bibtex} />
      </TabsContent>

      <TabsContent value="plaintext">
        <CitationCard type="plaintext" content={citations.plaintext} />
      </TabsContent>
    </Tabs>
  );
}

export function CitationCard({ type, content }: Citation) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "bibtex"
            ? "Bibtex"
            : type === "endnote"
              ? "Endnote"
              : "Plaintext"}
        </CardTitle>
        <CardDescription>
          {type === "bibtex"
            ? "Bibtex citation for an article, a normal format for academic papers"
            : type === "endnote"
              ? "Endnote citation for an article, a normal format for academic papers"
              : "Plaintext citation for an article, not the best format..."}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Textarea rows={7} className="resize-none" value={content} />
        <Button
          className="absolute top-2 right-8 z-50"
          size={"icon"}
          variant={"ghost"}
          onClick={() => navigator.clipboard.writeText(content)}
        >
          <CopyIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
