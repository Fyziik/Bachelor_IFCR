<script lang="ts">
  export let data_to_send;

  import { loggedInUser } from "../../stores/stores";

  //For now, just use 2 pre-made logins from within application
  const user_db = [
    {
      "username": 'admin_test',
      "password": 'admin',
      "role": 'admin' //admin role should probably be turned into something not so easily guessed, so people cant just easily create admin roles
    },
    {
      "username": 'employee_test',
      "password": 'employee',
      "role": 'employee'
    }
  ]

  function check_credentials(data) {
    let found = user_db.filter((db_user) => {
        if (db_user.username === data.username && db_user.password === data.password) {
          return db_user
        }
    })
    if (found.length !== 0) {
      return found[0]
    }
    return {"username": null, "password": null, "role": null}
  }

  function handleClick() {
    alert(`Username: ${data_to_send.username} \nPassword: ${data_to_send.password}`)
    //Check user credentials. If correct, set store loggedInUser to user
    loggedInUser.set(check_credentials(data_to_send))
  }
</script>

<main>
  <button on:click={handleClick}>
    Login
  </button>
</main>

<style>
  button {
    margin-right: 0.5em;
    padding: 0.5em 1.3em;
    font-size: 1.3em;
    background-color: #24a0ed;
    color: white
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    background-color: #24a0ed;
    color: white
  }
</style>