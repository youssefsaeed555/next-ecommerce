import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="E-commerece application sell some products "
        />
        <meta name="keywords" content="E-commerce application" />
        <meta name="author" content="youssef saeed" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>E-commerece</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
