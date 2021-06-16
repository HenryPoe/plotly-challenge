/**
 * Plotly Challenge
 * Henry Poe
 * Last edited 06/15/2021
 */

// Variable to store samples.json data
var data;

// Initializes the page 
function init() {
    // Import samples data from json
    d3.json("samples.json").then((json) => {
        console.log(json);
        data = json;

        // Fill the dropdown menu on the page
        var dropdown = d3.select("#selDataset");
        for(var i = 0; i < data.names.length; i++) {
            dropdown.append("option").text(data.names[i])//.attr("value", data.names[i])
        }
    })
}

function createBar(index) {
    var barTrace = [{
        x: data.samples[index].sample_values.slice(0, 10),
        y: data.samples[index].otu_ids.slice(0, 10).map((id) => "OTU " + id),
        text: data.samples[index].otu_labels.slice(0, 10),
        type: "bar"
    }];
    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    };
    Plotly.newPlot("bar", barTrace, layout)
};

init();

