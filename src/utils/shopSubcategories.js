const slugify = (value) => value?.toLowerCase().trim().replace(/\s+/g, "-") ?? "";

export const isHisOrHerSubcategory = (subcategory) => {
  const slug = slugify(subcategory?.slug ?? subcategory?.name);
  return slug === "his" || slug === "her";
};

export const extractHisHerSubcategories = (items = []) => {
  const map = new Map();

  items.forEach((item) => {
    const source = item?.subcategory ?? item;
    if (!source) return;

    const slug = slugify(source.slug ?? source.name);
    if ((slug !== "his" && slug !== "her") || map.has(slug)) return;

    map.set(slug, {
      id: source.id ?? slug,
      slug,
      name: source.name ?? (slug === "his" ? "His" : "Her"),
    });
  });

  return [...map.values()];
};

export const hasHisHerSubcategory = (items = []) => extractHisHerSubcategories(items).length > 0;
