import { PropsWithChildren } from "react";
import styles from "./Count.module.css";
import { displayCount } from "./util";

export interface Props extends PropsWithChildren {
  count: number;
}

export const Count = ({ count }: Props) => {
  return <div className={styles.Count}>{displayCount(count)}</div>;
};
