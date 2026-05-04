import { pgTableCreator } from "drizzle-orm/pg-core"

const TABLE_PREFIX = process.env.DRIZZLE_TABLE_PREFIX ?? ""

export const createTable = pgTableCreator(name => `${TABLE_PREFIX}${name}`)

export const prefixedName = (name: string) => `${TABLE_PREFIX}${name}`
