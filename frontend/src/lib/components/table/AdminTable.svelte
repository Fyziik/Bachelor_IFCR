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

  thead > tr,
  tr:not(:last-child) {
    border-bottom: 1px solid black;
  }

  tr:nth-of-type(even) {
    background: lightgray;
  }

  td {
    width: 33%;
    padding: 10px;
    text-align: center;
    position: relative;
  }
</style>

<script>
  export let data

  import RowButton from '../buttons/RowButton.svelte'

  const archive_icon_url = 'https://static.thenounproject.com/png/21032-200.png'
  const false_positive_icon_url =
    'https://thumbs.dreamstime.com/b/false-positive-flat-icon-illustration-style-isolated-raster-image-white-background-232822695.jpg'
  const columns = [
    'ID',
    'Sårbarhed',
    'Ansat',
    'Relevans',
    'Status',
    'Dato fundet',
    'Dato rettet',
    'Archive',
    'False-positve'
  ]
</script>

<div>
  <table>
    <thead>
      <tr>
        {#each columns as column}
          <td>
            {column}
          </td>
        {/each}
      </tr>
    </thead>

    <!--For each employee under admin-->
    {#each data as user}
      <!--For each device a user has-->
      {#each user.device_data as device}
        {#each device.vulnerabilities as vuln}
          <tr>
            <td>0</td>
            <td>{vuln.vulnerability_name}</td>
            <td>{user.user_data.name}</td>
            <td>{vuln.importance}</td>
            <td>{vuln.status}</td>
            <td>{vuln.date_found}</td>
            <td>{vuln.date_changed}</td>
            <td>
              <RowButton imageUrl={archive_icon_url} typeOfButton={'archive'} id={0} />
            </td>
            <td>
              <RowButton
                imageUrl={false_positive_icon_url}
                typeOfButton={'false_positive'}
                id={0}
              />
            </td>
          </tr>
        {/each}
      {/each}
    {/each}
  </table>
</div>
