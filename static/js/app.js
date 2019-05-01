
// Select table body
const tbody = d3.select("#ufo-table>tbody")
const btn = d3.select("#filter-btn")
const btnReset = d3.select("#reset-btn")
// create a list of all possible filters
const filters = Object.keys(data[0])

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

function getInputField (filter) {
  // returns html element (input field) for this filter
  const filterTag = `#${filter}`
  return d3.select(filterTag)
}

btnReset.on("click", function() {
  d3.event.preventDefault()
  // loop through first 4 filters and clear each input field
  filters.slice(0,5).forEach(filter => {
    getInputField(filter).node().value = ""
  })
})

btn.on("click", function() {
  d3.event.preventDefault()
  // start with all data
  let filteredData = data
  let targetValue = ""
  // only look at the first 4 filters (datetime, city, state and country)
  filters.slice(0,5).forEach(filter => {
    // Get the value property of the corresponding input element and convert to lower case
    targetValue = getInputField(filter).property("value").toLowerCase()
    if (targetValue !== ""){
      filteredData = filteredData.filter(sighting => sighting[filter] === targetValue)
    }
  })
  createTable(filteredData)
})

// display all data when page is first loaded
createTable(data)
