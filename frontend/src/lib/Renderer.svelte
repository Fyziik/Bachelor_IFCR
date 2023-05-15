<style>
</style>

<script>
  let isLoggedIn = false
  let isAdmin = true
  let name
  let isDeviceDisplay
  let userData

  import { onMount } from 'svelte'
  import AdminDashboard from './dashboards/AdminDashboard.svelte'
  import EmployeeDashboard from './dashboards/EmployeeDashboard.svelte'
  import DevicesDashboard from './dashboards/DevicesDashboard.svelte'
  import Login from './components/login/Login.svelte'
  import { displayDeviceState, loggedInUser } from './stores/stores'

  displayDeviceState.subscribe(value => {
    isDeviceDisplay = value
  })

  loggedInUser.subscribe(value => {
    console.log(value)
    if (value.username !== null) {
      isLoggedIn = true
      name = value.username
      if (value.role === 'admin') {
        isAdmin = true
      } else {
        isAdmin = false
      }
    }
  })

  let data

  onMount(async () => {
  })
</script>

<main>
  {#if isLoggedIn}
    {#if data}
      {#if !isAdmin}
        <EmployeeDashboard {name} {data} />
      {:else if !isDeviceDisplay}
        <AdminDashboard {name} {data} />
      {:else}
        <DevicesDashboard />
      {/if}
    {/if}
  {:else}
    <Login />
  {/if}
</main>
