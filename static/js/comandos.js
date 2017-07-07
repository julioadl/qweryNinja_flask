function resizeAll(){
  inicioPie();
  resizeBarKeywords();
  resizeDonut();
  resizeCardinal();
}

d3.select(window).on("load", resizeCardinal);

d3.select(window).on("resize", resizeAll);
