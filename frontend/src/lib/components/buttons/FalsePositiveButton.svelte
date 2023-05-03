<script lang="ts">


  function handleClick() {
    alert('TODO; false positive')
  }
</script>

<main>
  <button on:click={handleClick}>
  </button>
</main>

<style>
  button {
    background-image: url('https://thumbs.dreamstime.com/b/false-positive-flat-icon-illustration-style-isolated-raster-image-white-background-232822695.jpg');
    background-size: cover;
    width: 75px;
    height: 75px;
  }

  button:hover {
  }

  button:active {
  }
</style>