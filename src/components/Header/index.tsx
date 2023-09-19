import HeaderInput from "@/components/HeaderInput";
import LocaleSelector from "@/components/LocaleSelector";
import ThemeSwitcher from "@/components/Button/ThemeSwitcher";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-2 md:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <Image
                  src="/sitecore.svg"
                  width="180"
                  height="55"
                  alt="Next.js"
                  className=" hidden md:block"
                />
              </Link>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-xs">
              <HeaderInput />
            </div>
          </div>
          <div className="relative z-10 flex items-center">
            <div className="mx-4">
              <LocaleSelector />
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
