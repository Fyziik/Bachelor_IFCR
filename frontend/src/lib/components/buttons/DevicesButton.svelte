<script lang="ts">


  function handleClick() {
    alert('TODO; Render devices page')
  }
</script>

<main>
  <button on:click={handleClick}>
      Enheder
  </button>
</main>

<style>
  button {
    margin-right: 0.5em;
    padding: 0.5em 1.3em;
    font-size: 1.3em;
    float: right;
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