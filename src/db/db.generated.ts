import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Post = {
    id: Generated<number>;
    title: string;
    content: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp | null;
};
export type DB = {
    posts: Post;
};
