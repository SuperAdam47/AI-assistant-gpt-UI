import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="AI Chat powered by Mixtral MOE and Together.ai."
          />
          <meta property="og:site_name" content="simple AI assistant" />
          <meta
            property="og:description"
            content="AI Chat powered by Mixtral MOE and Together.ai."
          />
          <meta property="og:title" content="simple AI assistant" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="simple AI assistant" />
          <meta
            name="twitter:description"
            content="AI Chat powered by Mixtral MOE and Together.ai."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
