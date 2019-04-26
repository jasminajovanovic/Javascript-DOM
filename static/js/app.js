// from data.js
var tableData = "";

// Select table body
const tbody = d3.select("#ufo-table>tbody")
const btn = d3.select("#filter-btn")
let selected = "datetime"

function createTable(inputArray){
  // create row for each sighting
  tbody.selectAll("tr").remove();
  inputArray.forEach((sighting) => {
    const row = tbody.append("tr");
    for (key in sighting){
      const cell = row.append("td");
      cell.html(sighting[key])
    }
  }
)
}

d3.select("select")
  .on("change",function(){
    selected = d3.select("#d3-dropdown").node().value;
    d3.select("#datetime").node().value = ""
})

btn.on("click", function() {
  d3.event.preventDefault()
  const input_form = d3.select("#datetime")
  // Get the value property of the input element
  const targetValue = input_form.property("value")
  if (targetValue !== ""){
    filteredData = data.filter(sighting => sighting[selected] === targetValue)
    // tbody.selectAll("tr").remove();
    createTable(filteredData)
  }
  // if filter string is empty display all tableData
  else {
    createTable(data)
  }
  input_form.node().value = ""

})

createTable(data)
