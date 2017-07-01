/* global
	WulechuanApplyOneStageOneMethodProgrammingPatternTo
*/

var nameOfEntranceMethod_zhCN = '传授';
var nameOfEntranceMethod_enUS = 'impart';

window.wulechuanImpartationFunctionsHost = createWulechuanImpartationFunctionsInMultipleLanguages();




/**
 * @author 吴乐川 <wulechuan@live.com>
 * @requires @wulechuan/apply-one-stage-one-method-pattern
 * -	<https://github.com/wulechuan/javascript-wulechuan-apply-one-stage-one-method-pattern>
 * 
 * @description
 * # 简介
 * 
 * 此为一所谓“工厂函数”，用于构建一个对象。该对象包含若干属性，每一属性均为一函数。
 * 这些函数之功能在逻辑上严格等同，但却操持不同人类语言，以便熟悉这些语言之一者采用。
 * 
 * # Introduction
 * 
 * This is the factory function to build up the impartation tool,
 * a.k.a. the object to expose and use, which is discribed below.
 * 
 * @returns {object} - The object that hosts basically the same methods but
 *                     in different language versions. {@link ~wulechuanImpartationFunctionsHost}
 * 
 * 
 * ## 范例（ 简体中文）
 * 首先，创建一个类（即一个函数）。稍后将由该类创建一个实例对象，
 * 并把实例对象的属性“传授予”某个称之为“受体”度对象。
 * 
 * @example
 * 	function 二维矢量() {
 * 		// 此处为具体内容
 * 	}
 * 
 * 接着，不妨定义一些所谓“变体”，以便日后遵照一些个性化要
 * 求“传授”该类之实例对象的属性及方法。
 * 为什么要定义这些“变体”呢？有何益处？且听分解。
 * 
 * 在上例中，二维矢量之实例可以表达多种意图，或者说可以有多种变体。
 * 诸如“二维位置”、“二维力矢量”及“二维速度矢量”等。
 * 
 * 变形程序来反映现实世界之现象或关系时，有人喜欢抽象——尽可能高
 * 度的抽象，并为其所达高度而自豪。
 * 针对本例，此类人可能完全满足于将“模”一词通用于“二维位置”、
 * “二维力”以及“二维速度”，以表达这些矢量之“大小”。
 * 具体为：“二维力.模”、“二维速度.模”，
 * 乃至“二维位置”也同样有“模”，虽然用处不大。
 * 
 * 另有一些人，包括笔者，则热衷于尽可能模仿真实事物的特性，
 * 乃至命名习惯，以求更容易将其所写程序对应于所欲描述之真实。
 * 于本例而言，这类人或许更愿意在其代码中如此表达：
 * -	于“二维力”，将“模”更名为“强度”，即有“二维力.强度”；
 * -	于“二维速度”，将“模”更名为“速率”，即有“二维速度.速率”；
 * -	于“二维位置”，隐去“模”属性，不允许外界访问；
 * 
 * 由此可见，统一的幕后概念，在不同场合应有不同表达。这些
 * 不同表达即为所谓“变体”。
 * 
 * 另外，有时，为使用之方便，亦须将“获受”的属性或方法
 * 直接挂载于受体对象下。形如：
 * 	既有“二维粒子.受力.强度”，同时亦有“二维粒子.受力强度”；
 * 	既有“二维粒子.速度.速率”，同时亦有“二维粒子.速率”；
 * 如此种种，以为方便。
 * 
 * 此种情形之下，仍坚持令所有“获受”之实例在“受体”上各自保留
 * 原版属性名称，显然行不通。
 * 程序员当然可以手工解决此问题。
 * 只是，此事虽然容易，却颇为令人厌烦。
 * 为行方便，应有更佳方案自动实现之。
 * 
 * @example
 * 	二维矢量.wulechuanImpartationProfiles = {
 * 		'二维位置': { __chiefName__: '位置', ... },
 * 		'二维力':   { __chiefName__: '受力', ... },
 * 		'二维速度': { __chiefName__: '速度', ... }
 * 	}
 *
 * 	function 二维点() {
 * 		传授(true).实例对象源于此类(二维矢量).视作('二维位置').予(this);
 * 		// “传授(true)”中的“true”代表即便有错误也不抛出，而仅仅在控制台打印错误记录。
 * 	}
 *
 * 	function 二维粒子() {
 * 		传授().实例对象源于此类(二维矢量)
 * 			.视作('二维位置')
 * 			.且定名为('方位')    // 此例中故意将默认配置中的主名称“位置”改称“方位”。
 * 			.予(this); 
 *
 * 		传授().实例对象源于此类(二维矢量)
 * 			.视作('二维速度')
 * 			.并更名以下属性({
 * 				速率2: '速率之平方'     // 此处有意改称之，以为示例。
 * 			})
 * 			.且设以下直接可用之属性({
 * 				速率: '',             // 此处采用默认名称即可，因而取值留空。
 * 				速率2: '速率之平方'	// 此处采有意改称之，以为示例。
 * 				方向: '移动方向'       // 此处有意将速度之“方向”改称“移动方向”。
 * 			}).予(this);
 *
 * 		传授().实例对象源于此类(二维矢量)
 * 			.视作('二维位置')
 * 			.构建时依据({
 * 				x: 3,
 * 				y: -19
 * 			})
 * 			.并更名以下属性({
 * 				__chiefName__: '中心点',
 * 				x: '水平位置',
 * 				y: '垂直位置'
 * 			})
 * 			.予(this);
 *
 * 		传授().实例对象源于此类(二维矢量)
 * 			.视作('二维力')
 * 			.且设以下直接可用之属性({
 * 				强度: '受力强度',
 * 				方向: '受力方向'
 * 			})
 * 			.予(this);
 * 	}
 * 
 * 
 * 尽管上例均以另一“类”作为“受体”，准确的说是以该类之任何实例分别作为受体，
 * 采用所谓“普通对象”，如“明文对象（一译‘字面量对象’）”，作为“受体”对象亦是可行的。
 * @example
 * 	二维粒子.wulechuanImpartationProfiles = {
 * 		default: { __chiefName__: '二维粒子', ... }
 * 	};
 *
 * 	var 一个字面量对象用作受体 = { 姓名: '吴乐川', 电子邮件地址: 'wulechuan@live.com' };
 * 	传授().对象(My2DParticle).予(一个字面量对象用作受体);
 * 
 * 
 * 进而不难想见，所谓“普通对象”，亦可被用作传授源体，其属性和方法可传授予“受体”对象。
 * @example
 * 	二维粒子.wulechuanImpartationProfiles = {
 * 		default: { __chiefName__: '二维粒子', ... }
 * 	};
 *
 * 	var 一个字面量对象用作受体 = { 姓名: '吴乐川', 电子邮件地址: 'wulechuan@live.com' };
 * 	传授().对象(My2DParticle).予(一个字面量对象用作受体);
 * 
 * 
 * 
 * 
 * ## An example in English:
 * First, let's write a function as a class.
 * Later, we will impart properties of an instance of this class to some grantee.
 * 
 * @example
 * 	function My2DVector() {
 * 		// The definitions go here.
 * 	}
 *
 * Now, add pre-defined profiles for easier impartations.
 * 
 * As one might imagine, a 2d vector can be used in different ways,
 * such as a 2d position, a 2d force, or a 2d velocity.
 * 
 * Some people love to use abstract across different things.
 * Thus, as an example, they are often happy to use
 * the single term "legnth" across all possible applications,
 * or we can say profiles, or variants. That is, they live with
 * "force2D.length", "position2D.length" as well as "velocity2D.length".
 * 
 * While there are another type of people, they love to describ things
 * in there programs in a way that matches real world as much as possible.
 * These type of people turn to choose different terms for different things,
 * even though the core concept behind these things are exactly the same.
 * Still take the 2d vector as an example, they might be happier with:
 * -	for a 2d force, expose "force.strength" instead of "force2D.length";
 * -	for a 2d velocity, expose "velocity.speed" instead of "velocity2D.speed";
 * -	for a 2d position, does not expose the "length" at all.
 * 
 * All these means that despite the shared concept behinds, we need different
 * ways to express things in different siuations. And these ways,
 * I call them "profiles" of a concept.
 * A profile describs how a core/raw class should be imparted to a grantee.
 * Take the example above, the "position2d", "force2d", as well as the "velocity2d"
 * are all impartation profiles of the My2DVector class.
 * 
 * Note:
 * 	Being a non-native English speaker, I might NOT pick the
 * 	accurate word by using the term "profile".
 * 	And I'm glad to recieve suggestions upon this.
 * 
 * What's more, there are cases in which we want to impart some properties or methods
 * directly into a grantee object. Which means, we want not only:
 * @example
 * 	particle2d.force.strength
 * 	particle2d.velocity.speed
 * 
 * but also:
 * @example
 * 	particle2d.forceStrength // an imparted property directly under the grantee itself
 * 	particle2d.speed // another imparted property directly under the grantee itself
 * 
 * In this situation, keeping the same term for properties of each and every imparted properties
 * is impossible.
 * As programmers, we can solve these problems by hands. But that's not a perfect way.
 * So we need a solution, hopefully a slightly better one.
 * 
 * 
 * 
 * @example
 * 	My2DVector.wulechuanImpartationProfiles = {
 * 		position2D: { __chiefName__: 'position', ... },
 * 		force2D:    { __chiefName__: 'force', ... },
 * 		velocity2D: { __chiefName__: 'velocity', ... }
 * 	}
 *
 * 	function My2DPoint() {
 * 		impart().anInstanceOfClass(My2DVector).as('position2D').to(this);
 * 	}
 *
 * 	function My2DParticle() {
 * 		impart().anInstanceOfClass(My2DVector).as('position2D').renamedAs('pos').to(this);
 *
 * 		impart().anInstanceOfClass(My2DVector).as('velocity2D').renamedAs({
 * 			speed: 'velocityLength',
 * 			speed2: 'squareSpeed'
 * 			velocityDirection: 'movingDirection'
 * 		}).to(this);
 *
 * 		impart().anInstanceOfClass(My2DVector)
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
 * 		impart().anInstanceOfClass(My2DVector)
 * 			.usingThisProfile('force2D')
 * 			.withCustomizedPropertyNames({
 * 				strength: 's',
 * 				forceDirection: 'forceAngle'
 * 			})
 * 			.to(this);
 * 	}
 * 
 * 
 * Although we were using other classes like "My2DParticle"
 * as the grantees, it shouldn't be suprising that we
 * can impart things into an object literal as well.
 * Thus the object literal gains new properties and methods.
 * @example
 * 	My2DParticle.wulechuanImpartationProfiles = {
 * 		default: { __chiefName__: 'particle2D', ... }
 * 	};
 *
 * 	var myLovelyObjectLiteral = { name: '吴乐川', email: 'wulechuan@live.com' };
 * 	impart().anInstanceOfClass(My2DParticle).to(myLovelyObjectLiteral);
 * 
 * 
 * One can imagine that an object literal can also treated
 * as an impartation source object, just like those who
 * are instantiated from a given class.
 * Still, the grantee can be any other object,
 * be it an instance, or another object literal.
 * @example
 * 	var myObjectAsImpartationSource = {
 * 		property1: 'I love SOFTIMAGE XSI',
 * 		isAbleToFly: true
 * 	};
 *
 * 	var myObjectLiteralAsGrantee = { name: '吴乐川', email: 'wulechuan@live.com' };
 * 	impart
 * 		.theObject(myObjectAsImpartationSource)
 * 		.to(myObjectLiteralAsGrantee);
 */
