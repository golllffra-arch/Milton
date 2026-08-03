const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const p = new PrismaClient();
async function main() {
  const hash = await bcrypt.hash("milton", 10);
  const res = await p.user.updateMany({
    where: { role: { in: ["SUPER_ADMIN", "ADMIN", "ACCOUNTANT", "FACULTY"] } },
    data: { password: hash },
  });
  console.log("Resetted staff passwords to 'milton':", res.count, "accounts");
  await p.$disconnect();
}
main().catch((e) => {
  console.error("ERROR:", e.message.split("\n")[0]);
  process.exit(1);
});