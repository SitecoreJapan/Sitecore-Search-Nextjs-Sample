import HeaderInput from "@/components/HeaderInput";
import LocaleSelector from "@/components/LocaleSelector";

export default function Header() {
  return (
    <div>
      <LocaleSelector />
      <HeaderInput />
    </div>
  );
}
