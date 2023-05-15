<style>
  h1 {
    text-align: center;
  }
</style>

<script lang="ts">
  export let name: string
  export let data: JSON

  import AdminTable from '../components/table/AdminTable.svelte'
  import DevicesButton from '../components/buttons/DevicesButton.svelte'
</script>

<main>
  <h1>Velkommen {name}</h1>
  <DevicesButton />
  {#if data}
    <AdminTable {data} />
  {:else}
    <h1>Fetching data</h1>
  {/if}
</main>
