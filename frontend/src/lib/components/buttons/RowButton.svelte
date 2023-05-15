<style>
  button {
    background-size: cover;
    width: 75px;
    height: 75px;
  }

  button:hover {
  }

  button:active {
  }
</style>

<script lang="ts">
  export let imageUrl: string
  export let typeOfButton: string
  export let id: number

  function handleClick() {
    alert(`Image url: ${imageUrl} \nType Of Button: ${typeOfButton} \nID: ${id}`)
  }
</script>

<main>
  <button style="background-image: url({imageUrl})" on:click={handleClick} />
</main>
