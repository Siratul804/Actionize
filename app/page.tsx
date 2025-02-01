import "./home.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className=" p-4 ">
        <h1 className="text-5xl font-bold tracking-tight text-[#131316] relative">
          Welcome to Actionize
        </h1>

        <p className="text-[#5E5F6E] pt-3 pb-6 max-w-[30rem] text-[1.0625rem] relative">
          A simple and powerful task management tool for teams.
        </p>
        <div className="relative flex gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
          >
            Get Started
          </Link>
          {/* <Link
            href="/sign-up"
            className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
          >
            Sing Up
          </Link> */}
        </div>
      </main>
    </>
  );
}
