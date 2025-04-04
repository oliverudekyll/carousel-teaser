import Image from "next/image";

import IconsOverlay from "@components/IconsOverlay/IconsOverlay";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["page"]}>
      <IconsOverlay />
      <main className={styles["main"]}>
        <h1 className={styles["title"]}>the carousel is arriving soon.</h1>
      </main>
    </div>
  );
}
