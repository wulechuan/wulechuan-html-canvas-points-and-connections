	/**
	 * @author 吴乐川 <wulechuan@live.com>
	 * 
	 * 凡由本辅助类构建的实例对象，可用于将本人设计的一种程序设计模式应用至另一“受体”对象。
	 * “受体”因而被改造，所涉及的其各个方法函数均被依次对应于各自的所谓“执行阶段”，
	 * 每个方法函数对应一个执行阶段。
	 * 自此时起，仅第一个执行阶段所对应的方法函数被公开（或称“曝露”），
	 * 其余后续阶段之方法函数均被隐藏，直至其各自前导执行阶段完成，这些方法函数才会陆续公开。
	 * 一言以蔽之，不执行完早期方法函数，则后续方法函数是隐藏的，无从执行。从而严格限定各个方法之调用次序。
	 * 
	 * 任何“执行阶段”，凡非最终者，其对应之方法函数均返回“受体”对象本身，以实现对其各个方法函数的链式调用；
	 * 而最终“执行阶段”则负责返回程序作者对执行整个执行链所期望之结果。
	 * 
	 * 此番改造之根本目的在于，将传统的形如：
	 * @example
	 * 	“var 结果 = 对象.传统方法函数(参数1, 参数2, 参数3);”
	 * 
	 * 之调用方式，转变为我之特色方式，形如：
	 * @example
	 * 	“var 结果 = 对象.方法函数1(参数1).方法函数2(参数2).方法函数3(参数3)；”，
	 * 
	 * 并建议（但不强迫）每个阶段仅接受至多一个参数。
	 * 此方式亦有助于构造更为逼近自然语言之程序语句。
	 * 例如：
	 * @example
	 * 	var 礼物 = 我.掏出钥匙(钥匙实例).解锁自行车(自行车实例).骑行至(目的地).获取礼物自(赠与人);
	 * 
	 * 在上例中，依据“不执行完早期方法函数，则后续方法函数无从执行”之规则，
	 * 客户程序调用对象“我”之方法时，不允许违背规定顺序。
	 * 若不调用“解锁自行车”，或虽调用但有错误抛出，则无法进入“骑行至”方法函数。
	 * 假定其中“获取礼物自”方法函数，是应用该程序设计模式时最末添加的阶段所对应之方法，
	 * 那么，该原始方法函数之返回值回被传递病最终返回至“外界”；
	 * 而其余各阶段则之原始函数的返回值均会被忽略于调用链内部。
	 * 
	 * 通常，我建议奖该程序设计模式应用于“类”之定义内（针对JavaScript，亦即应用于另一个函数内部），
	 * 以此方式自动改造每一个由该类构造的实例对象。见例。
	 * 
	 * Instances of this helper class is to apply a programming pattern design by me
	 * to a given object.
	 * The object is thus decorated, so that, all involved methods of the object
	 * are mapped into so-called stages, each method a stage.
	 * And from then on, only the first method is exposed.
	 * All other methods are hidden untill the first method gets invoked and not thrown.
	 * 
	 * Any stage other than the last one, when invoked,
	 * returns the instance itself, so that we can chain the invocations.
	 * This way we can easily design natural-language-like invocation chain.
	 * 
	 * The purpose of applying such a pattern to a given object,
	 * is to change the traditional statement like:
	 * @example
	 * 	var result = anObject.traditionalMethod(arg1, arg2, arg3);
	 * 
	 * into another format as:
	 * @example
	 * 	var result = anObject.method1(arg1).method2(arg2).method3(arg3);
	 * 
	 * I also suggest but not force to take at most only one argument per stage method.
	 * Besides, this is a good way, I personally think, to make statements look more like
	 * natrual language sentences.
	 * Let's take another example:
	 * @example
	 * 	var gift = I
	 * 		.drawOutKey(theKeyInstance)
	 * 		.unlockBike(theBikeInstance)
	 * 		.driveTo(destination)
	 * 		.acceptGiftFrom(anotherPerson);
	 * 
	 * In th example above, ... // to be completed
	 * 
	 * Usually you want to use an instance of this helper class inside another class,
	 * to decorate each and every instance of the later class.
	 * @param {!object} stagesOperator
	 * 
	 * @example
	 * 	function Soldier() {
	 * 
	 * 		var stagesBuilder = new WulechuanApplyOneStageOneMethodProgrammingPatternFor(this);
	 * 
	 * 		stagesBuilder.addStage(methodAsStage1, {
	 * 			'zh-CN': [ '第一步', '预备', '准备' ],
	 * 			'en-US': [ 'prepare', 'getReady', 'methodAsStage1', 'firstOfAll' ]
	 * 		});
	 * 
	 * 		stagesBuilder.addStage(shoot, {
	 * 			'zh-CN': [ '发射子弹', '开火', '开火！' ],
	 * 			'en-US': [ 'shoot', 'shootThem', 'fire' ]
	 * 		});
	 * 
	 * 
	 * 
	 * 		// This line below is essential and required.
	 * 		stagesBuilder.setPreferredNaturalLanguageTo('zh-CN');
	 * 
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
	 * 
	 * 	var firstSoldier = new Soldier;
	 * 	
	 * 	// Now the "firstSoldier" object has only those methods
	 * 	// which are mapped onto the "methodAsStage1" function,
	 * 	// in all three Chinese aliases, of course,
	 * 	// since the usingLanguage has been set to 'zh-CN'.
	 * 	// Those which are mapped onto the "shoot" function
	 * 	// is *NOT* available at this time.
	 * 
	 * 	firstSoldier.第一步(); // In English, this should have been firstSoldier.prepare();
	 * 
	 * 	// Note that: firstSoldier === firstSoldier.第一步(),
	 * 	// because non-terminal stage methods return the decorared object itself.
	 * 
	 * 	// From now on, the three aliases for the "methodAsStage1"
	 * 	// are hidden (removed from the instance), since the stage1 is now a past stage.
	 * 	// while the three aliases for the "shoot" function are available now.
	 * 
	 * 	// If below were in English: var killedEnemies = firstSoldier.shoot();
	 * 	var killedEnemies = firstSoldier.发射子弹();
	 * 
	 * @example:
	 * 	// Chaining invocations:
	 * 	var secondSoldier = new Soldier;
	 * 
	 * 	// If below were in English: var killedEnemiesBySecondSoldier = secondSoldier.getReady().fire();
	 * 	var 被打死的敌人 = secondSoldier.预备().开火！();
	 */
	function WulechuanApplyOneStageOneMethodProgrammingPatternTo(stagesOperator) {
		var methodName_addStage = 'addStage';
		var methodName_setPreferredNaturalLanguageTo = 'setPreferredNaturalLanguageTo';
		var methodName_startFromFirstStage = 'startFromFirstStage';

		var thisManagerOfStages = this;

		var allStages = [];
		var currentStageIndex = NaN;
		var usingLanguage;

		thisManagerOfStages[methodName_addStage] = addFirstStage;
		thisManagerOfStages[methodName_setPreferredNaturalLanguageTo] = setPreferredNaturalLanguageTo;





		function _isAUsableArray(subject) {
			return Array.isArray(subject) && subject.length > 1;
		}


		/**
		 * 
		 * @param {!object} stageAction 
		 * @param {!boolean} isAnOptionalStage 
		 * @param {!object} actionAliases 
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

			actionAliases.stageIndex = indexOfThisStage;
			actionAliases.usingLanguage = '';

			allStages.push(newStage);

			return newStage;
		}

		function addFirstStage(stageAction, actionAliases) {
			// The first stage is ALWAYS required,
			// it doesn't make any sense if it is allowed to skip.
			addStage(stageAction, true, actionAliases);
			thisManagerOfStages[methodName_addStage] = addStage;
			thisManagerOfStages[methodName_setPreferredNaturalLanguageTo] = setPreferredNaturalLanguageTo;
			_tryToExposeFirstStageSoThatTheOperatorIsUsable();
		}

		function _getActionAliasesBetterInThisLanguage(actionAliasesInAllLanguages, preferredLanguage) {
			var foundActionAliases = actionAliasesInAllLanguages[preferredLanguage];
			if (_isAUsableArray(foundActionAliases)) {
				actionAliasesInAllLanguages.usingLanguage = preferredLanguage;
				return foundActionAliases;
			}

			for (var language in actionAliasesInAllLanguages) {
				foundActionAliases = actionAliasesInAllLanguages[language];
				if (_isAUsableArray(foundActionAliases)) {
					actionAliasesInAllLanguages.usingLanguage = language;
					return foundActionAliases;
				}
			}

			if (!_isAUsableArray(foundActionAliases)) {
				throw ReferenceError(
					'No valid aliases in any language for stage '+
					actionAliasesInAllLanguages.stageIndex+
					'!'
				);
			}
		}

		function setPreferredNaturalLanguageTo(language) {
			if (!language) {
				throw TypeError('Must specify the natural language to use.');
			}
			usingLanguage = language;
			_tryToExposeFirstStageSoThatTheOperatorIsUsable();
		}

		function startFromFirstStage() {
			allStages[0].action.apply(stagesOperator, arguments);
		}

		function _modifyThisOperatorByExposingOrHidingSomeMethods() {
			_hideMethodsOfAllPastOrSkippedStages();

			var currentStage = allStages[currentStageIndex];

			currentStage.action.apply(stagesOperator, arguments);

			if (currentStageIndex === 0) {
				_exposeMethodsOfAllStagesStartingWithIndexTillFirstRequiredStage(1);
			}
		}

		function _hideMethodsOfAllPastOrSkippedStages() {
			for (var si = 0; si <= currentStageIndex; si++) {
				var stage = allStages[si];
				var actionAliasesInAllLanguages = stage.actionAliases;
				var actionAliasesInActuallyUsingLanuage =
					actionAliasesInAllLanguages[actionAliasesInAllLanguages.usingLanguage];

				for (var ai = 0; ai < actionAliasesInActuallyUsingLanuage.length; ai++) {
					var alias = actionAliasesInActuallyUsingLanuage[ai];
					delete stagesOperator[alias];
				}
			}
		}

		function _tryToExposeFirstStageSoThatTheOperatorIsUsable() {
			if (allStages.length < 1) return;
			if (!usingLanguage) return;

			// Expose the method of the first stage with the common name,
			// a.k.a. the "startFromFirstStage" according to the default configuration.
			thisManagerOfStages[methodName_startFromFirstStage] = startFromFirstStage;

			// Also expose it with aliases.
			_exposeMethodsOfStagesWithIndexBetween(0, 1);
		}

		function _exposeMethodsOfAllStagesStartingWithIndexTillFirstRequiredStage(startingStageIndex) {
			var endingExclusiveStageIndex = allStages.length;

			var si, stage;
			for (si = startingStageIndex; si < allStages.length; si++) {
				stage = allStages[si];
				if (!stage.allowsToSkip) {
					endingExclusiveStageIndex = si+1;
					break;
				}
			}

			_exposeMethodsOfStagesWithIndexBetween(startingStageIndex, endingExclusiveStageIndex);
		}

		function _exposeMethodsOfStagesWithIndexBetween(startingStageIndex, endingExclusiveStageIndex) {
			for (var si = startingStageIndex; si < endingExclusiveStageIndex; si++) {
				var stage = allStages[si];

				var actionToExpose = stage.action;

				var actionAliasesInActuallyUsingLanuage =
					_getActionAliasesBetterInThisLanguage(stage.actionAliases, usingLanguage);

				for (var ai = 0; ai < actionAliasesInActuallyUsingLanuage.length; ai++) {
					var alias = actionAliasesInActuallyUsingLanuage[ai];
					stagesOperator[alias] = actionToExpose;
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
		var languageCode_zhCN = 'zh-CN';
		var languageCode_enUS = 'en-US';



		// This method name below, which is the first method to invoke,
		// will NOT be public.
		// Because we are wrapping it with an outer function,
		// so that we can easily decide the using langugae.
		// Thus, only one alias is enough for it to use inside this scope.
		var methodName_startToImpart = ['startToImpart'];



		var methodNames_usingThisProfile_zhCN = [
			'并视作'
		];
		var methodNames_usingThisProfile_enUS = [
			'as',
			'usingThisProfile'
		];



		var methodNames_buildAccordingTo_zhCN = [
			'之实例，构建时依据'
		];
		var methodNames_buildAccordingTo_enUS = [
			'buildAccordingTo'
		];



		var methodNames_withCustomizedPropertyNames_zhCN = [
			'并变更以下属性'
		];
		var methodNames_withCustomizedPropertyNames_enUS = [
			'withCustomizedPropertyNames',
			'renamedAs'
		];



		var methodNames_towards_zhCN = ['予'];
		var methodNames_towards_enUS = ['to'];



		var propertyName_profilesForWulechuanImpartation = 'profilesForWulechuanImpartation';
		var propertyName_defaultProfile = 'default';
		var propertyName_instanceChiefName = 'instanceChiefName';






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


			var stagesForMethods = new WulechuanApplyOneStageOneMethodProgrammingPatternTo(thisOperator);

			stagesForMethods.addStage(startToImpart, {
				'zh-CN': methodName_startToImpart,
				'en-US': methodName_startToImpart
			});

			stagesForMethods.addStage(usingThisProfile, {
				'zh-CN': methodNames_usingThisProfile_zhCN,
				'en-US': methodNames_usingThisProfile_enUS
			});

			stagesForMethods.addStage(buildAccordingTo, {
				'zh-CN': methodNames_buildAccordingTo_zhCN,
				'en-US': methodNames_buildAccordingTo_enUS
			});

			stagesForMethods.addStage(withCustomizedPropertyNames, {
				'zh-CN': methodNames_withCustomizedPropertyNames_zhCN,
				'en-US': methodNames_withCustomizedPropertyNames_enUS
			});

			stagesForMethods.addStage(towards, {
				'zh-CN': methodNames_towards_zhCN,
				'en-US': methodNames_towards_enUS
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