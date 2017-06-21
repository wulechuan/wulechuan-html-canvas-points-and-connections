(function () {
	var requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};




	window.wulechuanCanvasPointsAndConnections = wulechuanCanvasPointsAndConnections;



	function wulechuanCanvasPointsAndConnections(constructorOptions) {
		var thisController = this;

		var canvas = constructorOptions.canvas;
		var canvasContext = canvas.getContext('2d');


		var lineWidthDrawingThreshold = 0.2;
		var pointSize = 2;
		var thickestLineWidth = 2;
		var maxDistanceToMakeConnection = 160;
		var pointsCount = 60;
		var pointColorRGB = '0,0,0';
		var lineColorRGB = '0,0,0';
		var pointsAreRounded = true;
		var shouldBounceAtBoundary = true;

		var shouldLeaveTracksOfPoints = false;
		var shouldDrawPoints = true;
		var shouldDrawLines = true;
		var shouldDebugVelocity = false;
		var shouldDebugForce = false;
		var velocityDebugVisualScale = 0.5;
		var forceDebugVisualScale = 10;
		var velocityDebugColor = 'rgba(219, 51, 0, 0.79)';
		var forceDebugColor = 'yellow';

		var activeAreaX1 = 0;
		var activeAreaY1 = 0;
		var activeAreaX2 = 0;
		var activeAreaY2 = 0;
		var canvasCurrentX = NaN;
		var canvasCurrentY = NaN;
		var mouseCursorLocalX = NaN;
		var mouseCursorLocalY = NaN;
		var maxDistanceToMakeConnection2 =
			maxDistanceToMakeConnection * maxDistanceToMakeConnection;

		var lastFrameDrawnTime = NaN; // in seconds

		var allParticles = [];
		var theDrawPointMethod;


		thisController.initOneParticle = _initOneParticleDefaultMethod;
		thisController.updateOneParticleOnIteration = _updateOneParticleOnIterationDefaultMethod;
		thisController.drawFrame = drawFrame;
		thisController.updateCanvasPositionAndSize = updateCanvasPositionAndSize;
		thisController.setActiveArea = setActiveArea;


		init(constructorOptions);




		var hasBeenInitialized = false;

		function init(initOptions) {
			config(initOptions);
			setupMouseEvents();
			updateCanvasPositionAndSize();
			_generateAllPoints();

			hasBeenInitialized = true;
		}

		function config(options) {
			options = options || {};

			if (typeof options.pointsAreRounded === 'boolean') pointsAreRounded = options.pointsAreRounded;
			if (typeof options.shouldBoundAtBoundary === 'boolean') shouldBounceAtBoundary = options.shouldBoundAtBoundary;

			if (options.pointSize) pointSize = options.pointSize;
			if (options.thickestLineWidth) thickestLineWidth = options.thickestLineWidth;
			if (options.maxDistanceToMakeConnection) maxDistanceToMakeConnection = options.maxDistanceToMakeConnection;
			if (options.pointsCount) pointsCount = options.pointsCount;
			if (options.pointColorRGB) pointColorRGB = options.pointColorRGB;
			if (options.lineColorRGB) lineColorRGB = options.lineColorRGB;
			if (options.lineWidthDrawingThreshold) lineWidthDrawingThreshold = options.lineWidthDrawingThreshold;

			maxDistanceToMakeConnection2 = maxDistanceToMakeConnection * maxDistanceToMakeConnection;

			theDrawPointMethod = pointsAreRounded ? _drawPointAsRoundedDot : _drawPointAsSqure;

			if (options.hasOwnProperty('updateOneParticleOnIteration')) {
				if (typeof options.updateOneParticleOnIteration === 'function') {
					thisController.updateOneParticleOnIteration = options.updateOneParticleOnIteration;
				} else {
					thisController.updateOneParticleOnIteration = _updateOneParticleOnIterationDefaultMethod;
				}
			}

			var oldinitOneParticleMethod = thisController.initOneParticle;
			if (options.hasOwnProperty('initOneParticle')) {
				if (typeof options.initOneParticle === 'function') {
					thisController.initOneParticle = options.initOneParticle;
				} else {
					thisController.initOneParticle = _initOneParticleDefaultMethod;
				}
			}

			if (hasBeenInitialized && oldinitOneParticleMethod !== thisController.initOneParticle) {
				_generateAllPoints();
			}
		}

		function setupMouseEvents() {
			window.addEventListener('mousemove', function (event) {
				mouseCursorLocalX = event.clientX - canvasCurrentX;
				mouseCursorLocalY = event.clientY - canvasCurrentY;
			});

			window.addEventListener('mouseout', function () {
				mouseCursorLocalX = NaN;
				mouseCursorLocalY = NaN;
			});
		}

		function updateCanvasPositionAndSize(toUpdateActiveArea) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;

			var newBoundingBox = canvas.getBoundingClientRect();
			canvasCurrentX = newBoundingBox.left;
			canvasCurrentY = newBoundingBox.top;

			if (typeof toUpdateActiveArea === 'function') {
				toUpdateActiveArea(canvas);
			} else {
				setActiveArea(0, 0, canvas.width, canvas.height);
			}
		}

		function setActiveArea(x1, y1, x2, y2) {
			activeAreaX1 = Math.min(x1, x2);
			activeAreaX2 = Math.max(x1, x2);
			activeAreaY1 = Math.min(y1, y2);
			activeAreaY2 = Math.max(y1, y2);
		}

		function drawFrame(localTimeInSeconds) {
			var iterationDuration = localTimeInSeconds - lastFrameDrawnTime;

			if (!shouldLeaveTracksOfPoints) {
				canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			}

			allParticles.forEach(function (particle, particleIndex) {
				var position = particle.position;
				var px = position.x;
				var py = position.y;
				var comparingParticle;


				thisController.updateOneParticleOnIteration(particle, iterationDuration);

				if (shouldDrawLines) {
					var i = particleIndex + 1;
					for ( ; i < allParticles.length; i++) {
						comparingParticle = allParticles[i];

						drawLine(
							px, py, comparingParticle.x, comparingParticle.y,
							evaluateDistanceRatio(particle.position, comparingParticle.position)
						);

						if (!isNaN(mouseCursorLocalX)) {
							drawLine(
								px, py, mouseCursorLocalX, mouseCursorLocalY,
								evaluateDistanceRatio(
									particle.position,
									{
										x: mouseCursorLocalX, 
										y: mouseCursorLocalY
									}
								)
							);
						}
					}
				}


				if (shouldDrawPoints) {
					theDrawPointMethod(px, py);
				}

				if (shouldDebugVelocity) {
					drawVelocity(particle);
				}

				if (shouldDebugForce) {
					drawForce(particle);
				}

				var velocity = particle.velocity;
				var vx = velocity.x;
				var vy = velocity.y;


				if (shouldBounceAtBoundary) {
					if (px > activeAreaX2) {
						velocity.x = abs(vx) * -1;
					}
					if (py > activeAreaY2) {
						velocity.y = abs(vy) * -1;
					}
					if (px < activeAreaX1) {
						velocity.x = abs(vx);
					}
					if (py < activeAreaY1) {
						velocity.y = abs(vy);
					}
				}
			});


			if (!isNaN(mouseCursorLocalX) && shouldDrawPoints && !shouldLeaveTracksOfPoints) {
				theDrawPointMethod(mouseCursorLocalX, mouseCursorLocalY);
			}

			lastFrameDrawnTime = localTimeInSeconds;
		}

		function _drawPointAsRoundedDot(px, py) {
			canvasContext.fillStyle = 'rgba(' + pointColorRGB + ',' + 1 + ')';
			canvasContext.beginPath();
			canvasContext.arc(
				px, py, // center position
				pointSize/2, // radius
				0, Pi_2 // angle to travel
			);
			canvasContext.fill();
		}

		function _drawPointAsSqure(px, py) {
			canvasContext.fillRect(
				px - pointSize/2,     py - pointSize/2,
				pointSize,            pointSize
			);
		}

		function drawLine(p1x, p1y, p2x, p2y, distanceRatio, lineColor) {
			var lineWidthRatio = 1 - distanceRatio;
			var lineWidth = thickestLineWidth * lineWidthRatio;
			if (lineWidth < lineWidthDrawingThreshold) return;

			if (!lineColor) {
				lineColor =  'rgba(' + lineColorRGB + ',' + Math.min(1, lineWidthRatio * 0.3 + 0.3) + ')';
			}


			canvasContext.lineWidth = lineWidth;
			canvasContext.strokeStyle = lineColor;

			canvasContext.beginPath();
			canvasContext.moveTo(p1x, p1y);
			canvasContext.lineTo(p2x, p2y);
			canvasContext.stroke();
		}

		function drawVelocity(particle) {
			if (particle.speed * velocityDebugVisualScale < 2) return;

			var x = particle.position.x;
			var y = particle.position.y;
			var vx = particle.velocity.x;
			var vy = particle.velocity.y;

			drawLine(
				x, y,
				x+vx*velocityDebugVisualScale, y+vy*velocityDebugVisualScale,
				0,
				velocityDebugColor
			);
		}

		function drawForce(particle) {
			if (particle.forceStrength * forceDebugVisualScale < 2) return;

			var x = particle.position.x;
			var y = particle.position.y;
			var fx = particle.force.x;
			var fy = particle.force.y;

			drawLine(
				x, y,
				x+fx*forceDebugVisualScale, y+fy*forceDebugVisualScale,
				0,
				forceDebugColor
			);
		}

		function _generateAllPoints() {
			allParticles.length = 0;

			for (var i = 0; i < pointsCount; i++) {
				var particle = new wulechuan2DParticle({
					// doNotBearOnInit: true
				});

				thisController.initOneParticle(
					particle, pointsCount, activeAreaX1, activeAreaY1, activeAreaX2, activeAreaY2
				);

				allParticles.push(particle);
			}
		}

		function _initOneParticleDefaultMethod(particle) {
			particle.position = [
				randomBetween(activeAreaX1, activeAreaX2),
				randomBetween(activeAreaY1, activeAreaY2)
			];
			// particle.speed = randomBetween(speedMin, speedMax);
			// particle.velocityDirection = randomBetween(0, Pi_2);
		}

		function _updateOneParticleOnIterationDefaultMethod(particle, iterationDuration) {
			var forceStrength = 0.1;
			particle.force.add([
				randomBetween(-forceStrength, forceStrength),
				randomBetween(-forceStrength, forceStrength),
			]);
			particle.move(iterationDuration);
		}

		function evaluateDistanceRatio(position1, position2) {
			var distance2 = position1.getDistance2To(position2);
			var distance2Ratio = distance2 / maxDistanceToMakeConnection2;
			
			return Math.min(1, distance2Ratio);
		}
	}
})();