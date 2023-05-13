import { writable } from 'svelte/store';
  
    // Writable store for files
    export const filesStore = writable([]);
  
    export async function fetchInitialFiles() {
      // Update the files store with initial data
      filesStore.set([
        { name: 'File 1', folder: 'Folder 1' },
        { name: 'File 2', folder: 'Folder 1' },
        { name: 'File 3', folder: 'Folder 2' },
        { name: 'File 4', folder: 'Folder 2' },
      ]);
    }

    // Fetch initial files on store creation
    fetchInitialFiles();