<script lang="ts">
  export let name;
  export let data;

	import DataTable from '../components/table/AdminTable.svelte';
  import DevicesButton from '../components/buttons/DevicesButton.svelte';
	
  //Data shouldn't be requested all the time, but cached
	const columns = [
    {
      header: 'ID',
      accessor: ''
    }, 
    {
      header: 'Sårbarhed',
      accessor: 'vulnerability_name'
    }, 
    {
      header: 'Ansat',
      accessor: 'name'
    }, 
    {
      header: 'Relevans',
      accessor: ''
    },
    {
      header: 'Status',
      accessor: ''
    }, 
    {
      header: 'Dato fundet',
      accessor: 'date_created'
    }, 
    {
      header: 'Dato rettet',
      accessor: 'date_changed'
    }
  ];

  
</script>

<main>
  <h1>Velkommen {name}</h1>
  <DevicesButton />
  {#if data}
    <DataTable {data} />
  {:else}
    <h1>Fetching data</h1> <!--Should be replaced with an actual loading spinner-->
  {/if}
</main>

<style>
  h1 {
      text-align: center;
    }
</style>