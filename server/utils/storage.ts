import fs from "node:fs";
import path from "node:path";

const storageRoot = path.resolve(import.meta.dirname, "..", "storage");

export function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function resolveStoragePath(...parts: string[]) {
  ensureDirectory(storageRoot);
  return path.join(storageRoot, ...parts);
}

export function ensureStorageDirectory(...parts: string[]) {
  const dir = resolveStoragePath(...parts);
  ensureDirectory(dir);
  return dir;
}

export function readJSONFile<T>(filePath: string, defaultValue: T): T {
  ensureDirectory(path.dirname(filePath));
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), "utf-8");
    return structuredClone(defaultValue);
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Failed to read JSON file at ${filePath}`, error);
    return structuredClone(defaultValue);
  }
}

export function writeJSONFile<T>(filePath: string, data: T) {
  ensureDirectory(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
