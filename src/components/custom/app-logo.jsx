import { Link } from "react-router-dom";

export default function AppLogo() {
  return (
    <Link
      to={"/"}
      className={"flex items-center h-[65px] justify-center gap-2"}
    >
      <img
        className={"w-[35px] md"}
        src={"src/assets/logo/logo_tunas_nusantara.png"}
        alt={"logo"}
      />

      <span className={"poppins-bold text-2xl lg:text-2xl"}>Forum Tani ID</span>
    </Link>
  );
}
