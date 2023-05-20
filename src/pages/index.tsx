import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { NavBar } from "~/components/NavBar";

const Home: NextPage = () => {
  return <h1>home</h1>;
};

export default Home;
