import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Head from 'next/head';

const font = DM_Sans({ subsets: ["latin"] });

const defaultCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
  </body>
</html>`;

export default function Home() {
  const [htmlCode, setHtmlCode] = useState(defaultCode.replace(/^\s*[\r\n]/gm, ""));

  const editCode = (value, event) => {
    setHtmlCode(value);
    const titleRegex = /<title>(.*?)<\/title>/;
    const titleMatch = value.match(titleRegex);
    if (titleMatch) {
      setTitle(titleMatch[1]);
    }
    const faviconRegex = /<link rel="icon" href="(.*?)"/;
    const faviconMatch = value.match(faviconRegex);
    if (faviconMatch) {
      setFavicon(faviconMatch[1]);
    }
  }

  const [title, setTitle] = useState("HTML Editor");
  const [favicon, setFavicon] = useState("/favicon.ico");


  const [hideEditor, setHideEditor] = useState(false);
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href={favicon} />
      </Head>

      <div className={`flex flex-col min-h-screen ${hideEditor ? "" : "grid grid-cols-2"}`}>
        <div className={`flex flex-col items-center justify-center ${hideEditor ? "hidden" : ""}`}>
          <Editor
            height="100vh"
            defaultLanguage="html"
            defaultValue={defaultCode}
            onChange={(value, event) => {
              editCode(value, event);
            }}
          />
        </div>
        <iframe
          srcDoc={htmlCode}
          className="w-full h-full"
        ></iframe>
      </div>
      
      <div className="fixed bottom-0 right-0 m-4">
        <button
          onClick={() => setHideEditor(!hideEditor)}
          className="p-2 bg-gray-800 text-white rounded-md"
        >
          {hideEditor ? "Show Editor" : "Hide Editor"}
        </button>
      </div>
    </>
  )
}