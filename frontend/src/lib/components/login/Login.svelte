<style>
  .container {
    max-width: 500px;
    margin: auto;
  }

  h1 {
    text-align: center;
  }

  label {
    font-weight: bold;
  }
</style>

<script>
  import LoginButton from '../buttons/LoginButton.svelte'
  //Request backend information regarding login - backend shoulder filter data & only respond with what's relevant
  //If an admin, return everything regarding company, admin, user, devices & vulns
  //If user, return only said users, his/her devices, its vulnerabilities & company (if needed)

  //The login system should also be protected against XSS & SQLi attacks to prove that we've protected ourselves against these sort of attacks

  let user = {
    username: 'admin_test',
    password: 'admin'
  }
</script>

<main>
  <div class="container">
    <h1>Login Page</h1>
    <form class="content">
      <label>Username</label>
      <input type="text" bind:value={user.username} />
      <label>Password</label>
      <input type="text" bind:value={user.password} />
    </form>
    <div class="button">
      <LoginButton data_to_send={user} />
    </div>
  </div>
</main>
