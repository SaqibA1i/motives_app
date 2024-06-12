import { Stack } from "../Stack";
import { ApplicationsIcon, HomeIcon, SettingsIcon } from "./NavIcons";
import style from "./Navbar.module.css";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  if (router.asPath === "/login" || router.asPath === "/signup") {
    return null;
  }
  return (
    <Stack className={style.Navbar} gap="1.5rem" padding="0.7rem">
      <HomeIcon
        className={
          router.asPath == "/" ||
          router.asPath.includes("house_type") ||
          router.asPath.includes("lot?") ||
          router.asPath.includes("house?")
            ? style.ShownIcon
            : undefined
        }
        onClick={() => router.push("/")}
      />

      <ApplicationsIcon
        className={
          router.asPath.includes("applications") ? style.ShownIcon : undefined
        }
        onClick={() => router.push("/applications")}
      />
      <SettingsIcon
        className={router.asPath === "/settings" ? style.ShownIcon : undefined}
        onClick={() => router.push("/settings")}
      />
    </Stack>
  );
};
