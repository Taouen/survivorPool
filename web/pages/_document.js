import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html data-theme="survivor-dark" className="bg-base-300 text-base-content">
      <Head />
      <body className="w-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
