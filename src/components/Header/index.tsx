import HeaderInput from "@/components/HeaderInput";
import LocaleSelector from "@/components/LocaleSelector";
import ThemeSwitcher from "@/components/Button/ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="dark:bg-gray-900">
        <div className="flex flex-row h-16">
          <div className="basis-1/4 z-10 flex items-center">
            <Link href="/">
              <Image
                src="/sitecore.svg"
                width="180"
                height="55"
                alt="Next.js"
                className="hidden md:block"
              />
            </Link>
          </div>
          <div className="basis-1/2 z-0 flex items-center justify-center">
            <HeaderInput />
          </div>
          <div className="basis-1/4 z-10 flex items-center justify-end">
            <div className="mx-4">
              <LocaleSelector />
            </div>
            <div className="mx-4">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
