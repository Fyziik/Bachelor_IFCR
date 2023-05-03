<script>
export let isAdmin = false
export let name = '<Insert name here>'
let isDeviceDisplay;

import AdminDashboard from "./dashboards/AdminDashboard.svelte";
import EmployeeDashboard from "./dashboards/EmployeeDashboard.svelte";
import DevicesDashboard from "./dashboards/DevicesDashboard.svelte";
import { displayDeviceState } from "./stores/stores";

displayDeviceState.subscribe(value => {
  isDeviceDisplay = value;
})

</script>

<main>
  {#if !isAdmin}
    <EmployeeDashboard leaderName={name} />
  {:else}
    {#if !isDeviceDisplay}
    <AdminDashboard leaderName={name} />
    {:else}
    <DevicesDashboard leaderName='Enheder Dashboard' />
    {/if}
  {/if}
</main>

<style>

</style>