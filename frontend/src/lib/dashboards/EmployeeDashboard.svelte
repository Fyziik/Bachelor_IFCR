<script lang="ts">
  export let name;
  export let data;

	import EmployeeTable from "../components/table/EmployeeTable.svelte";
	
</script>

<main>
  <h1>Velkommen {name}</h1>
  {#if data}
    <EmployeeTable {data} />
  {:else}
    <h1>Fetching data</h1>
  {/if}
</main>

<style>
  h1 {
      text-align: center;
    }
</style>