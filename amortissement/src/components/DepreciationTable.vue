<template>
  <div>
    <table class="table table-sm">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Années</th>
          <th scope="col">VCN (début)</th>
          <th scope="col">Annuité (DADP)</th>
          <th scope="col">Amortissements cumulés</th>
          <th scope="col">VCN (fin)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in tableData">
          <th scope="row">{{line.year}}</th>
          <td>{{line.beginning_value}}</td>
          <td>{{line.annuity}}</td>
          <td>{{line.cumulated_depreciations}}</td>
          <td>{{line.end_value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        props: ["tableData"],
        data() {
            tableData: data
        }
    }
</script>
