/**
 * @class Ext.ux.Exporter.CSVFormatter
 * @extends Ext.ux.Exporter.Formatter
 * Specialised Format class for outputting .csv files
 */
Ext.ux.Exporter.CSVFormatter = Ext.extend(Ext.ux.Exporter.Formatter, {
  format: function(store, config) {
    console.log("Formatter");
    console.log(store);
    var items = store.data.items;
    console.log(items);
    var cols = this.buildColumns(config.columns);
    return cols + "\n" + this.buildRows(config.columns, items);
  },
  buildColumns: function(columns) {
    var cols = [];
    Ext.each(columns, function(column) {
      // todo: check hidden props
      if (!column.hidden) {
        var stripped = this.stripTags(column.header);
        var escapedText = this.escapeTextSeperator(stripped);
        cols.push(escapedText);
      }
    }, this);
    return cols.join(",");
  },
  buildRows: function(columns, items) {
    var rows = [];
    Ext.each(items, function(row) {
      rows.push(this.buildRow(columns, row));
    }, this);
    return rows.join("\n");
  },
  buildRow: function(columns, row) {
    var cols = [];
    Ext.each(columns, function(column) {
      // todo: check hidden props
      if (!column.hidden) {
        var data = row.data[column.dataIndex];
        // the cell has a custom object instead of a string, use its text attribute
        if (data.text !== undefined) {
          data = data.text;
        }
        var stripped = this.stripTags(data);
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
