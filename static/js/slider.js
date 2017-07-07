
var ageRange = {
  'min': 15,
  'max': 80
};

var arpuRange = {
  'min': 0,
  'max': 100
};

var ageSlider = document.getElementById('age-slider');
var arpuSlider = document.getElementById('arpu-slider');

var ageNodes = [
	document.getElementById('age-lower-value'), // 0
	document.getElementById('age-upper-value')  // 1
];

var arpuNodes = [
	document.getElementById('arpu-lower-value'), // 0
	document.getElementById('arpu-upper-value')  // 1
];

noUiSlider.create(ageSlider, {
	range: ageRange,
	start: [ 25, 40 ],
  connect: true,
  step: 5,
	pips: {
		mode: 'range',
		density: 8,
    format: wNumb({
			decimals: 0,
			postfix: ' años'
    })
	},
  format: wNumb({
		decimals: 0,
		thousand: ',',
		postfix: ' años',
	})
})

noUiSlider.create(arpuSlider, {
	range: arpuRange,
	start: [ 0, 50 ],
  connect: true,
  step: 5,
	pips: {
		mode: 'range',
		density: 5,
    format: wNumb({
			decimals: 0,
			postfix: ' EUR'
    })
	},
  format: wNumb({
		decimals: 0,
		thousand: ',',
		postfix: ' &euro;',
	})
})

// Display the slider value
ageSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
	ageNodes[handle].innerHTML = values[handle];
});
arpuSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
	arpuNodes[handle].innerHTML = values[handle];
});
