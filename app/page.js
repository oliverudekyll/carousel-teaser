import Image from "next/image";

import IconsOverlay from "@components/IconsOverlay/IconsOverlay";
import RainbowWipeCanvas from "@components/RainbowWipeCanvas/RainbowWipeCanvas";
import LoadingOverlay from "@components/LoadingOverlay/LoadingOverlay";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["page"]}>
      <LoadingOverlay />
      <main className={styles["main"]}>
        <div className={styles["title-container"]}>
          <h1 className={styles["title"]}>the carousel is arriving soon.</h1>
        </div>
      </main>
      <RainbowWipeCanvas direction="left" strokeWhite={false} />
      <IconsOverlay />
    </div>
  );
}
