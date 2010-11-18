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
      if (!column.hidden) {
        var stripped = this.stripTags(column.header);
        var escapedText = this.escapeTextSeperator(stripped);
        cols.push(escapedText);
      }
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
      if (!column.hidden) {
        var stripped = this.stripTags((row.data[column.dataIndex]));
        var escapedText = this.escapeTextSeperator(stripped);
        cols.push(escapedText);
      }
    }, this);
    return cols.join(",");
  },
  /**
   * Little helper function to strip tags from a string.
   * @param strMod
   * @return strMod
   */
  stripTags: function(strMod){
    if (typeof(strMod) === "string") {
      strMod = strMod.replace(/<(.|\n)*?>/gi, '');
    }
    var	tarea = document.createElement('textarea');
    tarea.innerHTML = strMod;
    return tarea.value;
  },

  /**
   * Little helper function to escape CSV Text Seperator.
   * @param strMod
   * @return strMod
   */
  escapeTextSeperator: function(strMod){
    if (typeof(strMod) === "string") {
      strMod = strMod.replace(/"/gi, '""');
    }
    var	tarea = document.createElement('textarea');
    tarea.innerHTML = strMod;
    return '"' + tarea.value + '"';
  }
});
