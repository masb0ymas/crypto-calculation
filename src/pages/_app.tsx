import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/nprogress/styles.css";
import "dayjs/locale/id";

import { localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { AppProps } from "next/app";
import Head from "next/head";
import env from "~/config/env";
import MyRouterTransition from "~/core/components/MyRouterTransition";
import { theme } from "~/core/styles/theme";
import siteLayout from "~/layouts";

const colorSchemeManager = localStorageColorSchemeManager({
  key: `${env.APP_PREFIX}_colorScheme`,
});

const title = env.APP_NAME;
const description = `${title} - Calculation for Web3 DeFi`;

const metaURL = env.APP_SITE_URL;
const metaImage = "/static/currency-market.png";
const webIconURL = "/static/currency-market.png";

export default function App(props: AppProps) {
  const rootLayout = siteLayout(props);

  return (
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <link rel="icon" href={webIconURL} />
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaURL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={metaImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={metaURL} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={metaImage} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MyRouterTransition />

      <DatesProvider settings={{ locale: "id" }}>
        {/* load root layout */}
        {rootLayout}
      </DatesProvider>
    </MantineProvider>
  );
}
