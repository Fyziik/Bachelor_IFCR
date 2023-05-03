<script>
	export let columns;
	export let data;

  import ArchiveButton from "../buttons/ArchiveButton.svelte";
  import FalsePositiveButton from "../buttons/FalsePositiveButton.svelte";

</script>

<div>
	<table>
		<thead>
			<tr>
				{#each columns as column}
					<td>
						{column.header}
					</td>
				{/each}
        <td></td>
        <td></td>
			</tr>
		</thead>

		{#each data as row}
			<tr>
				{#each columns as column}
					<td>
						{row[column.accessor]}
					</td>
				{/each}
        <td><ArchiveButton /></td>
        <td><FalsePositiveButton /></td>
			</tr>
		{/each}
	</table>	
</div>

<style>
	div {
		padding: 0 10px;
	}
	
	table {
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: 1.3em;
		border: 1px solid black;
	}

  thead {
    font-weight: bold;
  }
	
	tr {
		display: flex;
		width: 100%;
	}
	
	thead > tr, tr:not(:last-child) {
		border-bottom: 1px solid black;
	}
	
	tr:nth-of-type(even) {
		background: lightgray;
	}
	
	td 	{
		width: 33%;
		padding: 10px;
		text-align: center;
		position: relative;
	}
	
	
</style>