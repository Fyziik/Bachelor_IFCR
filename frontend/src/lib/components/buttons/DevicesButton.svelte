<style>
  button {
    margin-right: 0.5em;
    padding: 0.5em 1.3em;
    font-size: 1.3em;
    float: right;
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
  import { displayDeviceState } from '../../stores/stores'

  let isDeviceState: boolean

  displayDeviceState.subscribe(value => {
    isDeviceState = value
  })

  function handleClick() {
    isDeviceState = !isDeviceState
    displayDeviceState.set(isDeviceState)
  }
</script>

<main>
  <button on:click={handleClick}>
    {#if isDeviceState}
      Dashboard
    {:else}
      Enheder
    {/if}
  </button>
</main>
