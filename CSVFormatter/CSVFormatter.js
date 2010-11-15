/**
 * @class Ext.ux.Exporter.CSVFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .csv files
 */
Ext.ux.Exporter.CSVFormatter = Ext.extend(Ext.ux.Exporter.Formatter, {
  format: function(store, config) {
    console.log("Formatter");
    console.log(store);
    var colModel = store.colModel;
    var items = store.store.data.items;
    console.log(colModel);
    console.log(items);
    var cols = this.buildColumns(colModel);
    return cols + "\n" + this.buildRows(colModel, items);
  },
  buildColumns: function(colModel) {
    var cols = [];
    Ext.each(colModel.config, function(column) {
      // todo: check hidden props
      cols.push(column.header);
    }, this);
    return cols.join(",");
  },
  buildRows: function(colModel, items) {
    var rows = [];
    Ext.each(items, function(row) {
      rows.push(this.buildRow(colModel, row));
    }, this);
    return rows.join("\n");
  },
  buildRow: function(colModel, row) {
    var cols = [];
    Ext.each(colModel.config, function(column) {
      // todo: check hidden props
      cols.push(row.data[column.dataIndex]);
    });
    return cols.join(",");
  }
});
