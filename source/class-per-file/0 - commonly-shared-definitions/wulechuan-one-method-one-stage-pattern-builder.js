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
 * 此番改造之根本目的在于，将传统的形如：“
 * @example
 * 	var 结果 = 对象.传统方法函数(参数1, 参数2, 参数3);
 * 
 * ”之调用方式，转变为我之特色方式，形如：“
 * @example
 * 	var 结果 = 对象.方法函数1(参数1).方法函数2(参数2).方法函数3(参数3)；
 * 
 * ”，并建议（但不强迫）每个阶段仅接受至多一个参数。
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
 * Let''s take another example:
 * @example
 * 	var gift = I
 * 		.drawOutKey(theKeyInstance)
 * 		.unlockBike(theBikeInstance)
 * 		.driveTo(destination)
 * 		.acceptGiftFrom(anotherPerson);
 * 
 * In the example above, the custom program that consumes the object "I"
 * is *NOT* able to invoke methods of the "I" disobeying the pre-designed order.
 * Before the invocation of the "unlockBike" method, the subsequence ones
 * such as "driveTo" are not even available to the program.
 * Also, assuming the "acceptGiftFrom" method happens to be the last one that is
 * added as a stage, then the returning value, no matter what it is,
 * will be transferred to the "outside world", which is the custom program mentioned above.
 * While those returning values of any other methods are simply ignored
 * inside of the invokaction chain scopes.
 * 
 * Usually you want to use an instance of this helper class inside another class,
 * to decorate each and every instance of the later class.
 * 
 * @example
 * 	function Soldier() {
 * 
 * 		var stagesBuilder = new WulechuanApplyOneStageOneMethodProgrammingPatternFor(this);
 * 
 * 		stagesBuilder.addStage(methodAsStage1, true, {
 * 			'zh-CN': [ '第一步', '预备', '准备' ],
 * 			'en-US': [ 'prepare', 'getReady', 'methodAsStage1', 'firstOfAll' ]
 * 		});
 * 
 * 		stagesBuilder.addStage(shoot, true, {
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
 * 
 * @param {!object} stagesOperator - The object to apply staged-methods pattern to.
 */
function WulechuanApplyOneStageOneMethodProgrammingPatternTo(stagesOperator) {
	var methodName_addStage = 'addStage';
	var methodName_setPreferredNaturalLanguageTo = 'setPreferredNaturalLanguageTo';
	var methodName_startFromFirstStage = 'startFromFirstStage';

	var thisManagerOfStages = this;

	var allStages = [];
	var currentStageIndex = NaN;
	var knownLanguagesSoFar = [];
	var knownLanguagesIndicesSoFar = {}; // Simply for easy avoiding duplications
	var usingLanguage;

	thisManagerOfStages[methodName_addStage] = addFirstStage;
	thisManagerOfStages[methodName_setPreferredNaturalLanguageTo] = setPreferredNaturalLanguageTo;





	function _isAUsableArray(subject) {
		return Array.isArray(subject) && subject.length > 1;
	}


	/**
	 * 
	 * @param {!object} stageAction - A function that will be added to the operator as its method at correct stage.
	 * @param {?boolean} isAnOptionalStage - True means the stage being added is an optional stage, so that the method
	 * 	after this optional stage should also be exposed at the previous stage of this optional stage.
	 * @param {!object} actionAliases - An object that takes several arrays, each contains aliases in a specific language.
	 * -	@param {!array} actionAliases[languageCode1] - An array that contains aliases of the method that presenting a stage, in a specific language.
	 * -	@param {?array} actionAliases[languageCode2] - An array that contains aliases of the method that presenting a stage, in a specific language.
	 * -	@param {?array} actionAliases['zh-CN'] - An array that contains aliases of the method that presenting a stage, in Chinese.
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


		if (arguments.length === 2) {
			actionAliases = allowsToSkipThisStage;
			allowsToSkipThisStage = false;
		}


		// This line below might throw an error if the provided actionAliases is not valid.
		_examineProvidedActionAliases(actionAliases);


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

	function addFirstStage(stageAction, alwaysFalse, actionAliases) {
		// The first stage is ALWAYS required,
		// it doesn't make any sense if it is allowed to skip.
		addStage(stageAction, false, actionAliases);
		thisManagerOfStages[methodName_addStage] = addStage;
		thisManagerOfStages[methodName_setPreferredNaturalLanguageTo] = setPreferredNaturalLanguageTo;
		_tryToExposeFirstStageSoThatTheOperatorIsUsable();
	}

	function _examineProvidedActionAliases(actionAliasesInAllLanguages) {
		var errorMessage1 = 'At least one alias is required for a stage action to publish as a method.';

		if (!actionAliasesInAllLanguages || typeof actionAliasesInAllLanguages !== 'object') {
			throw TypeError(errorMessage1);
		}

		var atLeastOneValidAliasIsProvided = false;
		for (var language in actionAliasesInAllLanguages) {
			var actionAliasesInASpecificLanguage = actionAliasesInAllLanguages[language];

			if (actionAliasesInASpecificLanguage && typeof actionAliasesInASpecificLanguage === 'string') {
				actionAliasesInAllLanguages[language] = [actionAliasesInASpecificLanguage];
				actionAliasesInASpecificLanguage = actionAliasesInAllLanguages[language];
			}

			if (!_isAUsableArray(actionAliasesInASpecificLanguage)) continue;

			atLeastOneValidAliasIsProvided = true;

			var isAnUnknownLanguage = !knownLanguagesIndicesSoFar[language];
			if (isAnUnknownLanguage) {
				knownLanguagesSoFar.push(language);
				knownLanguagesIndicesSoFar[language] = true;
			}
		}

		if (!atLeastOneValidAliasIsProvided) {
			throw TypeError(errorMessage1);
		}
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
		for (si = startingStageIndex; si < allStages.length-1; si++) {
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