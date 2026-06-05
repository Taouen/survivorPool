import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html data-theme="survivor-dark">
      <Head />
      <body className="bg-base-200 text-base-content">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
