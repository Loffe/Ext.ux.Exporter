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
    return cols;
  },
  buildColumns: function(colModel) {
    var cols = [];
    Ext.each(colModel.config, function(column) {
      cols.push(column.header);
    }, this);
    return cols.join(",");
  }
});
