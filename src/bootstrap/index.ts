import * as main from "./main.bootstrap";
import * as worker from "./worker.bootstrap";

export const bootstrap = {
    main: main.bootstrap,
    worker: worker.bootstrap,
} as const;
