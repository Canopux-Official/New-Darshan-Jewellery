require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function renameOrCreate(oldSlug, newSlug, newName) {
  const oldCat = await prisma.category.findUnique({ where: { slug: oldSlug } });
  const newCat = await prisma.category.findUnique({ where: { slug: newSlug } });

  if (oldCat && !newCat) {
    await prisma.category.update({
      where: { id: oldCat.id },
      data: { slug: newSlug, name: newName, isActive: true },
    });
    console.log(`Renamed ${oldSlug} -> ${newSlug} (${newName})`);
    return;
  }
  if (oldCat && newCat) {
    await prisma.category.update({
      where: { id: newCat.id },
      data: { name: newName, isActive: true },
    });
    await prisma.category.update({
      where: { id: oldCat.id },
      data: { isActive: false },
    });
    console.log(`Ensured ${newSlug} active; deactivated ${oldSlug}`);
    return;
  }
  if (!oldCat && !newCat) {
    await prisma.category.create({
      data: { slug: newSlug, name: newName, isActive: true },
    });
    console.log(`Created ${newSlug} (${newName})`);
    return;
  }
  await prisma.category.update({
    where: { id: newCat.id },
    data: { name: newName, isActive: true },
  });
  console.log(`Updated existing ${newSlug} (${newName})`);
}

async function upsertActive(slug, name) {
  await prisma.category.upsert({
    where: { slug },
    update: { name, isActive: true },
    create: { slug, name, isActive: true },
  });
  console.log(`Upserted active: ${slug}`);
}

async function main() {
  console.log("=== Category sync start ===");

  await renameOrCreate("bracelets", "gold-bracelets", "Gold Bracelets");
  await renameOrCreate("silver-collection", "silver-bracelets", "Silver Bracelets");
  await renameOrCreate("pendants", "gold-pendants", "Gold Pendants");

  const actives = [
    ["bridal-collection", "Bridal Collection"],
    ["gold-necklaces", "Gold Necklaces"],
    ["gold-chains", "Gold Chains"],
    ["bangles", "Bangles"],
    ["gold-bracelets", "Gold Bracelets"],
    ["earrings", "Gold Earrings"],
    ["gold-pendants", "Gold Pendants"],
    ["silver-bracelets", "Silver Bracelets"],
  ];
  for (const [slug, name] of actives) {
    await upsertActive(slug, name);
  }

  const deactivateSlugs = [
    "temple-jewellery",
    "mangalsutra",
    "gold-rings",
    "pendants",
    "bracelets",
    "silver-collection",
    "kids-collection",
    "daily-wear-collection",
    "coins",
  ];
  for (const slug of deactivateSlugs) {
    const r = await prisma.category.updateMany({
      where: { slug },
      data: { isActive: false },
    });
    if (r.count > 0) console.log(`Deactivated: ${slug}`);
  }

  const active = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    select: { name: true, slug: true },
  });
  console.log("\n=== Active categories ===");
  active.forEach((c) => console.log(`- ${c.name} (${c.slug})`));
  console.log(`Total active: ${active.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
