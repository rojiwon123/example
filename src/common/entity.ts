import typia from "typia";

export interface Entity {
    id: string;
    createdAt: string & typia.tags.Format<"date-time">;
    updatedAt: string & typia.tags.Format<"date-time">;
    deletedAt: (string & typia.tags.Format<"date-time">) | null;
}
