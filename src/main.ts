import { Config } from "@config/config.type";
import typia from "typia";
import { bootstrap } from "./bootstrap";

export const main = async () => {
    typia.assertGuard<Config["MODE"]>(process.env["MODE"]);
    const mode = process.env["MODE"];
    if (mode === "main") await bootstrap.main();
    if (mode === "worker") await bootstrap.worker();
};

void main();
