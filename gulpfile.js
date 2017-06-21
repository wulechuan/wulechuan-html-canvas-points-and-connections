const shouldMinifyFiles = true;
let shouldBuildSourceMaps = true;
const shouldPreserveTempFilesForInspection = false;


const productionSourceGlobJs = ['source/**/*.js'];
const productionBuildFolder = 'build';

const samplesSourceFolder = 'samples/source';
const samplesBuildFolder = 'samples/build';

const samplesSourceGlobCss = [
	samplesSourceFolder+'/**/*.stylus',
	samplesSourceFolder+'/**/*.styl'
];

const samplesSourceGlobJs = [
	samplesSourceFolder+'/**/*.js'
];

const samplesSourceGlobHtml = [
	samplesSourceFolder+'/**/*.html'
];

const buildingCacheFolder = '_temp';

const allSourceGlobsToWatch = [
	'source/**/*',
	samplesSourceFolder+'/**/*'
];

const globsToClearBeforeRebuilding = [
	productionBuildFolder,
	samplesBuildFolder,
	samplesSourceFolder+'/**/*.min.css',
	samplesSourceFolder+'/**/*.min.js',
	samplesSourceFolder+'/**/*.min.html',
	samplesSourceFolder+'/**/*.min.map'
];





const gulp = require('gulp');
const runTasksInSequence = require('gulp-sequence');
const deleteFiles = require('del');
const renameFiles = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const compileStylus = require('gulp-stylus');
const minifyJs = require('gulp-uglify');
const minifyHtml = require('gulp-html-minify');
const pump = require('pump');



if (!shouldMinifyFiles) shouldBuildSourceMaps = false;



(function 定义针对样式的任务() {
	gulp.task('build: css: samples', (onThisTaskDone) => {
		var actionsToTake = [];

		actionsToTake.push(gulp.src(samplesSourceGlobCss));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.init());
		}

		actionsToTake.push(compileStylus({
			compress: shouldMinifyFiles
		}));

		actionsToTake.push(renameFiles({
			suffix: '.min'
		}));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.write('.'));
		}

		actionsToTake.push(gulp.dest(samplesBuildFolder));

		pump(actionsToTake, onThisTaskDone);
	});

	gulp.task('build: css: all', (onThisTaskDone) => {
		runTasksInSequence(
			'build: css: samples'
		)(onThisTaskDone);
	});
})();


(function 定义针对脚本的任务() {
	gulp.task('build: js: chief', (onThisTaskDone) => {
		var actionsToTake = [];

		actionsToTake.push(gulp.src(productionSourceGlobJs));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.init());
		}

		if (shouldMinifyFiles) {
			actionsToTake.push(minifyJs());
		}

		actionsToTake.push(renameFiles({
			suffix: '.min'
		}));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.write(productionBuildFolder));
		}

		actionsToTake.push(gulp.dest(productionBuildFolder));

		pump(actionsToTake, onThisTaskDone);
	});

	gulp.task('build: js: samples', (onThisTaskDone) => {
		var actionsToTake = [];

		actionsToTake.push(gulp.src(samplesSourceGlobJs));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.init());
		}

		if (shouldMinifyFiles) {
			actionsToTake.push(minifyJs());
		}

		actionsToTake.push(renameFiles({
			suffix: '.min'
		}));

		if (shouldBuildSourceMaps) {
			actionsToTake.push(sourcemaps.write('.'));
		}

		actionsToTake.push(gulp.dest(samplesBuildFolder));

		pump(actionsToTake, onThisTaskDone);
	});

	gulp.task('build: js: all', (onThisTaskDone) => {
		runTasksInSequence(
			'build: js: chief',
			'build: js: samples'
		)(onThisTaskDone);
	});
})();


(function 定义针对HTML的任务() {
	gulp.task('build: html: minify-samples', (onThisTaskDone) => {
		var actionsToTake = [];

		actionsToTake.push(gulp.src(samplesSourceGlobHtml));

		if (shouldMinifyFiles) {
			actionsToTake.push(minifyHtml({
				removeComments: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: false,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				// removeOptionalTags: true
			}));
		}

		// actionsToTake.push(renameFiles({
		// 	suffix: '.min'
		// }));

		actionsToTake.push(gulp.dest(samplesBuildFolder));

		pump(actionsToTake, onThisTaskDone);
	});

	gulp.task('build: html: all', (onThisTaskDone) => {
		runTasksInSequence(
			'build: html: minify-samples'
		)(onThisTaskDone);
	});
})();


(function 定义二级公共任务() {
	gulp.task('clear old build', () => {
		return deleteFiles(globsToClearBeforeRebuilding);
	});

	gulp.task('clear build cache', (onThisTaskDone) => {
		setTimeout(()=> {
			deleteFiles(buildingCacheFolder);
			onThisTaskDone();
		}, 1234);
	});

	gulp.task('build: all', (onThisTaskDone) => {
		var tasksToRun = [
			'clear old build',
			[
				'build: css: all',
				'build: js: all',
				'build: html: all'
			]
		];

		if (!shouldPreserveTempFilesForInspection) {
			tasksToRun.push('clear build cache');
		}

		runTasksInSequence.apply(null, tasksToRun)(onThisTaskDone);
	});

	gulp.task('watch', [], () => {
		return gulp.watch(allSourceGlobsToWatch, ['build: all']);
	});
})();


(function 定义所谓顶级任务() {
	gulp.task('default', (onThisTaskDone) => {
		runTasksInSequence('build: all', 'watch')(onThisTaskDone);
	});

	gulp.task('test', () => {
		// nothing yet
	});
})();