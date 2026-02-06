import fs from "fs";
import path from "path";

export type MenuItem = {
  name: string;
  path?: string;
  children?: MenuItem[];
  pageOrder?: number;
  pageTitle?: string;
  requiresAuth?: boolean;
};

function extractPageInfo(filePath: string): Partial<MenuItem> {
  if (!fs.existsSync(filePath)) return {};

  const content = fs.readFileSync(filePath, "utf-8");

  const nameMatch = content.match(
    /export const pageName\s*=\s*["']([^"']+)["'];?/,
  );
  const titleMatch = content.match(
    /export const pageTitle\s*=\s*["']([^"']+)["'];?/,
  );
  const orderMatch = content.match(/export const pageOrder\s*=\s*(\d+);?/);
  const authMatch = content.match(
    /export const requiresAuth\s*=\s*(true|false);?/,
  );

  console.log("Extracting page info from:", filePath); // 경로 확인
  console.log("pageName:", nameMatch ? nameMatch[1] : "Not Found");
  console.log("pageTitle:", titleMatch ? titleMatch[1] : "Not Found");
  console.log("pageOrder:", orderMatch ? orderMatch[1] : "Not Found");
  console.log("requiresAuth:", authMatch ? authMatch[1] : "Not Found");

  return {
    name: nameMatch ? nameMatch[1] : undefined,
    pageTitle: titleMatch ? titleMatch[1] : undefined,
    pageOrder: orderMatch ? Number(orderMatch[1]) : undefined,
    requiresAuth: authMatch ? authMatch[1] === "true" : undefined,
  };
}

export function getMenuItems(baseDir = "app"): MenuItem[] {
  const dirPath = path.join(process.cwd(), baseDir);
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items: MenuItem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const subDir = path.join(baseDir, entry.name);
    const pageFile = path.join(process.cwd(), subDir, "page.tsx");

    const pageInfo = extractPageInfo(pageFile);
    const children = getMenuItems(subDir);

    const hasAnyProp =
      pageInfo.name ||
      pageInfo.pageTitle ||
      pageInfo.pageOrder !== undefined ||
      pageInfo.requiresAuth !== undefined;

    if (hasAnyProp) {
      const urlPath = subDir.replace(/^app[\\/]/, "").replace(/\\/g, "/");

      items.push({
        name: pageInfo.name || pageInfo.pageTitle || entry.name,
        path: pageInfo.name ? `/${urlPath}` : undefined,
        pageOrder: pageInfo.pageOrder,
        pageTitle: pageInfo.pageTitle,
        requiresAuth: pageInfo.requiresAuth,
        children: children.length > 0 ? children : undefined,
      });
    }
  }

  items.sort((a, b) => (a.pageOrder ?? 0) - (b.pageOrder ?? 0));

  return items;
}
