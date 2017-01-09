/*!
 *  animation.js v0.1.0109
 *
 *  rhine@rhine.me
 *
 *  MIT License
 */
(function () {
	var aniList = [];
	window.Ani = {
		add: function ($dom, cfg) {
			if (cfg.animation) $dom.css('animation', cfg.animation);
			if (cfg.onStart) $dom.on('animationstart webkitAnimationStart', function () {
				cfg.onStart.call($dom);
			});
			if (cfg.onLoop) $dom.on('animationiteration webkitAnimationIteration', function () {
				cfg.onLoop.call($dom);
			});
			$dom.on('animationend webkitAnimationEnd', function () {
				Ani.remove($dom);
				if (cfg.onEnd) cfg.onEnd.call($dom);
			});
			return this;
		},
		remove: function ($dom) {
			$dom.css('animation', '');
			$dom.off('animationstart webkitAnimationStart');
			$dom.off('animationiteration webkitAnimationIteration');
			$dom.off('animationend webkitAnimationEnd');
			return this;
		},
		next: function ($dom, cfg) {
			if (typeof cfg == 'function') {
				cfg = {onEnd: cfg};
			}
			aniList.push([$dom, cfg]);
			return this;
		},
		__next: function () {
			if (!aniList.length) return;
			var arr = aniList.shift();
			if (!arr[1]) arr[1] = {};
			var onEnd = arr[1].onEnd;
			arr[1].onEnd = function () {
				onEnd && onEnd.call(this);
				Ani.__next();
			};
			Ani.add(arr[0], arr[1]);
		},
		start: function () {
			this.__next();
			return this;
		},
		clear: function () {
			aniList = [];
		}
	};
})();