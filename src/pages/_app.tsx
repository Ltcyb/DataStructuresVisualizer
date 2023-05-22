import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { NavBar } from "~/components/NavBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Data Structures Visualizer</title>
        <meta
          name="description"
          content="This is a data structures visualizer"
        />
      </Head>
      <main>
        <div className="max-w-screen flex max-h-screen">
          {/* <NavBar /> */}
          <div className="flex-grow">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
