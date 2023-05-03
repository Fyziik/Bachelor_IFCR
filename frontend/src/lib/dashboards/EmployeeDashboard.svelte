<script lang="ts">
  export let leaderName;

  import { onMount } from 'svelte';
  import { getAllAdmins } from "../api/api";
	import DataTable from '../components/table/Table.svelte';
  import DevicesButton from '../components/buttons/DevicesButton.svelte';
	
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
      header: 'CVEs',
      accessor: ''
    }, 
    {
      header: 'Relevans',
      accessor: ''
    },
    {
      header: 'Enhed / IP',
      accessor: ''
    }, 
    {
      header: 'Guide',
      accessor: ''
    }, 
    {
      header: 'Status',
      accessor: ''
    }, 
    {
      header: 'Dato fundet',
      accessor: 'date_created'
    }
  ];

  let data = null;
  onMount(async () => {
		const res = await getAllAdmins();
    data = res.data
	});
  
</script>

<main>
  <h1>Velkommen {leaderName}</h1>
  <DevicesButton />
  {#if data}
    <DataTable columns={columns} data={data} />
  {:else}
    <h1>Fetching data</h1>
  {/if}
</main>

<style>
  h1 {
      text-align: center;
    }
</style>