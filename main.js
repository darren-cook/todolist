(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){return t(1,arguments),e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(t(1,arguments),!e(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function i(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var o,s={date:i({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:i({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:i({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},u={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function c(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var s=t.defaultWidth,u=a.width?String(a.width):t.defaultWidth;r=t.values[u]||t.values[s]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function d(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=e.match(a);if(!i)return null;var o,s=i[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(u)?m(u,(function(t){return t.test(s)})):l(u,(function(t){return t.test(s)}));o=t.valueCallback?t.valueCallback(c):c,o=n.valueCallback?n.valueCallback(o):o;var d=e.slice(s.length);return{value:o,rest:d}}}function l(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function m(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const f={code:"en-US",formatDistance:function(t,e,n){var r,i=a[t];return r="string"==typeof i?i:1===e?i.one:i.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:s,formatRelative:function(t,e,n,r){return u[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:c({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:c({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:c({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:c({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:c({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(o.matchPattern);if(!n)return null;var r=n[0],a=t.match(o.parsePattern);if(!a)return null;var i=o.valueCallback?o.valueCallback(a[0]):a[0];i=e.valueCallback?e.valueCallback(i):i;var s=t.slice(r.length);return{value:i,rest:s}}),era:d({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:d({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:d({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:d({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:d({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function h(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function g(e,r){t(2,arguments);var a=n(e).getTime(),i=h(r);return new Date(a+i)}function p(e,n){t(2,arguments);var r=h(n);return g(e,-r)}var b=864e5;function v(e){t(1,arguments);var r=1,a=n(e),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function y(e){t(1,arguments);var r=n(e),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=v(i),s=new Date(0);s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0);var u=v(s);return r.getTime()>=o.getTime()?a+1:r.getTime()>=u.getTime()?a:a-1}function w(e){t(1,arguments);var n=y(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=v(r);return a}var C=6048e5;function k(e,r){t(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,s=null==o?0:h(o),u=null==a.weekStartsOn?s:h(a.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=n(e),d=c.getUTCDay(),l=(d<u?7:0)+d-u;return c.setUTCDate(c.getUTCDate()-l),c.setUTCHours(0,0,0,0),c}function T(e,r){t(1,arguments);var a=n(e),i=a.getUTCFullYear(),o=r||{},s=o.locale,u=s&&s.options&&s.options.firstWeekContainsDate,c=null==u?1:h(u),d=null==o.firstWeekContainsDate?c:h(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,d),l.setUTCHours(0,0,0,0);var m=k(l,r),f=new Date(0);f.setUTCFullYear(i,0,d),f.setUTCHours(0,0,0,0);var g=k(f,r);return a.getTime()>=m.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function E(e,n){t(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:h(i),s=null==r.firstWeekContainsDate?o:h(r.firstWeekContainsDate),u=T(e,n),c=new Date(0);c.setUTCFullYear(u,0,s),c.setUTCHours(0,0,0,0);var d=k(c,n);return d}var S=6048e5;function D(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const x=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return D("yy"===e?r%100:r,e.length)},A=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):D(n+1,2)},L=function(t,e){return D(t.getUTCDate(),e.length)},M=function(t,e){return D(t.getUTCHours()%12||12,e.length)},N=function(t,e){return D(t.getUTCHours(),e.length)},q=function(t,e){return D(t.getUTCMinutes(),e.length)},U=function(t,e){return D(t.getUTCSeconds(),e.length)},P=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return D(Math.floor(r*Math.pow(10,n-3)),e.length)};function W(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+D(i,2)}function Y(t,e){return t%60==0?(t>0?"-":"+")+D(Math.abs(t)/60,2):O(t,e)}function O(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+D(Math.floor(a/60),2)+n+D(a%60,2)}const j={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return x(t,e)},Y:function(t,e,n,r){var a=T(t,r),i=a>0?a:1-a;return"YY"===e?D(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):D(i,e.length)},R:function(t,e){return D(y(t),e.length)},u:function(t,e){return D(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return D(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return D(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return A(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return D(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,r,a,i){var o=function(e,r){t(1,arguments);var a=n(e),i=k(a,r).getTime()-E(a,r).getTime();return Math.round(i/S)+1}(e,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):D(o,r.length)},I:function(e,r,a){var i=function(e){t(1,arguments);var r=n(e),a=v(r).getTime()-w(r).getTime();return Math.round(a/C)+1}(e);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):D(i,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):L(t,e)},D:function(e,r,a){var i=function(e){t(1,arguments);var r=n(e),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/b)+1}(e);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):D(i,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return D(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return D(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return D(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return M(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):N(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):D(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):D(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):q(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):U(t,e)},S:function(t,e){return P(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return Y(a);case"XXXX":case"XX":return O(a);default:return O(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return Y(a);case"xxxx":case"xx":return O(a);default:return O(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+W(a,":");default:return"GMT"+O(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+W(a,":");default:return"GMT"+O(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return D(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return D((r._originalDate||t).getTime(),e.length)}};function I(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}}function F(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}}var H={p:F,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],i=r[2];if(!i)return I(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",I(a,e)).replace("{{time}}",F(i,e))}};const z=H;function B(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var $=["D","DD"],J=["YY","YYYY"];function Q(t){return-1!==$.indexOf(t)}function G(t){return-1!==J.indexOf(t)}function R(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var X=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Z=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,_=/''/g,K=/[a-zA-Z]/;function tt(e,a,i){t(2,arguments);var o=String(a),s=i||{},u=s.locale||f,c=u.options&&u.options.firstWeekContainsDate,d=null==c?1:h(c),l=null==s.firstWeekContainsDate?d:h(s.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=u.options&&u.options.weekStartsOn,g=null==m?0:h(m),b=null==s.weekStartsOn?g:h(s.weekStartsOn);if(!(b>=0&&b<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var v=n(e);if(!r(v))throw new RangeError("Invalid time value");var y=B(v),w=p(v,y),C={firstWeekContainsDate:l,weekStartsOn:b,locale:u,_originalDate:v},k=o.match(Z).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,z[e])(t,u.formatLong,C):t})).join("").match(X).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return et(t);var r=j[n];if(r)return!s.useAdditionalWeekYearTokens&&G(t)&&R(t,a,e),!s.useAdditionalDayOfYearTokens&&Q(t)&&R(t,a,e),r(w,t,u.localize,C);if(n.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return k}function et(t){return t.match(V)[1].replace(_,"'")}function nt(){document.querySelectorAll(".disableable").forEach((t=>{t.classList.add("disabled")})),document.querySelectorAll(".createbutton").forEach((t=>{t.classList.add("hidden")}))}function rt(){document.querySelectorAll(".disableable").forEach((t=>t.classList.remove("disabled"))),document.querySelectorAll(".createbutton").forEach((t=>{t.classList.remove("hidden")}))}function at(){const t=document.querySelector("#body"),e=document.querySelector("#sidebar");t.style.filter="none",e.style.filter="none",document.querySelector("#verifydeletecontainer").remove()}Math.pow(10,8);var it=36e5,ot={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},st=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ut=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,ct=/^([+-])(\d{2})(?::?(\d{2}))?$/;function dt(t){var e,n={},r=t.split(ot.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?e=r[0]:(n.date=r[0],e=r[1],ot.timeZoneDelimiter.test(n.date)&&(n.date=t.split(ot.timeZoneDelimiter)[0],e=t.substr(n.date.length,t.length))),e){var a=ot.timezone.exec(e);a?(n.time=e.replace(a[1],""),n.timezone=a[1]):n.time=e}return n}function lt(t,e){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(n);if(!r)return{year:NaN,restDateString:""};var a=r[1]?parseInt(r[1]):null,i=r[2]?parseInt(r[2]):null;return{year:null===i?a:100*i,restDateString:t.slice((r[1]||r[2]).length)}}function mt(t,e){if(null===e)return new Date(NaN);var n=t.match(st);if(!n)return new Date(NaN);var r=!!n[4],a=ft(n[1]),i=ft(n[2])-1,o=ft(n[3]),s=ft(n[4]),u=ft(n[5])-1;if(r)return function(t,e,n){return e>=1&&e<=53&&n>=0&&n<=6}(0,s,u)?function(t,e,n){var r=new Date(0);r.setUTCFullYear(t,0,4);var a=7*(e-1)+n+1-(r.getUTCDay()||7);return r.setUTCDate(r.getUTCDate()+a),r}(e,s,u):new Date(NaN);var c=new Date(0);return function(t,e,n){return e>=0&&e<=11&&n>=1&&n<=(bt[e]||(vt(t)?29:28))}(e,i,o)&&function(t,e){return e>=1&&e<=(vt(t)?366:365)}(e,a)?(c.setUTCFullYear(e,i,Math.max(a,o)),c):new Date(NaN)}function ft(t){return t?parseInt(t):1}function ht(t){var e=t.match(ut);if(!e)return NaN;var n=gt(e[1]),r=gt(e[2]),a=gt(e[3]);return function(t,e,n){return 24===t?0===e&&0===n:n>=0&&n<60&&e>=0&&e<60&&t>=0&&t<25}(n,r,a)?n*it+6e4*r+1e3*a:NaN}function gt(t){return t&&parseFloat(t.replace(",","."))||0}function pt(t){if("Z"===t)return 0;var e=t.match(ct);if(!e)return 0;var n="+"===e[1]?-1:1,r=parseInt(e[2]),a=e[3]&&parseInt(e[3])||0;return function(t,e){return e>=0&&e<=59}(0,a)?n*(r*it+6e4*a):NaN}var bt=[31,null,31,30,31,30,31,31,30,31,30,31];function vt(t){return t%400==0||t%4==0&&t%100!=0}function yt(t){nt();const e=document.querySelector(".tasklist"),n=function(t,e="New Task Name"){document.querySelector(".tasklist");const n=document.createElement("form");n.setAttribute("id","taskform"),n.setAttribute("onSubmit","return false");const r=document.createElement("select");r.setAttribute("name","taskformpriority"),r.setAttribute("id","taskformpriority");const a=document.createElement("option");a.setAttribute("value",""),a.textContent="";const i=document.createElement("option");i.setAttribute("value","Low"),i.textContent="Low";const o=document.createElement("option");o.setAttribute("value","Medium"),o.textContent="Medium";const s=document.createElement("option");s.setAttribute("value","High"),s.textContent="High",r.appendChild(a),r.appendChild(i),r.appendChild(o),r.appendChild(s),n.appendChild(r);const u=document.createElement("input");u.setAttribute("type","text"),u.setAttribute("name","taskformtitle"),u.setAttribute("id","taskformtitle"),u.setAttribute("maxlength","15"),u.required=!0,"New Task Name"==e?u.setAttribute("placeholder","New Task Name"):u.value=e,n.appendChild(u);const c=document.createElement("select");c.setAttribute("name","taskformtasklist"),c.setAttribute("id","taskformtasklist");const d=function(){const t=JSON.parse(sessionStorage.getItem("userData")),e=[];for(let n=2;n<t.length;n++)e.push(t[n].menuTitle);return e}();for(let e=0;e<d.length;e++){const n=document.createElement("option");n.setAttribute("value",d[e]),n.textContent=d[e],d[e]==t&&(n.selected=!0),c.appendChild(n)}n.appendChild(c);const l=document.createElement("input");l.setAttribute("type","date"),l.setAttribute("name","taskformduedate"),l.setAttribute("id","taskformduedate"),n.appendChild(l);const m=document.createElement("div");m.setAttribute("id","taskFormActionsIcons"),m.classList.add("taskdetail","justifycenter","actionsicons");const f=document.createElement("img");f.setAttribute("id","taskformsubmit"),f.setAttribute("src","./images/check.png"),f.setAttribute("alt","Complete Icon");const h=document.createElement("img");return h.setAttribute("id","taskformdelete"),h.setAttribute("src","./images/delete.png"),h.setAttribute("alt","Delete Icon"),m.appendChild(f),m.appendChild(h),n.appendChild(m),n}(t);e.appendChild(n),document.getElementById("taskformtitle").focus();const r=document.querySelector("#taskformdelete"),a=document.querySelector("#taskformsubmit");r.addEventListener("click",(function(){Ct()})),a.addEventListener("click",(function(){!function(){const t=document.querySelector("#taskformtitle");if(!0===t.checkValidity()){const e=function(t){const e=t.title,n=t.priority,r=t.tasklist,a=t.duedate,i=t.classes,o=document.createElement("div");o.setAttribute("id",`task-${e}`),i.forEach((t=>{o.classList.add(t)}));const s=document.createElement("div");s.classList.add("taskdetail","justifycenter"),s.textContent=n,o.appendChild(s);const u=document.createElement("div");u.classList.add("taskdetail","justifystart"),u.textContent=e,o.appendChild(u);const c=document.createElement("div");c.classList.add("taskdetail","justifystart"),c.textContent=r,o.appendChild(c);const d=document.createElement("div");d.classList.add("taskdetail","justifycenter"),d.textContent=a,o.appendChild(d);const l=document.createElement("div");l.classList.add("taskdetail","justifycenter","actionsicons");const m=document.createElement("img");m.classList.add("disableable"),m.setAttribute("src","./images/pencil.png"),m.setAttribute("alt","Edit Icon"),m.addEventListener("click",(function(){console.log("edit")})),l.appendChild(m);const f=document.createElement("img");f.classList.add("disableable"),f.setAttribute("src","./images/check.png"),f.setAttribute("alt","Complete Icon"),f.addEventListener("click",(function(){console.log("comp")})),l.appendChild(f);const h=document.createElement("img");return h.classList.add("disableable"),h.setAttribute("src","./images/delete.png"),h.setAttribute("alt","Delete Icon"),h.addEventListener("click",(function(){console.log("del")})),l.appendChild(h),o.appendChild(l),o}(wt(t.value)),n=document.querySelector(".tasklist"),r=document.querySelector("#taskform");n.insertBefore(e,r),Ct()}else t.focus()}()}))}const wt=()=>{const e=document.getElementById("taskformpriority").value,n=document.getElementById("taskformtitle").value,r=document.getElementById("taskformtasklist").value,a=document.getElementById("taskformduedate").value,i=function(e,n){t(1,arguments);var r=n||{},a=null==r.additionalDigits?2:h(r.additionalDigits);if(2!==a&&1!==a&&0!==a)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var i,o=dt(e);if(o.date){var s=lt(o.date,a);i=mt(s.restDateString,s.year)}if(!i||isNaN(i.getTime()))return new Date(NaN);var u,c=i.getTime(),d=0;if(o.time&&(d=ht(o.time),isNaN(d)))return new Date(NaN);if(!o.timezone){var l=new Date(c+d),m=new Date(0);return m.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),m.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),m}return u=pt(o.timezone),isNaN(u)?new Date(NaN):new Date(c+d+u)}(a,1);return{title:n,classes:["taskitem"],priority:e,tasklist:r,duedate:`${tt(i,"MMM")} ${tt(i,"do")}`,rawduedate:a}};function Ct(){document.querySelector("#taskform").remove(),rt()}function kt(t){"Completed Tasks"==t?function(t){const e=document.querySelector("#body"),n=document.createElement("div");n.setAttribute("id",`body-${t}`),n.classList.add("taskbox"),n.classList.add("activebody");const r=document.createElement("div");r.classList.add("taskheader");const a=document.createElement("div");a.setAttribute("id",`body-${t}-title`),a.classList.add("tasktitle"),a.textContent=t,r.appendChild(a),n.appendChild(r);const i=document.createElement("div");i.classList.add("taskbody");const o=document.createElement("div");o.classList.add("taskcolumns");const s=document.createElement("div");s.textContent="Priority",s.classList.add("taskcolumn","justifycenter"),o.appendChild(s);const u=document.createElement("div");u.textContent="Title",u.classList.add("taskcolumn","justifystart"),o.appendChild(u);const c=document.createElement("div");c.textContent="Task List",c.classList.add("taskcolumn","justifystart"),o.appendChild(c);const d=document.createElement("div");d.textContent="Completed",d.classList.add("taskcolumn","justifycenter"),o.appendChild(d);const l=document.createElement("div");l.textContent="Actions",l.classList.add("taskcolumn","justifycenter"),o.appendChild(l),i.appendChild(o);const m=document.createElement("div");m.classList.add("tasklist"),i.appendChild(m),n.appendChild(i),e.appendChild(n)}(t):function(t){const e=document.querySelector("#body"),n=document.createElement("div");n.setAttribute("id",`body-${t}`),n.classList.add("taskbox"),n.classList.add("activebody");const r=document.createElement("div");r.classList.add("taskheader");const a=document.createElement("div");a.setAttribute("id",`body-${t}-title`),a.classList.add("tasktitle"),a.textContent=t,r.appendChild(a),n.appendChild(r);const i=document.createElement("div");i.classList.add("taskbody");const o=document.createElement("div");o.classList.add("taskcolumns");const s=document.createElement("div");s.textContent="Priority",s.classList.add("taskcolumn","justifycenter"),o.appendChild(s);const u=document.createElement("div");u.textContent="Title",u.classList.add("taskcolumn","justifystart"),o.appendChild(u);const c=document.createElement("div");c.textContent="Task List",c.classList.add("taskcolumn","justifystart"),o.appendChild(c);const d=document.createElement("div");d.textContent="Due Date",d.classList.add("taskcolumn","justifycenter"),o.appendChild(d);const l=document.createElement("div");l.textContent="Actions",l.classList.add("taskcolumn","justifycenter"),o.appendChild(l),i.appendChild(o);const m=document.createElement("div");m.classList.add("tasklist"),i.appendChild(m);const f=document.createElement("img");f.setAttribute("id","createtaskbutton"),f.setAttribute("src","./images/plus-circle.png"),f.setAttribute("alt","Add Task Icon"),f.classList.add("createbutton"),f.addEventListener("click",(function(){yt(t)})),i.appendChild(f),n.appendChild(i),e.appendChild(n)}(t)}function Tt(t){var e;document.querySelector(".activemenu").classList.remove("activemenu"),t.classList.add("activemenu"),e=t.dataset.title,document.querySelector(".activebody").remove(),kt(e)}function Et(t="New Task List"){const e=document.createElement("div");e.setAttribute("id","menuform");const n=document.createElement("form");n.setAttribute("onSubmit","return false");const r=document.createElement("input");r.setAttribute("type","text"),r.setAttribute("id","menuformtitle"),r.setAttribute("name","menuformtitle"),r.required=!0,r.setAttribute("maxlength","15"),"New Task List"==t?r.setAttribute("placeholder","New Task List"):r.value=t,n.appendChild(r),e.appendChild(n);const a=document.createElement("div");a.setAttribute("id","menuformicons");const i=document.createElement("img");i.setAttribute("id","newmenuformsubmit"),i.setAttribute("src","./images/check.png"),i.setAttribute("alt","Complete Icon");const o=document.createElement("img");return o.setAttribute("id","newmenuformdelete"),o.setAttribute("src","./images/delete.png"),o.setAttribute("alt","Delete Icon"),a.appendChild(i),a.appendChild(o),e.appendChild(a),e}const St=t=>({title:t,classes:["menuitem","menuedit","disableable"],pair:`body-${t}`});function Dt(t){const e=t.title,n=t.pair,r=t.classes,a=document.createElement("div");a.setAttribute("id",`menu-${e}`),a.setAttribute("data-pair",n),a.setAttribute("data-title",e),r.forEach((t=>{a.classList.add(t)})),a.addEventListener("click",(function(){event.stopPropagation(),Tt(a)}));const i=document.createElement("div");i.setAttribute("id",`menu-${e}-content`),i.textContent=e;const o=document.createElement("img"),s=document.createElement("img");return o.src="./images/pencil.png",o.alt="Edit Icon",o.classList.add("disableable"),o.addEventListener("click",(function(){event.stopPropagation(),function(t){nt();const e=t.dataset.title,n=Et(e);document.querySelector("#menuitems").insertBefore(n,t);const r=document.querySelector("#menuformtitle");t.classList.add("hidden");const a=document.querySelector("#newmenuformdelete"),i=document.querySelector("#newmenuformsubmit");a.addEventListener("click",(function(){xt(),t.classList.remove("hidden")})),i.addEventListener("click",(function(){var n,a;n=e,a=r.value,!0===document.querySelector("#menuformtitle").checkValidity()?function(t,e){const n=JSON.parse(sessionStorage.getItem("userData")),r=n.find((e=>e.menuTitle==t));r.menuTitle=e,r.menuObject.title=e,r.menuObject.pair=`body-${e}`,sessionStorage.setItem("userData",JSON.stringify(n))}(n,a):menuFormTitle.focus();const i=Dt(St(r.value));document.querySelector("#menuitems").insertBefore(i,t),Tt(i),t.remove(),xt()}))}(o.parentElement)})),s.src="./images/delete.png",s.alt="Delete Icon",s.classList.add("disableable"),s.addEventListener("click",(function(){!function(t){!function(t){const e=document.querySelector("#body"),n=document.querySelector("#sidebar");e.style.filter="blur(3px)",n.style.filter="blur(3px)";const r=document.querySelector("#content"),a=(document.querySelector("#body"),document.createElement("div"));a.setAttribute("id","verifydeletecontainer");const i=document.createElement("div");i.setAttribute("id","verifydelete");const o=document.createElement("div");o.setAttribute("id","verifydeletetop");const s=document.createElement("img");s.setAttribute("id","warningicon"),s.setAttribute("src","./images/alert.png"),s.setAttribute("alt","Warning Icon");const u=document.createElement("h3");u.setAttribute("id","warningitem"),u.textContent=`Delete - ${t.firstChild.textContent}`;const c=document.createElement("p");c.setAttribute("id","warningmessage"),c.textContent="This action cannot be undone.",o.appendChild(s),o.appendChild(u),o.appendChild(c);const d=document.createElement("div");d.setAttribute("id","verifydeletebottom");const l=document.createElement("button");l.setAttribute("id","cancelbutton"),l.classList.add("verifydeletebutton"),l.textContent="CANCEL";const m=document.createElement("button");m.setAttribute("id","deletebutton"),m.classList.add("verifydeletebutton"),m.textContent="DELETE",d.appendChild(l),d.appendChild(m),i.appendChild(o),i.appendChild(d),a.appendChild(i),r.appendChild(a)}(t);const e=document.querySelector("#cancelbutton"),n=document.querySelector("#deletebutton");e.addEventListener("click",(function(){at()})),n.addEventListener("click",(function(){Tt(document.querySelector("#menu-alltasks")),function(t){(function(t){const e=JSON.parse(sessionStorage.getItem("userData")).filter((function(e){return e.menuTitle!==t}));sessionStorage.setItem("userData",JSON.stringify(e))})(t.dataset.title),t.remove()}(t),at()}))}(s.parentElement)})),a.appendChild(i),a.appendChild(o),a.appendChild(s),a}function xt(){document.querySelector("#menuform").remove(),rt()}function At(t){const e={menuTitle:t.title,menuObject:t,taskList:[]},n=JSON.parse(sessionStorage.getItem("userData"));n.push(e),sessionStorage.setItem("userData",JSON.stringify(n))}kt("All Tasks"),function(){const t=document.querySelector("#todaysdate"),e=document.createElement("div");e.setAttribute("id","calendar");const n=document.createElement("div");n.setAttribute("id","dayofweek"),n.innerHTML=tt(new Date,"eeee");const r=document.createElement("div");r.setAttribute("id","dayofmonth"),r.innerHTML=tt(new Date,"dd");const a=document.createElement("div");a.setAttribute("id","monthofyear"),a.innerHTML=tt(new Date,"LLLL"),e.appendChild(a),e.appendChild(r),e.appendChild(n),t.appendChild(e)}(),0==sessionStorage.length?function(){sessionStorage.setItem("userData",JSON.stringify([]));const t=St("All Tasks"),e=St("Completed Tasks"),n=St("General Tasks");At(t),At(e),At(n)}():function(){const t=JSON.parse(sessionStorage.getItem("userData"));for(let e=3;e<t.length;e++){const n=Dt(t[e].menuObject),r=document.querySelector("#menuitems"),a=document.querySelector("#menuform");r.insertBefore(n,a)}}();const Lt=document.querySelectorAll(".menuitem"),Mt=document.querySelector("#createmenubutton");Lt.forEach((t=>t.addEventListener("click",(function(){Tt(t)})))),Mt.addEventListener("click",(function(){!function(){nt();const t=document.querySelector("#menuitems"),e=Et();t.appendChild(e),document.querySelector("#menuformtitle").focus();const n=document.querySelector("#newmenuformdelete"),r=document.querySelector("#newmenuformsubmit");n.addEventListener("click",(function(){xt()})),r.addEventListener("click",(function(){!function(){const t=document.querySelector("#menuformtitle");if(!0===t.checkValidity()){const e=St(t.value),n=Dt(e),r=document.querySelector("#menuitems"),a=document.querySelector("#menuform");r.insertBefore(n,a),xt(),At(e),Tt(n)}else t.focus()}()}))}()}))})();