	function WulechuanApplyOneStageOneMethodProgrammingPatternFor(stagesOperator) {
		var methodName_addStage = 'addStage';
		var methodName_setUsedNaturalLanguageTo = 'setUsedNaturalLanguageTo';
		var methodName_startFromFirstStage = 'startFromFirstStage';

		var thisManagerOfStages = this;

		var allStages = [];
		var currentStageIndex = NaN;
		var usingLanguage;

		thisManagerOfStages[methodName_addStage] = defineFirstStage;
		thisManagerOfStages[methodName_setUsedNaturalLanguageTo] = setUsedNaturalLanguageTo;




		/**
		 * 
		 * @param {!object} stageAction 
		 * @param {!boolean} isAnOptionalStage 
		 * @param {!object} actionAliases 
		 * 
		 * @example
		 * 	function myLovelyClass() {
		 * 		var myBuilder = new WulechuanActionStagesBuilder(this);
		 *  	myBuilder.addStage(methodAsStage1, {
		 * 			'zh-CN': [ '第一步', '预备', '准备' ],
		 * 			'en-US': [ 'prepare', 'getReady', 'methodAsStage1', 'firstOfAll' ]
		 *  	});

		 *  	myBuilder.addStage(shoot, {
		 * 			'zh-CN': [ '发射', '开火', '开火！' ],
		 * 			'en-US': [ 'shoot', 'shootThem', 'fire' ]
		 *  	});
		 * 
		 * 
		 * 		function methodAsStage1() {
		 * 			// your actions here
		 * 		}
		 * 
		 * 		function shoot() {
		 * 			// your actions here
		 * 		}
		 * 	}
		 */
		function addStage(stageAction, allowsToSkipThisStage, actionAliases) {
			if (typeof stageAction !== 'function') {
				throw TypeError(
					'A so-called stage is basically a function, '+
					'with some associated aliases just for conveniences, '+
					'which not only does some demonded work '+
					'but also exposes subsequence stages '+
					'and hides past stages for a given stages operator. '+
					'Among them, the demonded work is provided by you developer, '+
					'So, when defining a stage, the first argument must be a function, '+
					'\nwhile the input was of type "'+typeof stageAction+'".'
				);
			}

			if (!actionAliases) {
				throw TypeError(
					'At least one alias is required for a stage action to publish as a method.'
				);
			}

			var indexOfThisStage = allStages.length;

			var newStage = {
				actionAliases: actionAliases,
				allowsToSkip: allowsToSkipThisStage,
				action: function () {
					currentStageIndex = indexOfThisStage;
					var resultOfTheStageAction = stageAction.apply(stagesOperator, arguments);

					_modifyThisOperatorByExposingOrHidingSomeMethods();

					if (indexOfThisStage === allStages.length-1) {
						// The final result of the actions chain is really what we want.
						return resultOfTheStageAction;
					} else {
						// Must return the {stagesOperator} for chaining steps,
						// even if errors occur inside the action, as long as nothing get thrown.
						return stagesOperator;
					}
				}
			};

			allStages.push(newStage);

			return newStage;
		}

		function defineFirstStage(stageAction, actionAliases) {
			// The first stage is ALWAYS required,
			// it doesn't make any sense if it is allowed to skip.
			addStage(stageAction, true, actionAliases);
			thisManagerOfStages[methodName_addStage] = addStage;
			thisManagerOfStages[methodName_setUsedNaturalLanguageTo] = setUsedNaturalLanguageTo;
			_tryToExposeFirstStageSoThatTheOperatorIsUsable();
		}

		function setUsedNaturalLanguageTo(language) {
			if (!language) {
				throw TypeError('Must specify the natural language to use.');
			}
			usingLanguage = language;
			_tryToExposeFirstStageSoThatTheOperatorIsUsable();
		}

		function _tryToExposeFirstStageSoThatTheOperatorIsUsable() {
			if (allStages.length < 1) return;
			if (!usingLanguage) return;

			// Expose it with the common name.
			thisManagerOfStages[methodName_startFromFirstStage] = startFromFirstStage;

			// Also expose it with specified aliases of first stage.
			var actionAliasesInCurrentLanuageToExpose = allStages[0].actionAliases[usingLanguage];
			for (var ai=0; ai< actionAliasesInCurrentLanuageToExpose.length; ai++) {
				var alias = actionAliasesInCurrentLanuageToExpose[ai];
				thisManagerOfStages[alias] = startFromFirstStage;
			}
		}

		function startFromFirstStage() {
			allStages[0].action.apply(stagesOperator, arguments);
		}

		function _modifyThisOperatorByExposingOrHidingSomeMethods() {
			_hideMethodsOfAllPastOrSkippedStages();

			var currentStage = allStages[currentStageIndex];

			currentStage.action.apply(stagesOperator, arguments);

			if (currentStageIndex === 0) {
				_exposeMethodsOfAllStagesStartingWithIndex(1);
			}
		}

		function _hideMethodsOfAllPastOrSkippedStages() {
			for (var si = 0; si <= currentStageIndex; si++) {
				var stage = allStages[si];
				var actionAliasesInCurrentLanuage = stage.actionAliases[usingLanguage];
				for (var ai = 0; ai < actionAliasesInCurrentLanuage.language; ai++) {
					var alias = actionAliasesInCurrentLanuage[ai];
					delete stagesOperator[alias];
				}
			}
		}

		function _exposeMethodsOfAllStagesStartingWithIndex(startingStageIndex) {
			var allForwardsOptionalStagesTillFirstRequiredStage = [];

			var si, stage;
			for (si = startingStageIndex; si < allStages.length; si++) {
				stage = allStages[si];
				allForwardsOptionalStagesTillFirstRequiredStage.push(stage);
				if (!stage.allowsToSkip) {
					break;
				}
			}

			for (si = 0; si < allForwardsOptionalStagesTillFirstRequiredStage.length; si++) {
				stage = allForwardsOptionalStagesTillFirstRequiredStage[si];

				var stageActionToExpose = stage.action;

				var actionAliasesInCurrentLanuage = stage.actionAliases[usingLanguage];
				for (var ai = 0; ai < actionAliasesInCurrentLanuage.language; ai++) {
					var alias = actionAliasesInCurrentLanuage[ai];
					stagesOperator[alias] = stageActionToExpose;
				}
			}
		}
	}






	var nameOfEntranceMethod_zhCN = '吴乐川：拟传授类';
	var nameOfEntranceMethod_enUS = 'wulechuanImpartAnInstanceOf';

	var wulechuanImpartMultilingualMethodsHost = createWulechuanImpartMutilingualMethods();
	var wulechuanObjectAndClassHelper = {};

	wulechuanObjectAndClassHelper[nameOfEntranceMethod_zhCN] =
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_zhCN];

	wulechuanObjectAndClassHelper[nameOfEntranceMethod_enUS] =
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_enUS];

	window.wulechuanObjectAndClassHelper = wulechuanObjectAndClassHelper;

	/**
	 * @author 吴乐川 <wulechuan@live.com>
	 * @example
	 * 	function My2DVector() {
	 * 		...
	 * 	}
	 *
	 * 	My2DVector.profilesForWulechuanImpartation = {
	 * 		position2D: { instanceChiefName: 'position', ... },
	 * 		force2D:    { instanceChiefName: 'force', ... },
	 * 		velocity2D: { instanceChiefName: 'velocity', ... }
	 * 	}
	 *
	 * 	function My2DPoint() {
	 * 		wulechuanImpart(My2DVector).as('position2D').to(this);
	 * 	}
	 *
	 * 	function My2DParticle() {
	 * 		wulechuanImpart(My2DVector).as('position2D').renamedAs('pos').to(this);
	 *
	 * 		wulechuanImpart(My2DVector).as('velocity2D').renamedAs({
	 * 			speed: 'velocityLength',
	 * 			speed2: 'squareSpeed'
	 * 			velocityDirection: 'movingDirection'
	 * 		}).to(this);
	 *
	 * 		wulechuanImpart(My2DVector)
	 * 			.as('position2D')
	 * 			.buildAccordingTo({
	 * 				x: 3,
	 * 				y: -19
	 * 			})
	 * 			.withCustomizedPropertyNames({
	 * 				__chiefName__: 'centerPos',
	 * 				x: 'centerX',
	 * 				y: 'centerY'
	 * 			})
	 * 			.to(this);
	 *
	 * 		wulechuanImpart(My2DVector)
	 * 			.usingThisProfile('force2D')
	 * 			.withCustomizedPropertyNames({
	 * 				strength: 's',
	 * 				forceDirection: 'forceAngle'
	 * 			})
	 * 			.to(this);
	 * 	}
	 *
	 * 	My2DParticle.profilesForWulechuanImpartation = {
	 * 		default: { instanceChiefName: 'particle2D', ... }
	 * 	};
	 *
	 * 	var myLovelyObjectLiteral = { name: '吴乐川', email: 'wulechuan@live.com' };
	 *  wulechuanImpart(My2DParticle).to(myLovelyObjectLiteral);
	 */


	/**
	 * This is the factory function to build up the impartation tool,
	 * returning some methods which are virtually the same to each other,
	 * but in mutliple human languages.
	 */
	function createWulechuanImpartMutilingualMethods() {
		// This method name below will NOT be public
		// because we are wrapping it with an outer function,
		// so that we can easily decide the using langugae.
		// Thus, only one alias is enough for it to use inside this scope.
		var methodName_startToImpart = 'startToImpart';

		var methodName_usingThisProfile_zhCN0 = '并视作';
		var methodName_usingThisProfile_enUS0 = 'as';
		var methodName_usingThisProfile_enUS1 = 'usingThisProfile';

		var methodName_buildAccordingTo_zhCN0 = '之实例，构建时依据';
		var methodName_buildAccordingTo_enUS0 = 'buildAccordingTo';

		var methodName_withCustomizedPropertyNames_zhCN0 = '并变更以下属性';
		var methodName_withCustomizedPropertyNames_enUS0 = 'withCustomizedPropertyNames';
		var methodName_withCustomizedPropertyNames_enUS1 = 'renamedAs';

		var methodName_towards_zhCN0 = '予';
		var methodName_towards_enUS0 = 'to';

		var propertyName_profilesForWulechuanImpartation = 'profilesForWulechuanImpartation';
		var propertyName_defaultProfile = 'default';
		var propertyName_instanceChiefName = 'instanceChiefName';




		var languageCode_zhCN = 'zh-CN';
		var languageCode_enUS = 'en-US';




		var sliceArray = Array.prototype.slice;

		var wulechuanImpartMultilingualMethodsHost = {};
		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_zhCN] =
			impart.bind(null, languageCode_zhCN);

		wulechuanImpartMultilingualMethodsHost[nameOfEntranceMethod_enUS] =
			impart.bind(null, languageCode_enUS);

		return wulechuanImpartMultilingualMethodsHost;




		/**
		 * The function, the wrapped versions of which are exposed.
		 * Wrapping is essentially for providing this function
		 * in multiple human languages.
		 *
		 * Each wrapped version creates an instance of the class "WulechuanImpartationOperator",
		 * and then calls the "startToImpart" method of the instance
		 * to complete desired impartation process.
		 */
		function impart() {
			var args = sliceArray.apply(arguments);
			var usingLanguage = args.unshift();
			var operator = new _WulechuanImpartationOperator(usingLanguage);
			return operator.startToImpart.apply(operator, args);
		}





		/**
		 * A class, instance of which is the operator
		 * that remembers several key factors and does the impartation job
		 * for a given class(a.k.a. a function).
		 *
		 * Each time the entrance method is invoked,
		 * a new instance of this class is created,
		 * and takes over the imartation process afterwards.
		 *
		 * @class
		 * @param {string} usingLanguage
		 */
		function _WulechuanImpartationOperator(usingLanguage) {
			var thisOperator = this;

			var errorAlreadyOcurred = false;
			var currentErrorMessage;
			var shouldThrowErrors;

			var theConstructor;
			var theConstructionOptions;
			var allImpartationProfiles;

			var usedProfile;
			var usedPropertyNamesCustomization = {};


			var stagesForMethods = new WulechuanApplyOneStageOneMethodProgrammingPatternFor(thisOperator);

			stagesForMethods.addStage(startToImpart, {
				'zh-CN': [
					methodName_startToImpart
				],
				'en-US': [
					methodName_startToImpart
				]
			});

			stagesForMethods.addStage(usingThisProfile, {
				'zh-CN': [
					methodName_usingThisProfile_zhCN0
				],
				'en-US': [
					methodName_usingThisProfile_enUS0,
					methodName_usingThisProfile_enUS1
				]
			});

			stagesForMethods.addStage(buildAccordingTo, {
				'zh-CN': [
					methodName_buildAccordingTo_zhCN0
				],
				'en-US': [
					methodName_buildAccordingTo_enUS0
				]
			});

			stagesForMethods.addStage(withCustomizedPropertyNames, {
				'zh-CN': [
					methodName_withCustomizedPropertyNames_zhCN0
				],
				'en-US': [
					methodName_withCustomizedPropertyNames_enUS0,
					methodName_withCustomizedPropertyNames_enUS1
				]
			});

			stagesForMethods.addStage(towards, {
				'zh-CN': [
					methodName_towards_zhCN0
				],
				'en-US': [
					methodName_towards_enUS0
				]
			});





			function _the(subject) {
				return {
					isNeitherAnObjectNorAnArray: function() {
						return !subject || typeof subject !== 'object';
					},

					isAValidObject: function() {
						return !!subject && typeof subject === 'object' && !Array.isArray(subject);
					},

					isNotAValidObject: function() {
						return !_the(subject).isAValidObject();
					},

					isAValidArray: function() {
						return Array.isArray(subject);
					},

					isAnInvalidArray: function() {
						return !Array.isArray(subject);
					},

					isAValidKey: function() {
						return !!subject && typeof subject === 'string';
					},

					isAnInvalidKey: function(subject) {
						return !_the(subject).isAnValidKey(subject);
					},

					isAValidProfile: function() {
						var isValid =
								_the(subject).isAValidObject(subject)
							&&	_the(subject).isAValidKey(subject[propertyName_instanceChiefName])
							;

						return isValid;
					}
				};
			}

			function _dealWithCurrentError() {
				errorAlreadyOcurred = true;
				
				if (shouldThrowErrors) {
					throw TypeError('\n'+currentErrorMessage);
				} else {
					console.error(TypeError('\n'+currentErrorMessage));
				}
			}


			/**
			 * Step 1 - to accept the function treated as a class, instances of which will be imparted.
			 *
			 * @param {!function} theGivenFunction
			 * @param {?boolean} shouldNotThrowErrors
			 */
			function startToImpart(theGivenFunction, shouldNotThrowErrors) {
				shouldThrowErrors = !shouldNotThrowErrors;


				if (typeof theGivenFunction !== 'function') {
					switch (usingLanguage) {
						case languageCode_zhCN:
							currentErrorMessage =
								'首个参数必须为一个函数。其将被视为一个构造函数以构造一个对象。'+
								'该对象之属性和方法将被传授给受封者。'+
								'\n而实际提供的首个参数是一个'+typeof theGivenFunction + '。'
								;
							break;

						case languageCode_enUS:
							currentErrorMessage =
								'The provided source must be a function, '+
								'which will be used as a constructor '+
								'to create the object to impart to a grantee.'+
								'\nWhat\'s actually provided was of type: '+
								typeof theGivenFunction + '.'
								;
							break;
					}

					_dealWithCurrentError();
				} else {
					theConstructor = theGivenFunction;
				}


				var _allImpartationProfiles = theConstructor[propertyName_profilesForWulechuanImpartation];
				if (_the(_allImpartationProfiles).isNotAValidObject()) {
					_allImpartationProfiles = {};
					_allImpartationProfiles[propertyName_defaultProfile] = {};
				}


				allImpartationProfiles = _allImpartationProfiles;


				var _defaultProfile = allImpartationProfiles[propertyName_defaultProfile];
				if (_the(_defaultProfile).isAValidProfile()) {
					usedProfile = _defaultProfile;
				}
			}

			/**
			 * Step 2 - to accept the name of the desired variant to use.
			 *
			 * @param {!string} variantName
			 */
			function usingThisProfile(profileName) {
				if (errorAlreadyOcurred) return thisOperator;

				var _foundProfile;
				var _theFoundProfileIsInvalid = true;

				if (_the(profileName).isAValidKey()) {
					_foundProfile = allImpartationProfiles[profileName];

					if (_the(_foundProfile).isAValidProfile()) {
						usedProfile = _foundProfile;
						_theFoundProfileIsInvalid = false;
					}
				}

				if (_theFoundProfileIsInvalid) {
					if (typeof profileName !== 'string') {
						profileName = typeof profileName;
					}

					switch (usingLanguage) {
						case languageCode_zhCN:
							currentErrorMessage =
								'未找到指定的变体。'+
								'输入参数为：“'+profileName+'”。';
							break;

						case languageCode_enUS:
							currentErrorMessage =
								'The desired profile name was invalid. '+
								'No profile was matched by that name. '+
								'\nThe input was "'+profileName+'".';
							break;
					}

					_dealWithCurrentError();
				}
			}

			/**
			 * Step 3 - to accept the options for construction of an instance that is to impart.
			 *
			 * @param {?object} constructionOptions
			 */
			function buildAccordingTo(constructionOptions) {
				theConstructionOptions = constructionOptions;
			}

			function withCustomizedPropertyNames(propertyNamesCustomization) {
				if (errorAlreadyOcurred) return thisOperator;

				if (_the(propertyNamesCustomization).isNotAValidObject()) {
					errorAlreadyOcurred = true;
				} else {
					usedPropertyNamesCustomization = propertyNamesCustomization;
				}
			}

			function towards(granteeOfMethods, granteeOfProperties) {
				if (errorAlreadyOcurred) return;

				if (_the(granteeOfMethods).isNeitherAnObjectNorAnArray()) {
					switch (usingLanguage) {
						case languageCode_zhCN:
							currentErrorMessage = '受封者必须是一个标准对象或数组，且不可为空对象（null）。';
							break;

						case languageCode_enUS:
							currentErrorMessage =
								'The grantee to impart methods and properties to '+
								'must be an object or an array, and not a null.'
								;
							break;
					}

					_dealWithCurrentError();
				}

				if (_the(granteeOfProperties).isNeitherAnObjectNorAnArray()) {
					granteeOfProperties = granteeOfMethods;
				}




				if (errorAlreadyOcurred) {
					// return nothing if any error occurs.
					return;
				}



				var theInstanceThatHasBeenImparted =  _impartIt(granteeOfMethods, granteeOfProperties);
				// return the instance for the grantee to store a variable within its scope.
				return theInstanceThatHasBeenImparted;
			}


			function _impartIt(granteeOfMethods, granteeOfProperties) {
				var intanceObjectToImpart = new theConstructor;

				for (var attributeName in intanceObjectToImpart) {
					var attribute = intanceObjectToImpart[attributeName];
					var attributeImpartationName = attributeName;

					var shouldSkip = false;
					if (shouldSkip) continue;

					var customizedImpartationMethod = _configurations[attributeName];

					if (typeof customizedImpartationMethod === 'function') {
						customizedImpartationMethod(intanceObjectToImpart, granteeOfMethods);
						continue;
					}

					var attributeIsAMethod = typeof attribute === 'function';
					var attributeIsAProperty = typeof attribute !== 'function';

					if (attributeIsAMethod) {
						_impartOneMethodTheDefaultWay(
							intanceObjectToImpart,
							attributeName,
							granteeOfMethods,
							attributeImpartationName
						);
						continue;
					}

					if (attributeIsAProperty) {
						_impartOnePropertyTheDefaultWay(
							intanceObjectToImpart,
							attributeName,
							granteeOfProperties,
							attributeImpartationName
						);
						continue;
					}
				}

				return intanceObjectToImpart;
			}

			function _impartOneMethodTheDefaultWay(objectToImpart, oldName, granteeOfMethod, newName) {
				Object.defineProperty(objectToImpart, newName,
					{
						enumerable: true,
						get: function () {
							return objectToImpart[oldName];
						}
						// method should have no setter
					}
				);
			}

			function _impartOnePropertyTheDefaultWay(objectToImpart, propertyOldName, granteeOfProperty, propertyNewName) {
				Object.defineProperty(objectToImpart, propertyNewName,
					{
						enumerable: true,
						get: function () {
							return objectToImpart[propertyOldName];
						},
						set: function (newValue) {
							objectToImpart[propertyOldName] = newValue;
						}
					}
				);
			}
		}
	}