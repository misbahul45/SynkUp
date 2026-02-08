import { sql } from "drizzle-orm";
import db from "../databases/init";

export async function resetDatabase() {
  const tables = await db.execute(sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = DATABASE();
  `);

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`);

  for (const row of tables[0] as any[]) {
    await db.execute(sql.raw(`TRUNCATE TABLE \`${row.TABLE_NAME}\`;`));
  }

  await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
}