function createWulechuanImpartationFunctionsInMultipleLanguages() {
	var languageCode_zhCN = 'zh-CN';
	var languageCode_enUS = 'en-US';



	// This method name below, which is the first method to invoke,
	// will NOT be public.
	// Because we are wrapping it with an outer function,
	// so that we can easily decide the using langugae.
	// Thus, only one alias is enough for it to use inside this scope.
	var methodName_startToImpart = ['startToImpart'];



	var methodNames_anInstanceOfClass_zhCN = [
		'实例对象源于此类'
	];
	var methodNames_anInstanceOfClass_enUS = [
		'anInstanceOfClass'
	];



	var methodNames_theObject_zhCN = [
		'对象'
	];
	var methodNames_theObject_enUS = [
		'theObject'
	];



	var methodNames_usingThisProfile_zhCN = [
		'视作'
	];
	var methodNames_usingThisProfile_enUS = [
		'as',
		'usingThisProfile'
	];



	var methodNames_buildAccordingTo_zhCN = [
		'构建时依据'
	];
	var methodNames_buildAccordingTo_enUS = [
		'buildAccordingTo'
	];



	var methodNames_withCustomizedPropertyNames_zhCN = [
		'且定名为',     // 用于仅更改主名称（__chiefName__）时较为符合汉语习惯。
		'并更名以下属性' // 用于更改多种属性名称时，较为符合汉语习惯。
	];
	var methodNames_withCustomizedPropertyNames_enUS = [
		'renamedAs',
		'withCustomizedPropertyNames'
	];



	var methodNames_addDirectAccessingProperties_zhCN = [
		'且设以下直接可用之属性',
	];
	var methodNames_addDirectAccessingProperties_enUS = [
		'addDirectAccessingProperties'
	];



	var methodNames_towards_zhCN = ['予'];
	var methodNames_towards_enUS = ['to'];



	var propertyName_wulechuanImpartationProfiles = 'wulechuanImpartationProfiles';
	var propertyName_defaultProfile = 'default';
	var propertyName_instanceChiefName = '__chiefName__';




	/**
	 * @namespace <wulechuanImpartationFunctionsHost>
	 * @property {function} 传授 - 此为impart函数的包裹函数，其将impart函数的优选语言定位“简体中文”。
	 * @property {function} impart - the wrapped impart function, taking the 'en-US' as the preferred language
	 */
	var wulechuanImpartationFunctionsHost = {};

	wulechuanImpartationFunctionsHost[nameOfEntranceMethod_zhCN] =
		function() {
			return impart(languageCode_zhCN);
		};

	wulechuanImpartationFunctionsHost[nameOfEntranceMethod_enUS] =
		function() {
			return impart(languageCode_enUS);
		};

	return wulechuanImpartationFunctionsHost;







	/**
	 * The function, the wrapped versions of which are exposed.
	 * Wrapping is essentially for providing this function
	 * in multiple human languages.
	 *
	 * Each wrapped version creates an instance of
	 * the class "_WulechuanImpartationOperator",
	 * and then calls the "startToImpart" method of the instance
	 * to complete desired impartation process.
	 */
	function impart(usingLanguage) {
		var operator = new _WulechuanImpartationOperator(usingLanguage);
		return operator.startToImpart();
	}





	/**
	 * @author 吴乐川 <wulechuan@live.com>
	 * 
	 * A class, instance of which is the operator
	 * that remembers several key factors and does the impartation job
	 * for a given class(a.k.a. a function) or an object.
	 *
	 * Each time the entrance method is invoked,
	 * a new instance object of this operator class is created,
	 * which then takes over the impartation process afterwards.
	 * 
	 * If the operator is used through its class impartation route,
	 * an instance object of the provided class is created
	 * via the javascript "new" operator, and this instance is
	 * the object to impart properties from;
	 * 
	 * if otherwise the object route is taken,
	 * the provided input object itself it the one to impart properties from.
	 *
	 * @class
	 * 
	 * @param {!string} usingLanguage
	 */
	function _WulechuanImpartationOperator(usingLanguage) {
		var thisOperator = this;

		var errorAlreadyOcurred = false;
		var currentErrorMessage;
		var shouldThrowErrors;

		var theConstructor;
		var theConstructionOptions;
		var allImpartationProfiles;

		var theSourceObject;
		var usedProfile;
		var usedPropertyNamesCustomization = {};


		var stagesOfClassRoute = new WulechuanApplyOneStageOneMethodProgrammingPatternTo(thisOperator);

		stagesOfClassRoute.addStage(startToImpart, {
			'zh-CN': methodName_startToImpart,
			'en-US': methodName_startToImpart
		});

		stagesOfClassRoute.addStage(anInstanceOfClass, {
			'zh-CN': methodNames_anInstanceOfClass_zhCN,
			'en-US': methodNames_anInstanceOfClass_enUS
		});

		stagesOfClassRoute.addStage(usingThisProfile, true, {
			'zh-CN': methodNames_usingThisProfile_zhCN,
			'en-US': methodNames_usingThisProfile_enUS
		});

		stagesOfClassRoute.addStage(buildAccordingTo, true, {
			'zh-CN': methodNames_buildAccordingTo_zhCN,
			'en-US': methodNames_buildAccordingTo_enUS
		});

		stagesOfClassRoute.addStage(withCustomizedPropertyNames, true, {
			'zh-CN': methodNames_withCustomizedPropertyNames_zhCN,
			'en-US': methodNames_withCustomizedPropertyNames_enUS
		});

		stagesOfClassRoute.addStage(addDirectAccessingProperties, true, {
			'zh-CN': methodNames_addDirectAccessingProperties_zhCN,
			'en-US': methodNames_addDirectAccessingProperties_enUS
		});

		stagesOfClassRoute.addStage(towards, {
			'zh-CN': methodNames_towards_zhCN,
			'en-US': methodNames_towards_enUS
		});

		stagesOfClassRoute.setPreferredNaturalLanguageTo(usingLanguage);




		var stagesOfObjectRoute = new WulechuanApplyOneStageOneMethodProgrammingPatternTo(thisOperator);

		stagesOfObjectRoute.addStage(startToImpart, {
			'zh-CN': methodName_startToImpart,
			'en-US': methodName_startToImpart
		});

		stagesOfObjectRoute.addStage(theObject, {
			'zh-CN': methodNames_theObject_zhCN,
			'en-US': methodNames_theObject_enUS
		});

		stagesOfObjectRoute.addStage(withCustomizedPropertyNames, true, {
			'zh-CN': methodNames_withCustomizedPropertyNames_zhCN,
			'en-US': methodNames_withCustomizedPropertyNames_enUS
		});

		stagesOfObjectRoute.addStage(addDirectAccessingProperties, true, {
			'zh-CN': methodNames_addDirectAccessingProperties_zhCN,
			'en-US': methodNames_addDirectAccessingProperties_enUS
		});

		stagesOfObjectRoute.addStage(towards, {
			'zh-CN': methodNames_towards_zhCN,
			'en-US': methodNames_towards_enUS
		});

		stagesOfObjectRoute.setPreferredNaturalLanguageTo(usingLanguage);








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
		 * This stage simply provides two possible routes:
		 * the object route and the class route.
		 */
		function startToImpart(shouldNotThrowErrors) {
			shouldThrowErrors = !shouldNotThrowErrors;
		}


		/**
		 * To accept the function treated as a class, instances of which will be imparted.
		 *
		 * @param {!function} theGivenFunction
		 */
		function anInstanceOfClass(theGivenFunction) {
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


			var _allImpartationProfiles = theConstructor[propertyName_wulechuanImpartationProfiles];
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
		 * To accept the function treated as a class, instances of which will be imparted.
		 *
		 * @param {!object} theSourceObject
		 */
		function theObject(sourceObject) {
			if (_the(sourceObject).isNeitherAnObjectNorAnArray()) {
				switch (usingLanguage) {
					case languageCode_zhCN:
						currentErrorMessage =
							'首个参数必须为一个非空对象，可以为数组对象。'+
							'\n而实际提供的首个参数是一个'+typeof sourceObject + '。'
							;
						break;

					case languageCode_enUS:
						currentErrorMessage =
							'The provided source must be an object that is not a null. '+
							'An array object is allowed. '+
							'\nWhat\'s actually provided was of type: '+
							typeof theGivenFunction + '.'
							;
						break;
				}

				_dealWithCurrentError();
			} else {
				theSourceObject = sourceObject;
			}


			allImpartationProfiles = {};
			// allImpartationProfiles[propertyName_defaultProfile] = null;
		}

		/**
		 * To accept the name of the desired variant to use.
		 *
		 * @param {!string} variantName
		 */
		function usingThisProfile(profileName) {
			if (errorAlreadyOcurred) return;

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
			if (errorAlreadyOcurred) return;

			theConstructionOptions = constructionOptions;
		}

		function withCustomizedPropertyNames(propertyNamesCustomization) {
			if (errorAlreadyOcurred) return;

			if (_the(propertyNamesCustomization).isNotAValidObject()) {
				errorAlreadyOcurred = true;
			} else {
				usedPropertyNamesCustomization = propertyNamesCustomization;
			}
		}

		function addDirectAccessingProperties(directAccessingPropertyDefinitions) {
			if (errorAlreadyOcurred) return;
			
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

				var customizedImpartationMethod = usedProfile[attributeName];

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