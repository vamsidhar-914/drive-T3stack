import { singlestoreTable, int,text } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("user_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age")
})

