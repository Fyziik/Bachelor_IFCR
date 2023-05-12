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
  import { getAllAdmins } from './api/api'

  displayDeviceState.subscribe(value => {
    isDeviceDisplay = value
  })

  loggedInUser.subscribe(value => {
    userData = value
    if (userData.username !== null) {
      isLoggedIn = true
      name = userData.username
      console.log(userData.role)
      if (userData.role === 'admin') {
        isAdmin = true
      } else {
        isAdmin = false
      }
    }
  })

  let data

  onMount(async () => {
    //const res = await getTestData()
    const res = await getAllAdmins()
    //Right now I'll only pick the first object, because each entire object is technically different companies, so I've picked the "first company"
    data = res.data //indexing at 1 because that company has multiple users
    console.log(data)
    //name = data.admin_data.name
    //data = data.user_data
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
