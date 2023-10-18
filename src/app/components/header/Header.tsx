
import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className="w-full fixed flex justify-between lg:px-[15%] px-8 h-16 bg-black/80 backdrop-blur-sm z-20 items-center">
      <div className="flex gap-2 items-center justify-start w-full">
        <HeaderNav
          dest="/"
          text="UI"
          img
          imgUrl="https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/8f1de774-9de9-4eea-bc6d-33350df3edd2/UI-signet/w=3840,quality=80"
        />
        <nav className="flex gap-1">
          <HeaderNav dest="/public" text="public" />
          <HeaderNav dest="/ui" text="UI" />
        </nav>
      </div>

    </header>
  );
};

export default Header;
