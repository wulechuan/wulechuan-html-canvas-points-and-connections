(function (buildWhatWeWant) {
	buildWhatWeWant(window.wulechuanCanvasPointsAndConnections);
})(function buildWhatWeWant(wulechuanCanvasPointsAndConnections) {
	var shoudSlowDownForTesting = false;
	var frameRate = 30;
	var particleCounts = 60;
	if (shoudSlowDownForTesting) {
		frameRate = 1;
		particleCounts = 2; // must greater than 1, otherwise no connection is needed.
	}








	var drawnFramesCount = 0;
	function draw() {
		if (shoudSlowDownForTesting && drawnFramesCount>2) {
			return;
		}
		controller.drawFrame(new Date().getTime() / 1000);
		requestAnimationFrame(draw);
		drawnFramesCount++;
	}



	var canvas = document.querySelector('#test-canvas');
	var requestAnimationFrame = function (func) {
		window.setTimeout(func, 1000 / frameRate);
	};



	var controller = new wulechuanCanvasPointsAndConnections({
		canvas: canvas,
		maxDistanceToMakeConnection: 60,
		lineWidthDrawingThreshold: 0.25,
		pointsCount: particleCounts,
		thickestLineWidth: 1,
		pointColorRGB: '0, 64, 190',
		lineColorRGB: '0, 128, 160',
		speedMin: 6,
		speedMax: 50,
		// generateOnePoint: generateOnePointAroundACircle,
		// updateOnePointOnIteration: updateOnePointOnIteration
	});

	function generateOnePointAroundACircle(point) {
		var cw = canvas.width;
		var ch = canvas.height;
		var centerX = cw / 2;
		var centerY = ch / 2;
		var distributionRadius = Math.min(centerX, centerY) * 0.6;

		var r = (Math.random() * 0.6 + 0.7 ) * distributionRadius;
		var theta = Math.random() * Math.PI * 2;

		point.x = r * Math.sin(theta) + centerX;
		point.y = r * Math.cos(theta) + centerY;
		point.coreX = point.x;
		point.coreY = point.y;
	}

	function updateOnePointOnIteration(point, vmin, vmax) {
		var vx, vy;

		if (!point.hasOwnProperty('vx')) {
			vx = Math.random() * (vmax - vmin) + vmin;
			vy = Math.random() * (vmax - vmin) + vmin;
			point.forceRatioOverDistanceX = 1200 * Math.random() + 1200;
			point.forceRatioOverDistanceY = 1200 * Math.random() + 1200;
		} else {
			var distToCoreX = point.coreX - point.x;
			var distToCoreY = point.coreY - point.y;
			var forceX = distToCoreX * Math.abs(distToCoreX) / point.forceRatioOverDistanceX;
			var forceY = distToCoreY * Math.abs(distToCoreY) / point.forceRatioOverDistanceY;
			vx = point.vx + forceX;
			vy = point.vy + forceY;
		}

		point.vx = vx;
		point.vy = vy;
		// point.speed = Math.sqrt(vx * vx + vy * vy);
		// point.direction = Math.atan2(vy, vx);
	}

	window.addEventListener('resize', function () {
		controller.updateCanvasPositionAndSize();
	});

	draw();
});
