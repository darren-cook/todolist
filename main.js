(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function n(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(e(1,arguments),!t(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function i(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,r=e.formats[n]||e.formats[e.defaultWidth];return r}}var o,u={date:i({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:i({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:i({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},c={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function d(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=a.width?String(a.width):i;r=e.formattingValues[o]||e.formattingValues[i]}else{var u=e.defaultWidth,c=a.width?String(a.width):e.defaultWidth;r=e.values[c]||e.values[u]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function s(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],i=t.match(a);if(!i)return null;var o,u=i[0],c=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(c)?m(c,(function(e){return e.test(u)})):l(c,(function(e){return e.test(u)}));o=e.valueCallback?e.valueCallback(d):d,o=n.valueCallback?n.valueCallback(o):o;var s=t.slice(u.length);return{value:o,rest:s}}}function l(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function m(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const h={code:"en-US",formatDistance:function(e,t,n){var r,i=a[e];return r="string"==typeof i?i:1===t?i.one:i.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:u,formatRelative:function(e,t,n,r){return c[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:d({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:d({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:d({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:d({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:d({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(o.matchPattern);if(!n)return null;var r=n[0],a=e.match(o.parsePattern);if(!a)return null;var i=o.valueCallback?o.valueCallback(a[0]):a[0];i=t.valueCallback?t.valueCallback(i):i;var u=e.slice(r.length);return{value:i,rest:u}}),era:s({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:s({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:s({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:s({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function f(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function g(t,r){e(2,arguments);var a=n(t).getTime(),i=f(r);return new Date(a+i)}function b(t,n){e(2,arguments);var r=f(n);return g(t,-r)}var w=864e5;function v(t){e(1,arguments);var r=1,a=n(t),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function y(t){e(1,arguments);var r=n(t),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=v(i),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var c=v(u);return r.getTime()>=o.getTime()?a+1:r.getTime()>=c.getTime()?a:a-1}function p(t){e(1,arguments);var n=y(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=v(r);return a}var C=6048e5;function T(t,r){e(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:f(o),c=null==a.weekStartsOn?u:f(a.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=n(t),s=d.getUTCDay(),l=(s<c?7:0)+s-c;return d.setUTCDate(d.getUTCDate()-l),d.setUTCHours(0,0,0,0),d}function E(t,r){e(1,arguments);var a=n(t),i=a.getUTCFullYear(),o=r||{},u=o.locale,c=u&&u.options&&u.options.firstWeekContainsDate,d=null==c?1:f(c),s=null==o.firstWeekContainsDate?d:f(o.firstWeekContainsDate);if(!(s>=1&&s<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,s),l.setUTCHours(0,0,0,0);var m=T(l,r),h=new Date(0);h.setUTCFullYear(i,0,s),h.setUTCHours(0,0,0,0);var g=T(h,r);return a.getTime()>=m.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function S(t,n){e(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:f(i),u=null==r.firstWeekContainsDate?o:f(r.firstWeekContainsDate),c=E(t,n),d=new Date(0);d.setUTCFullYear(c,0,u),d.setUTCHours(0,0,0,0);var s=T(d,n);return s}var k=6048e5;function M(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const x=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return M("yy"===t?r%100:r,t.length)},D=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):M(n+1,2)},L=function(e,t){return M(e.getUTCDate(),t.length)},q=function(e,t){return M(e.getUTCHours()%12||12,t.length)},P=function(e,t){return M(e.getUTCHours(),t.length)},U=function(e,t){return M(e.getUTCMinutes(),t.length)},A=function(e,t){return M(e.getUTCSeconds(),t.length)},W=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return M(Math.floor(r*Math.pow(10,n-3)),t.length)};function Y(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+M(i,2)}function N(e,t){return e%60==0?(e>0?"-":"+")+M(Math.abs(e)/60,2):O(e,t)}function O(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+M(Math.floor(a/60),2)+n+M(a%60,2)}const j={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return x(e,t)},Y:function(e,t,n,r){var a=E(e,r),i=a>0?a:1-a;return"YY"===t?M(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):M(i,t.length)},R:function(e,t){return M(y(e),t.length)},u:function(e,t){return M(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return M(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return M(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return D(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return M(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,r,a,i){var o=function(t,r){e(1,arguments);var a=n(t),i=T(a,r).getTime()-S(a,r).getTime();return Math.round(i/k)+1}(t,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):M(o,r.length)},I:function(t,r,a){var i=function(t){e(1,arguments);var r=n(t),a=v(r).getTime()-p(r).getTime();return Math.round(a/C)+1}(t);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):M(i,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):L(e,t)},D:function(t,r,a){var i=function(t){e(1,arguments);var r=n(t),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/w)+1}(t);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):M(i,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return M(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return M(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return M(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return q(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):P(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):M(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):M(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):U(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):A(e,t)},S:function(e,t){return W(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return N(a);case"XXXX":case"XX":return O(a);default:return O(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return N(a);case"xxxx":case"xx":return O(a);default:return O(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+Y(a,":");default:return"GMT"+O(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+Y(a,":");default:return"GMT"+O(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return M(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return M((r._originalDate||e).getTime(),t.length)}};function H(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}}function F(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}}var z={p:F,P:function(e,t){var n,r=e.match(/(P+)(p+)?/)||[],a=r[1],i=r[2];if(!i)return H(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",H(a,t)).replace("{{time}}",F(i,t))}};const B=z;function Q(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var $=["D","DD"],G=["YY","YYYY"];function X(e){return-1!==$.indexOf(e)}function R(e){return-1!==G.indexOf(e)}function I(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,_=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function ee(t,a,i){e(2,arguments);var o=String(a),u=i||{},c=u.locale||h,d=c.options&&c.options.firstWeekContainsDate,s=null==d?1:f(d),l=null==u.firstWeekContainsDate?s:f(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=c.options&&c.options.weekStartsOn,g=null==m?0:f(m),w=null==u.weekStartsOn?g:f(u.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var v=n(t);if(!r(v))throw new RangeError("Invalid time value");var y=Q(v),p=b(v,y),C={firstWeekContainsDate:l,weekStartsOn:w,locale:c,_originalDate:v},T=o.match(_).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,B[t])(e,c.formatLong,C):e})).join("").match(J).map((function(e){if("''"===e)return"'";var n=e[0];if("'"===n)return te(e);var r=j[n];if(r)return!u.useAdditionalWeekYearTokens&&R(e)&&I(e,a,t),!u.useAdditionalDayOfYearTokens&&X(e)&&I(e,a,t),r(p,e,c.localize,C);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return e})).join("");return T}function te(e){return e.match(V)[1].replace(K,"'")}function ne(){document.querySelectorAll(".disableable").forEach((e=>e.classList.add("disabled")))}function re(){const e=document.querySelector("#body"),t=document.querySelector("#sidebar");e.style.filter="none",t.style.filter="none",document.querySelector("#verifydeletecontainer").remove()}function ae(e){document.querySelector(".activemenu").classList.remove("activemenu"),e.classList.add("activemenu"),function(e){const t=document.querySelector(".activebody"),n=document.querySelector(e);t.classList.add("hidden"),t.classList.remove("activebody"),n.classList.add("activebody"),n.classList.remove("hidden")}(e.dataset.pair)}function ie(e="New Task List"){const t=document.createElement("div");t.setAttribute("id","menuform");const n=document.createElement("form");n.setAttribute("onsubmit","return false");const r=document.createElement("input");r.setAttribute("type","text"),r.setAttribute("id","menuformtitle"),r.setAttribute("name","menuformtitle"),r.required=!0,r.setAttribute("maxlength","15"),"New Task List"==e?r.setAttribute("placeholder","New Task List"):r.value=e,n.appendChild(r),t.appendChild(n);const a=document.createElement("div");a.setAttribute("id","menuformicons");const i=document.createElement("img");i.setAttribute("id","newmenuformsubmit"),i.setAttribute("src","./images/check.png"),i.setAttribute("alt","Complete Icon");const o=document.createElement("img");return o.setAttribute("id","newmenuformdelete"),o.setAttribute("src","./images/delete.png"),o.setAttribute("alt","Delete Icon"),a.appendChild(i),a.appendChild(o),t.appendChild(a),t}const oe=e=>({title:e,classes:["menuitem","menuedit","disableable"],pair:`#body-${e}`});function ue(){document.querySelector("#menuform").remove(),document.querySelectorAll(".disableable").forEach((e=>e.classList.remove("disabled"))),document.querySelector("#custommenu").classList.remove("hidden")}!function(){const e=document.querySelector("#todaysdate"),t=document.createElement("div");t.setAttribute("id","calendar");const n=document.createElement("div");n.setAttribute("id","dayofweek"),n.innerHTML=ee(new Date,"eeee");const r=document.createElement("div");r.setAttribute("id","dayofmonth"),r.innerHTML=ee(new Date,"dd");const a=document.createElement("div");a.setAttribute("id","monthofyear"),a.innerHTML=ee(new Date,"LLLL"),t.appendChild(a),t.appendChild(r),t.appendChild(n),e.appendChild(t)}();const ce=document.querySelectorAll(".menuitem"),de=document.querySelector("#custommenu");ce.forEach((e=>e.addEventListener("click",(function(){ae(e)})))),de.addEventListener("click",(function(){!function(){ne();const e=document.querySelector("#menuitems"),t=ie();e.appendChild(t),document.querySelector("#menuformtitle").focus(),document.querySelector("#custommenu").classList.add("hidden");const n=document.querySelector("#newmenuformdelete"),r=document.querySelector("#newmenuformsubmit");n.addEventListener("click",(function(){ue()})),r.addEventListener("click",(function(){!function(){const e=document.querySelector("#menuformtitle");if(!0===e.checkValidity()){const t=oe(e.value),n=function(e,t,n){const r=document.createElement("div");r.setAttribute("id",`menu-${e}`),r.setAttribute("data-pair",n),t.forEach((e=>{r.classList.add(e)})),r.addEventListener("click",(function(){ae(r)}));const a=document.createElement("div");a.setAttribute("id",`menu-${e}-content`),a.textContent=e;const i=document.createElement("img"),o=document.createElement("img");return i.src="./images/pencil.png",i.alt="Edit Icon",i.classList.add("editicon"),i.classList.add("disableable"),i.addEventListener("click",(function(){!function(e){ne(),document.querySelector("#custommenu").classList.add("hidden");const t=document.getElementById(e),n=document.querySelector(`#${e}-content`),r=ie(n.textContent);document.querySelector("#menuitems").insertBefore(r,t),document.querySelector("#menuForm");const a=document.querySelector("#menuformtitle");t.classList.add("hidden");const i=document.querySelector("#newmenuformdelete"),o=document.querySelector("#newmenuformsubmit");i.addEventListener("click",(function(){ue(),t.classList.remove("hidden")})),o.addEventListener("click",(function(){!function(e,t,n){const r=document.querySelector("#menuformtitle");if(!0===r.checkValidity()){document.querySelector(`#body-${t.textContent}`).id=`body-${n}`;const r=document.querySelector(`#body-${t.textContent}-title`);r.id=`body-${n}-title`,r.textContent=n,e.id=`menu-${n}`,e.dataset.pair=`#body-${n}`,t.textContent=n,t.id=`menu-${n}-content`,ue()}else r.focus()}(t,n,a.value),t.classList.remove("hidden"),ae(t)}))}(i.parentElement.id)})),o.src="./images/delete.png",o.alt="Delete Icon",o.classList.add("deleteicon"),o.classList.add("disableable"),o.addEventListener("click",(function(){!function(e){!function(e){const t=document.querySelector("#body"),n=document.querySelector("#sidebar");t.style.filter="blur(3px)",n.style.filter="blur(3px)";const r=document.querySelector("#content"),a=(document.querySelector("#body"),document.createElement("div"));a.setAttribute("id","verifydeletecontainer");const i=document.createElement("div");i.setAttribute("id","verifydelete");const o=document.createElement("div");o.setAttribute("id","verifydeletetop");const u=document.createElement("img");u.setAttribute("id","warningicon"),u.setAttribute("src","./images/alert.png"),u.setAttribute("alt","Warning Icon");const c=document.createElement("h3");c.setAttribute("id","warningitem"),c.textContent=`Delete - ${e.firstChild.textContent}`;const d=document.createElement("p");d.setAttribute("id","warningmessage"),d.textContent="This action cannot be undone.",o.appendChild(u),o.appendChild(c),o.appendChild(d);const s=document.createElement("div");s.setAttribute("id","verifydeletebottom");const l=document.createElement("button");l.setAttribute("id","cancelbutton"),l.classList.add("verifydeletebutton"),l.textContent="CANCEL";const m=document.createElement("button");m.setAttribute("id","deletebutton"),m.classList.add("verifydeletebutton"),m.textContent="DELETE",s.appendChild(l),s.appendChild(m),i.appendChild(o),i.appendChild(s),a.appendChild(i),r.appendChild(a)}(e);const t=document.querySelector("#cancelbutton"),n=document.querySelector("#deletebutton");t.addEventListener("click",(function(){re()})),n.addEventListener("click",(function(){ae(document.querySelector("#menu-alltasks")),function(e){const t=document.querySelector(e.dataset.pair);e.remove(),t.remove()}(e),re()}))}(o.parentElement)})),r.appendChild(a),r.appendChild(i),r.appendChild(o),r}(t.title,t.classes,t.pair),r=document.querySelector("#menuitems"),a=document.querySelector("#menuform");r.insertBefore(n,a),ue(),function(e){const t=document.querySelector("#body"),n=document.createElement("div");n.setAttribute("id",`body-${e}`),n.classList.add("taskbox"),n.classList.add("hidden");const r=document.createElement("div");r.classList.add("taskheader");const a=document.createElement("div");a.setAttribute("id",`body-${e}-title`),a.classList.add("tasktitle"),a.textContent=e,r.appendChild(a),n.appendChild(r);const i=document.createElement("div");i.classList.add("taskbody");const o=document.createElement("div");o.classList.add("taskcolumns");const u=document.createElement("div");u.textContent="Priority",u.classList.add("taskcolumn","justifycenter"),o.appendChild(u);const c=document.createElement("div");c.textContent="Title",c.classList.add("taskcolumn","justifystart"),o.appendChild(c);const d=document.createElement("div");d.textContent="Task List",d.classList.add("taskcolumn","justifystart"),o.appendChild(d);const s=document.createElement("div");s.textContent="Due Date",s.classList.add("taskcolumn","justifycenter"),o.appendChild(s);const l=document.createElement("div");l.textContent="Actions",l.classList.add("taskcolumn","justifycenter"),o.appendChild(l),i.appendChild(o);const m=document.createElement("div");m.classList.add("tasklist"),i.appendChild(m);const h=document.createElement("div");h.classList.add("customitem","disableable"),h.textContent="+",i.appendChild(h),n.appendChild(i),t.appendChild(n)}(t.title),ae(n)}else e.focus()}()}))}()}))})();