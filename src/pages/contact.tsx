import { type NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen min-w-full flex-grow place-content-center p-2">
      <ul className="flex min-h-screen flex-col place-content-center items-center gap-4 p-2">
        <li>
          <Link href="mailto:caiarnold8@gmail.com">email me!</Link>
        </li>
        <li>
          <Link href="https://linkedin.com">linkedin</Link>
        </li>
        <li>
          <Link href="https://github.com">github</Link>
        </li>
        <li>
          <Link href="https://venmo.com">buy me a drink or something</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
