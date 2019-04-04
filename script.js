function getDataForLineChart(data) {
  var months = {
    "January" : 0,
    "February" : 0,
    "March" : 0,
    "April" : 0,
    "May" : 0,
    "June" : 0,
    "July" : 0,
    "August" : 0,
    "September" : 0,
    "October" : 0,
    "November" : 0,
    "December" : 0,
  }

  for (var i = 0; i < data.length; i++) {
    var elemento = data[i]
    var dataOggi = moment()
    var dataMoment = moment(elemento.date, "DD-MM-YYYY")
    var monthName = dataMoment.format("MMMM")
    months[monthName] += elemento.amount
    console.log(monthName);
  }
  return months;
}

function renderLineChart(data) {
  var labels = Object.keys(data)
  var values = Object.values(data)
  var container = $("#container")
  var chart = new Chart(container, {
    type: "line",
    data: {
      labels: labels,
      datasets:[{
        data: values
      }]
    }
  })
}

function getSales() {
  $.ajax({
    url: "http://157.230.17.132:4015/sales",
    method: "GET",
    success: function(data) {
      console.log("success", data);
      var result = getDataForLineChart(data);
      renderLineChart(result)
    },
    error: function(data) {
      console.log("error", data);
    }
  })
}

$(document).ready(function(){
  getSales()
})
