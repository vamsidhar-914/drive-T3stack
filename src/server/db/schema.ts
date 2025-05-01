import { singlestoreTable, int,text, singlestoreTableCreator, bigint, timestamp } from "drizzle-orm/singlestore-core";
import { index } from "node_modules/drizzle-orm/singlestore-core";
 
export const createTable = singlestoreTableCreator((name) => `drive-t3_${name}`)

export const files = createTable("files_table", {
  id: bigint("id",{ mode: 'number',unsigned: true }).primaryKey().autoincrement(),
  ownerId: text('owner_id').notNull(),
  name: text("name"),
  size: int("size"),
  url: text("url"),
  parent: bigint("parent",{ mode: 'number',unsigned: true }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
} , (t) => {
  return [
    index("parent_index").on(t.parent),
    index('owner_id_index').on(t.ownerId)
  ]
})

export const folders = createTable("folders_table",{
  id: bigint("id",{ mode: 'number', unsigned: true }).primaryKey().autoincrement(),
  ownerId: text('owner_id').notNull(),
  name: text("name").notNull(),
  parent: bigint("parent",{ mode: 'number', unsigned: true }),
  createdAt: timestamp('created_at').notNull().defaultNow()
} , (t) => {
  return [
    index("parent_index").on(t.parent),
    index('owner_id_index').on(t.ownerId)
  ]
})
