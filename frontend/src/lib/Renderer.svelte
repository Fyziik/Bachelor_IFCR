<script>
export let isAdmin = false
export let name = '<Insert name here>'

import AdminDashboard from "./dashboards/AdminDashboard.svelte";
import EmployeeDashboard from "./dashboards/EmployeeDashboard.svelte";

</script>

<main>
  {#if !isAdmin}
    <EmployeeDashboard leaderName={name} />
  {:else}
    <AdminDashboard leaderName={name} />
  {/if}
</main>

<style>

</style>