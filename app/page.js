import Image from "next/image";

import IconsOverlay from "@components/IconsOverlay/IconsOverlay";
import RainbowWipeCanvas from "@components/RainbowWipeCanvas/RainbowWipeCanvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["page"]}>
      <main className={styles["main"]}>
        <div className={styles["title-container"]}>
          <RainbowWipeCanvas direction="left" strokeWhite />
          <h1 className={styles["title"]}>the carousel is arriving soon.</h1>
        </div>
      </main>
      <IconsOverlay />
    </div>
  );
}
