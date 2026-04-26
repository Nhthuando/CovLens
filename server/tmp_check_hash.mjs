import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const u = await prisma.user.findFirst({
  orderBy: { createdAt: "desc" },
  select: { email: true, passwordHash: true },
});

console.log(
  JSON.stringify({
    email: u?.email,
    passwordHashPreview: u?.passwordHash?.slice(0, 12),
    isPlainPassword123: u?.passwordHash === "Password123",
  })
);

await prisma.$disconnect();
