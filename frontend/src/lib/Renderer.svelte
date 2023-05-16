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
  import { getInfoForAdmin } from './api/api'

  async function get_all_data(username) {
    let allData = await getInfoForAdmin(username).then(x => {
      console.log(x)
    })
    return allData
  }

  displayDeviceState.subscribe(value => {
    isDeviceDisplay = value
  })

  loggedInUser.subscribe(value => {
    console.log(value.data.username)
    if (value.data.username !== null) {
      let allData = get_all_data(value.data.username)
      console.log(allData)
    }
    //let allData = get_all_data(value.navn)
    //if (value.username !== null) {
    //  isLoggedIn = true
    //  name = value.username
    //  if (value.role === 'admin') {
    //    isAdmin = true
    //  } else {
    //    isAdmin = false
    //  }
    //}
  })

  let data

  onMount(async () => {})
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
