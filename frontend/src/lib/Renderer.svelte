<script>
let isAdmin = true
let name;
let isDeviceDisplay;

import { onMount } from 'svelte';
import AdminDashboard from "./dashboards/AdminDashboard.svelte";
import EmployeeDashboard from "./dashboards/EmployeeDashboard.svelte";
import DevicesDashboard from "./dashboards/DevicesDashboard.svelte";
import { displayDeviceState } from "./stores/stores";
import { getTestData } from './api/api';

displayDeviceState.subscribe(value => {
  isDeviceDisplay = value;
})

let data;

onMount(async () => {
		const res = await getTestData();
    //Right now I'll only pick the first object, because each entire object is technically different companies, so I've picked the "first company"
    data = res.data[2] //indexing at 1 because that company has multiple users
    name = data.admin_data.name
    data = data.user_data
    console.log(data)
	});

</script>

<main>
  {#if data}
    {#if !isAdmin}
      <EmployeeDashboard {name} {data} />
    {:else}
      {#if !isDeviceDisplay}
      <AdminDashboard {name} {data} />
      {:else}
      <DevicesDashboard name='Enheder Dashboard' />
      {/if}
    {/if}
  {/if}
  
</main>

<style>

</style>