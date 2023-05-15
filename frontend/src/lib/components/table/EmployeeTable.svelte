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

  const columns = [
    'ID',
    'Sårbarhed',
    'CVEs',
    'Relevans',
    'Enhed / IP',
    'Guide',
    'Status',
    'Dato Fundet'
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
            <td>id</td>
            <td>{vuln.vulnerability_name}</td>
            <td>generated later</td>
            <td>{vuln.importance}</td>
            <td>{device.ip}</td>
            <td>
              <a target="_blank" href={vuln.step_guide_link}>Stepguide</a>
            </td>
            <td>{vuln.status}</td>
            <td>{vuln.date_found}</td>
          </tr>
        {/each}
      {/each}
    {/each}
  </table>
</div>
