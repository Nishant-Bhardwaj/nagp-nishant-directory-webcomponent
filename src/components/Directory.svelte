<script>
  import { onMount } from 'svelte';
  import {filesStore} from './stores/fileStore';
  import {foldersStore} from './stores/folderStore';
  
  let name = '';
  let type = '';
  let selectedFolder = '';
  let folderList = [];
  let files = [];
  let nestedFiles = [];

  onMount(() => {
    // Subscribe to the folders STORE
    const unsubscribeFolders = foldersStore.subscribe(value => {
      folderList = value;
    });

    // Subscribe to the files STORE
    const unsubscribeFiles = filesStore.subscribe(value => {
      files = value;
    });

    unsubscribeFolders();
    unsubscribeFiles();
  });

  const save = () => {

    if (type === 'File') {
      if(selectedFolder === ""){
        alert("Please select valid folder !!");
      }
      else{
        // Save file in selectedFolder
        
        const newFile = { name, folder: selectedFolder };
        files = [...files, newFile];

        console.log(`Save file "${name}" in folder "${selectedFolder}"`);
        cancel();
      }

    } else {
      // Save folder information
      const newFolder = {name};
      folderList = [...folderList, newFolder];
      console.log(`Save folder "${name}"`);
      cancel();
    }
  };

  const cancel = () => {
    name = '';
    type = '';
    selectedFolder = '';
  };


  const handleTypeChange = (event) => {  
    type = event.target.value;

    if (type === 'Folder') {
      selectedFolder = '';
    }
  };

  const handleFolderSelect = (event) => {
    nestedFiles = files.filter(file => file.folder === selectedFolder);
  }

</script>

    <h4 class="component"><u>Directory Component</u></h4>

    <label>
        <h5>Enter Name: &nbsp;</h5>
        <input type="text" bind:value={name} class="in"/>
    </label>

    <label>
        <h5>Select Type : &nbsp;</h5>
    
        <select bind:value={type} on:change={handleTypeChange} class="in">
            <option value="">Select Type</option>
            <option value="Folder">Folder</option>
            <option value="File">File</option>
        </select>
    </label>

    {#if type === 'File'}
        <label>
            <h5>Select Folder:</h5>

            <select bind:value={selectedFolder} class="in" on:change={handleFolderSelect}>
                <option value="">Select Folder</option>

                {#each folderList as folder}
                    <option value={folder.name}>{folder.name}</option>
                {/each}

            </select>
        </label>
        
    {/if}

    {#if type === 'File' && selectedFolder}
        <label>
            <h5>Nested Files :</h5>
            <select class="in">
                <option value="">See all nested files</option>
                {#each nestedFiles as file}
                  <option>{file.name}</option>
                {/each}
            </select>
        </label>
    {/if}

    <button on:click={save} class="saveBtn"><b>Save</b></button>
    <button on:click={cancel} class="cancelBtn"><b>Cancel</b></button>

<style>
  .saveBtn {
    background-color: rgb(189, 247, 193);
    margin-top: 10px;
    margin-left: 10px;
    width: 44%;
    margin-bottom: 10px;
    margin-left: 15px;
  }

  .saveBtn:hover {
   border-color: #05f821;
  }

  .cancelBtn {
    background-color: rgb(242, 190, 190);
    margin-top: 10px;
    width: 44%;
    margin-bottom: 10px;
    margin-left: 4px;
  }

  .cancelBtn:hover {
    border-color: red;
  }

  label{
    margin-left: 15px;
    display: flex;
    align-items: center;
    height: 30px;
  }

  label .in {
    flex-grow: 1;
  }

  .component{
    text-align: center;
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    display: flex;
  }

  .in{
    margin-left: 10px;
    float: right;
    margin-right: 15px;
  }
  
</style>
