import { writable } from 'svelte/store';

  // Writable store for folders
  export const foldersStore = writable([]);

  export async function fetchInitialFolders() {
    // Update the folders store with initial data
    foldersStore.set([{ name: 'Folder 1' }, { name: 'Folder 2' }]);
  }

  // Fetch initial folders on store creation
  fetchInitialFolders();
