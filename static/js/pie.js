var pieResizeCount = 0;

var margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
}; // Convención de márgenes de D3

var breakPoint=0;//el tama;o de la pantala cuando tiene que saltar

var legendRectSize = 15,
  legendSpacing = 5; //tamaño de la leyenda

var datasetPie = [
  {"count": 423, "label": "Internet"},
  {"count": 268, "label": "Llamadas"},
  {"count": 118, "label": "Servicio"},
  {"count": 118, "label": "Recargas"},
  {"count": 40, "label": "Planes"}
  ];

var colorPie = d3.scale.ordinal()
  .range(['#1098D5', '#B0D35E', '#F0668D', '#017D8F', '#EC1A52', '#08456E', '#57BBC1', '#FBAE19', '#621F60', '#F05848']); //escala de colores semáforo

  //funcion para correr onload
  d3.select(window).on("load", inicioPie());

  //funcion que controla el inicio de la carga de la grafica
  function inicioPie(){
  //borrar el contenido del div a insertar
  var svg = d3.select('#topics')
  .text('');

  var winWidth = $("#topics").width(); //Sacamos el ancho de la pantalla (esto se puede cambiar por el ancho del div contenedor o lo que sea.)
if(winWidth>=breakPoint){//cuando es mas grande que el breakpoint
  var width = winWidth;
  var height = winWidth/2; //tamaño de la gráfica ya tomando en cuenta los márgenes
  var radius = width/4; // El radio es la mitad de el ancho menos los márgenes
  var donutWidth = radius * 1; // Para hacer que la dona se vea bien, defino el grueso en función del ancho total.
  var centery = height / 2,
    centerx = width / 4 ; //centro de la dona
}else{//cuando es mas pequeño que el breakpoint
  var width = winWidth;
  var height = width + datasetPie.length*(legendRectSize+legendSpacing) + margin.top + margin.bottom; //tamaño de la gráfica ya tomando en cuenta los márgenes
  var radius = width/2; // El radio es la mitad de el ancho menos los márgenes
  var donutWidth = radius * 1; // Para hacer que la dona se vea bien, defino el grueso en función del ancho total.
  var centery = width / 2,
    centerx = width / 2 ; //centro de la dona
}

var svg = d3.select('#topics')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr("transform", "translate(" + centerx + "," + centery + ")"); //inserta el topics en el div del html que tiene como id "topics"

var arc = d3.svg.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius); //inserta los arcos

var pie = d3.layout.pie()
  .value(function(d) {
    return d.count;
  })
  .sort(null); //pasa los valores del dataset a un layout de pie

var path = svg.selectAll('path')
  .data(pie(datasetPie))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function(d, i) {
    return colorPie(d.data.label);
  });//mete los paths que van a dibujar los arcos y les pone los colores correspondientes.

if (pieResizeCount == 0) {  path.transition()
    .ease("bounce")
    .duration(1350)
    .attrTween("d", tweenPie);
    pieResizeCount = 1 //Inserta la transición a los arcos. No está encadenada a la selección anterior para que se guarde esa selección y pueda después llamarla para el mouseover.
  } else {
    path.transition()
        .ease("bounce")
        .duration(0)
        .attrTween("d", tweenPie);
  }

function tweenPie(b) {
  var i = d3.interpolate({startAngle: 0*2*Math.PI, endAngle: .0*2*Math.PI}, b);
  return function(t) { return arc(i(t)); };
}//Esta es la función de animación
//inserta la leyenda


if (winWidth>=breakPoint) {//cuando la grafica es grande
  var legend = svg.selectAll('.legend')
    .data(colorPie.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var heightL = legendRectSize + legendSpacing;
      var horz = radius + margin.left*2;
      var vert = i * heightL - (datasetPie.length * (legendSpacing + legendSpacing));
      return 'translate(' + horz + ',' + vert + ')';
    });
} else {//cuando la grafica es pequeña
  var legend = svg.selectAll('.legend')
    .data(colorPie.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var heightL = legendRectSize + legendSpacing;
      var horz = -radius + margin.left+(legendRectSize/2);
      var vert = i * heightL + radius + 2*margin.bottom;
      return 'translate(' + horz + ',' + vert + ')';
    });
}

legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', colorPie)
  .style('stroke', colorPie); //genera los indicadores rectangulares de colores para la leyenda

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) {
    return d;
  }); //genera las etiquetas de la leyenda

path.on('mouseover', function(d) {
  var total = d3.sum(datasetPie.map(function(d) {
    return d.count;
  }));

  var percent = Math.round(1000 * d.data.count / total) / 10;
  tooltip.select('.count').html(d.data.count);
  tooltip.select('.label').html(d.data.label);
  tooltip.select('.percent').html(percent + '%');
  tooltip.style('display', 'block');
}); //calcula el porcentaje redondeado a un decimal y le asigna la etiqueta correspondiente para el tooltip

path.on('mouseout', function() {
  tooltip.style('display', 'none');
}); //desaparece el tooltip cuando el mouse sale del arco

path.on('mousemove', function(d) {
  tooltip.style('top', (d3.event.layerY + 10) + 'px')
    .style('left', (d3.event.layerX + 10) + 'px');
}); //posiciona el tooltip en tiempo real junto al mouse

var tooltip = d3.select('#topics')
  .append('div')
  .attr('class', 'tooltip'); //crea el tooltip y las tres siguientes le agregan los datos correspondientes

tooltip.append('div')
  .attr('class', 'count');

tooltip.append('div')
  .attr('class', 'label');

tooltip.append('div')
  .attr('class', 'percent');
}

  //funcion para correr onload
  //d3.select(window).on("resize", inicioPie);
