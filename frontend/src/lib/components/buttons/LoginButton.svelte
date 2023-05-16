<style>
  button {
    margin-right: 0.5em;
    padding: 0.5em 1.3em;
    font-size: 1.3em;
    background-color: #24a0ed;
    color: white;
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    background-color: #24a0ed;
    color: white;
  }
</style>

<script lang="ts">
  export let data_to_send: JSON

  import { loggedInUser } from '../../stores/stores'
  import { login } from '../../api/api'

  async function handleClick() {
    let result = await login(data_to_send).then(x => {
      return x
    })
    if (result) {
      console.log(result)
      loggedInUser.set(result)
    }
  }
</script>

<main>
  <button on:click={handleClick}> login </button>
</main>
