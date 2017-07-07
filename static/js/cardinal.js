var datos = [
  {"value": 200, "date": "2016-11-08"},
  {"value": 350, "date": "2016-12-08"},
  {"value": 325,"date": "2016-13-08"},
  {"value": 400,"date": "2016-14-08"},
  {"value": 505,"date": "2016-15-08"},
  {"value": 606,"date": "2016-16-08"},
  {"value": 505,"date": "2016-17-08"},
  {"value": 405,"date": "2016-18-08"},
  {"value": 530,"date": "2016-19-08"},
  {"value": 300,"date": "2016-20-08"},
  {"value": 120,"date": "2016-21-08"},
  {"value": 80,"date": "2016-22-08"}
];

var datosValue = datos.map(function(d) {
    return parseInt(d.value);
});

var dates = d3.set(datos.map(function(d) {
    return d.date;
})).values();


var resizes = 0;

//datos
var dataV = d3.range(11).map(function() {
  return Math.random() * 0 + 0;
});

var dataC = d3.range(11).map(function() {
  return Math.random() * 5 + 10;
});

dataC = datosValue;

var max = d3.max(dataC);
var maxset = [max]
var maxmax = d3.max(maxset);

var min = d3.min(dataC);
var minset = [min]
var minmin = d3.min(minset);

//al cargar la pagina
d3.select(window).on("load", inicioCardinal());

function inicioCardinal() {
  var spacer = -(maxmax - minmin) * 0.05; // para que el valor inferior no pegue con el eje x. Es un porcentaje de la altura total del rango.

  var padding = 60;


  var width = $("#frequency").width();

  var gheight = 300;

  var height = gheight + padding;

  var x = d3.scale.linear().domain([0, 11]).range([padding, width - padding]);
  var y = d3.scale.linear().domain([minmin + spacer, maxmax]).range([height - padding, padding]); //Los rangos no eran dependientes de las variables width y height, así que los hice dependientes para que sea responsiva y agregué la variable padding para que podamos trasladar toda la gráfica con eso y darle márgenes.

  var line = d3.svg.line()
    .x(function(d, i) {
      return x(i);
    })
    .y(function(d) {
      return y(d);
    });

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(11);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5); //Las dos variables anteriores generan los ejes por medio de la función d3.svg.axis. Al pasar un número en "ticks" D3 automágicamente determina un número cercano de divisiones al eje para que no queden decimales y sea legible (en este caso, aunque el número de ticks sea 4 en el eje y, pone 6 para ir de 20 en 20)

  var canvas = d3.select("#frequency")
    .append("svg")
    .attr("width", width)
    .attr("viewbox", "0 0 200 200")

  .classed("resizeable", true)
    .attr("height", height);

  var path = canvas.append("path")
    .attr("d", line(dataC))
    .attr("stroke", "steelblue")
    .attr("stroke-width", "2")
    .attr("fill", "none");

  var length = path.node().getTotalLength();

  if (resizes == 0) {
    path
      .attr("stroke-dasharray", length + " " + length)
      .attr("stroke-dashoffset", length)
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("stroke-dashoffset", 0);
  }
  //funcion de coloreo
  var area = d3.svg.area()
    .x(function(d, i) {
      return x(i);
    })
    .y0(gheight)
    .y1(function(d) {
      return y(d);
    });

  //coloreado
  if (resizes==0) {
    var coloreado = canvas.append("path");

    coloreado
      .datum(dataV)
      .attr("d", area)
      .attr("opacity", ".1")
      .attr("fill", "blue");

    coloreado
      .datum(dataC)
      .transition()
      .duration(2500)
      .attr("d", area)
      .attr("opacity", "0.1")
      .attr("fill", "blue");
  } else {
	var coloreado = canvas.append("path")
      .datum(dataC)
      .attr("d", area)
      .attr("opacity", "0.1")
      .attr("fill", "blue");
  }



  canvas.append("g") //agrega el eje x (en realidad eso es al final con el call, pero ya sabes que D3 es todo al revés)
    .attr("class", "axis") //imputa la clase para poder dar estilo con CSS
    .attr("transform", "translate(0," + (height - padding) + ")") //traslada el eje del origen (esquina superior izquierda) a justo la base de la gráfica que se determina por dos variables, así que si le movemos las variables, esto se ajusta solo.
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-65)"
    });

  canvas.append("g") // básicamente lo mismo que arriba, pero para el eje y
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);
}

d3.select(window).on('resize', resizeCardinal);

function resizeCardinal() {
  resizes = 1;
  d3.select('#frequency').text('');
  inicioCardinal();
}
