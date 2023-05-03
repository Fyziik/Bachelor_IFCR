<script lang="ts">
  export let name;
  export let data;

	import AdminTable from '../components/table/AdminTable.svelte';
  import DevicesButton from '../components/buttons/DevicesButton.svelte';
	
</script>

<main>
  <h1>Velkommen {name}</h1>
  <DevicesButton />
  {#if data}
    <AdminTable {data}/>
  {:else}
    <h1>Fetching data</h1>
  {/if}
</main>

<style>
  h1 {
      text-align: center;
    }
</style>