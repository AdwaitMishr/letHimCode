import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type FileRecord = Record<string, string>;

interface FileTree {
  [key: string]: FileTree | null;
}

/**
 * Convert a record of files to a tree structure.
 * @param files - Record of file paths to content
 * @returns Tree structure for TreeView component
 */
export function convertFilesToTreeItems(files: FileRecord) {
  
  const tree: FileTree = {};
  
  const sortedPaths = Object.keys(files).sort();

  for (const filePath of sortedPaths) {
    const parts = filePath.split("/");
    let current: FileTree = tree; 

    // Navigate/create the tree structure
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      
      // If folder doesn't exist, create it
      if (!current[part]) {
        current[part] = {};
      }

      // Move pointer deeper
      // We cast as FileTree because we know we just created {} above if it was missing
      current = current[part] as FileTree;
    }

    // Add the file (leaf node)
    const fileName = parts[parts.length - 1];
    current[fileName] = null; // null indicates it's a file
  }

  // Convert tree structure to TreeItem format
  function convertNode(node: FileTree, name?: string): any[] {
    const entries = Object.entries(node);

    // Base case (though unlikely to hit with current logic unless empty)
    if (entries.length === 0) {
      return name ? [name] : []; 
    }

    const children: any[] = [];

    for (const [key, value] of entries) {
      if (value === null) {
        // It's a file -> push string
        children.push(key);
      } else {
        // It's a folder -> recurse
        const subTree = convertNode(value, key);
        
        // This specific formatting logic creates [Folder, [Child1, Child2]] structure
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        } else {
          children.push([key, subTree]);
        }
      }
    }

    return children;
  }

  const result = convertNode(tree);
  return result; // It returns a nested array structure
}