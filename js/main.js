/**
 * Load TopoJSON data of the world and the data of the world wonders
 */

let data,
choroplethMap,
scatterplot

var selectedValue;



Promise.all([
  d3.json('data/counties-10m.json'),
  // d3.csv('data/population.csv'),
  d3.csv('data/national_health_data.csv'),
  // d3.csv('data/national_health_data_test.csv'),
  
]).then(data => {
  const geoData = data[0];
  const countyHealthData = data[1];


  geoData.objects.counties.geometries.forEach(d => {

    for (let i = 0; i < countyHealthData.length; i++) {
      if (d.id === countyHealthData[i].cnty_fips) {
        d.properties.poverty_perc = +countyHealthData[i].poverty_perc;
        d.properties.median_income = +countyHealthData[i+1].median_household_income;
        d.properties.education_less_than_high_school = +countyHealthData[i+2].education_less_than_high_school_percent;
        d.properties.air_quality = +countyHealthData[i+3].air_quality;
        d.properties.park_access = +countyHealthData[i+4].park_access;
        d.properties.percent_inactive = +countyHealthData[i+5].percent_inactive;
        d.properties.percent_smoking = +countyHealthData[i+6].percent_smoking;
        d.properties.urban_rural_status = countyHealthData[i+7].urban_rural_status;
        d.properties.elderly_percentage = +countyHealthData[i+8].elderly_percentage;
        d.properties.number_of_hospitals = +countyHealthData[i+9].number_of_hospitals;
        d.propertiesnumber_of_primary_care_physicians = +countyHealthData[i+10].number_of_primary_care_physicians;
        d.properties.percent_no_health_insurance = +countyHealthData[i+11].percent_no_health_insurance;
        d.properties.percent_high_blood_pressure = +countyHealthData[i+12].percent_high_blood_pressure;
        d.properties.percent_coronary_heart_disease = +countyHealthData[i+13].percent_coronary_heart_disease;
        d.properties.percent_stroke = +countyHealthData[i+14].percent_stroke;
        d.properties.percent_high_cholesterol = +countyHealthData[i+15].percent_high_cholesterol;
      }

    }


});

// let selectedOption = "option1"; //default value
// const dropdown = d3.select('#dropdownMenu');
// dropdown.on("change", function(){
//   selectedOption = d3.select(this).property("value");
//   console.log("selected option: ", selectedOption);
// })

var menuOptions = [
  { text: 'Porverty Percent', value: 'poverty_perc' },
  { text: 'Median Income', value: 'median_income' },
  { text: 'Education Less than High School', value: 'd.properties.education_less_than_high_school' },
  { text: 'Air Quality', value: 'd.properties.air_quality' },
  { text: 'Park Access', value: 'd.properties.park_access' },
  { text: 'Percent Inactive', value: 'd.properties.percent_inactive' },
  { text: 'Percent Smoking', value: 'd.properties.percent_smoking' },
  { text: 'Urban Rural Status', value: 'd.properties.urban_rural_status' },
  { text: 'Elderly Percentage', value: 'd.properties.elderly_percentage' },
  { text: 'Number of Hospitals', value: 'd.properties.number_of_hospitals' },
  { text: 'Number of Primary Care Physicians', value: 'd.properties.number_of_primary_care_physicians' },
  { text: 'Percent of Population with Health Insurance', value: 'd.properties.percent_no_health_insurance' },
  { text: 'Percent with High Blood Pressure', value: 'd.properties.percent_high_blood_pressure' },
  { text: 'Percent with Coronary Heart Disease', value: 'd.properties.percent_coronary_heart_disease' },
  { text: 'Percent that has had a Stroke', value: 'd.properties.percent_stroke' },
  { text: 'Percent with High Cholesterol', value: 'd.properties.percent_high_cholesterol' }
];

// var allGroup = ["poverty_perc", "median_income", "education_less_than_high_school", "air_quality", "park_access", "percent_inactive", "percent_smoking", "urban_rural_status", "elderly_percentage", "number_of_hospitals", "number_of_primary_care_physicians", "percent_no_health_insurance", "percent_high_blood_pressure", "percent_coronary_heart_disease", "percent_stroke", "percent_high_cholesterol"];

// d3.select("#selectButton")
//       .selectAll('myOptions')
//      	.data(allGroup)
//       .enter()
//     	.append('option')
//       .text(function (d) { return d; }) // text showed in the menu
//       .attr("value", function (d) { return d; }) // corresponding value returned by the button
//   dropdownMenu.on("change", function(){
//     selectedValue = d3.select(this).property("value");
//     console.log("selected value: ", selectedValue);
//     updateChoropleth(selectedValue);
    // choroplethMap.update(selectedValue); // Call the update method in choroplethMap.js with the selected value
  // });
  
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.addEventListener('change', function() {
    const selectedValue = this.value;
    updateChoropleth(selectedValue);
    console.log(selectedValue);
  });

  const choroplethMap = new ChoroplethMap({    
    parentElement: '.grid-item',
    selectedAttribute1: 'selectedValue',
  }, geoData,
  );


  const choroplethMap2 = new SecondChoroplethMap({
    parentElement: '.grid-item2',
  }, geoData,
  );

  const scatterplot= new ScatterPlot({
    parentElement: '.grid-item5',
  }, countyHealthData,
  );

  const histogram= new HistogramPlot2({
    parentElement: '.grid-item4',
  }, countyHealthData,
  );

  const histogram2= new HistogramPlot({
    parentElement: '.grid-item3',
  }, countyHealthData,
  );

})
  .catch(error => console.error(error));





//TODO:
// 1. Add a dropdown menu to select the different variables to visualize
// 2. Add a legend to the map
// 3. Add a tooltip to the map
// 4. Add feature where you can click on a county and see the data for that county
// 5. Add a scatterplot to the map
// 7. Add zoom?
// 8. Add a title to the map
// 9. Add a description to the map
// 10. Add a source to the map
