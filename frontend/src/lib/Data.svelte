<script lang="ts">
  import { onMount } from 'svelte';
  import { getAllAdmins } from "./api/api";
  let admins
  onMount(async () => {
		const res = await getAllAdmins();
    admins = res.data
    console.log(admins)
	});
  
</script>

<main>
  {#if admins}
    {#each admins as admin}
      {admin.username}
    {/each}
  {:else}
    <h1>Fetching data</h1>
  {/if}
</main>

<style>

</style>