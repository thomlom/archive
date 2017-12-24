<template>
  <div id="app">
    <div class="container">
      <form v-if="showForm">
        <div class="form-group">
          <label for="valeur">Valeur d'entrée</label>
          <input type="number" class="form-control" v-model="value" required>
        </div>
        <div class="form-group">
          <label for="valeur">Durée de vie</label>
          <input type="number" class="form-control" v-model="lifetime" required>
        </div>
        <div class="form-group">
          <label for="valeur">Date d'acquisition</label>
          <input type="date" class="form-control" v-model="date" required>
        </div>
        <button class="btn btn-primary" @click.prevent="generateTable">Générer</button>
        <button class="btn btn-danger" @click.prevent="showForm = false">Hide</button>
      </form>
      <div v-for="tableData in tableList">
        <depreciation-table v-if="showTable" :tableData="tableData"></depreciation-table>
      </div>
    </div>
  </div>
</template>

<script>
import DepreciationTable from './components/DepreciationTable.vue';

const getAccountingDaysUntilEndOfYear = (date) => {
  let nDays = date.getDate();
  let nMonths = date.getMonth() + 1;
  return (30 * (12 - nMonths)) + (30 - nDays);
}

const generateDepreciationTableData = (value, lifetime, date) => {

  /* Global data and first line*/
  let data = [];

  const ACCOUNTING_DAYS_IN_A_YEAR = 360;
  let nAccountingDays = getAccountingDaysUntilEndOfYear(date);
  let annuity = Math.round(value / lifetime);
  let cumulatedDepreciations = Math.round(annuity * nAccountingDays / ACCOUNTING_DAYS_IN_A_YEAR);

  data[0] = { 'year': 1, 'beginning_value': value, 'annuity': cumulatedDepreciations, 'cumulated_depreciations': cumulatedDepreciations, 'end_value': value - cumulatedDepreciations };
  value -= cumulatedDepreciations;

  /* n lines until the last line */
  for (let i = 1; i < lifetime; i++) {
    cumulatedDepreciations += annuity;
    data[i] = { 'year': i + 1, 'beginning_value': value, 'annuity': annuity, 'cumulated_depreciations': cumulatedDepreciations, 'end_value': value - annuity };
    value -= annuity;
  }

  /* last line */
  annuity = value;
  cumulatedDepreciations += value;
  data[lifetime] = { 'year': lifetime + 1, 'beginning_value': value, 'annuity': annuity, 'cumulated_depreciations': cumulatedDepreciations, 'end_value': value - annuity };
  return data;
}

export default {
  name: 'app',
  components: { DepreciationTable },
  data() {
    return {
      value: 0,
      lifetime: 0,
      date: new Date().toLocaleDateString('fr'),
      showTable: false,
      tableList: [],
      showForm: true
    }
  },
  methods: {
    generateTable() {
      let data = generateDepreciationTableData(parseInt(this.value), parseInt(this.lifetime), new Date(this.date))
      this.tableList.push(data);
      this.showTable = true;
    }
  }
}
</script>

<style lang="scss">
</style>
