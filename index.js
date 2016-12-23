// MIT License
// (c) 2013-2014 Laurent Debacker

// Usage:
// var filter = QM.And(QM.Not(QM.Eq("type",[QM.String("foo"),QM.String("bar")])),QM.Fts("text","belgian chocolate"));
// var sort = QM.Sort(QM.Order("rooms",false),QM.Order("price"));
// window.location.search = "?f=" + filter + "&s=" + sort;

(function(exports) {
	function escapeChar(c) {
		var s = c.charCodeAt(0).toString(16);
		return '%' + (s.length == 1 ? '0' + s : s);
	}

	function escapeString(s) {
		return encodeURIComponent(s).replace(/[()]/g, escapeChar);
	}

	exports.Sort = function(orders) {
		if(orders.constructor != Array)
			orders = arguments;
		return Array.prototype.join(orders, "");
	};

	exports.Order = function(field, ascending) {
		field = escapeString(field);
		if(ascending === false)
			return '!' + field;
		return field;
	};

	exports.Not = function(predicate) {
		return "not(" + predicate + ")";
	};

	exports.And = function(predicates) {
		if(predicates.constructor != Array)
			predicates = arguments;
		return "and(" + predicates.join() + ")";
	};

	exports.Or = function(predicates) {
		if(predicates.constructor != Array)
			predicates = arguments;
		return "or(" + predicates.join() + ")";
	};

	exports.Eq = function (field, values) {
		if(values.constructor != Array)
			values = Array.prototype.splice.call(arguments, 1);
		var s = "eq(" + escapeString(field);
		if(values.length) s += "," + values.join();
		return s + ")";
	};

	exports.Lt = function(field, value) {
		return "lt(" + escapeString(field) + "," + value + ")";
	};

	exports.Le = function(field, value) {
		return "le(" + escapeString(field) + "," + value + ")";
	};

	exports.Gt = function(field, value) {
		return "gt(" + escapeString(field) + "," + value + ")";
	},

	exports.Ge = function(field, value) {
		return "ge(" + escapeString(field) + "," + value + ")";
	},

	exports.Fts = function(field, string) {
		return "fts(" + escapeString(field) + "," + QM.String(string) + ")";
	};

	exports.Null = "null";

	exports.Boolean = function(bool) {
		if(bool === null) return QM.Null;
		return bool ? "true" : "false";
	};

	exports.Number = function(number) {
		if(number === null) return QM.Null;
		return "" + number;
	};

	exports.String = function(string) {
		if(string === null) return QM.Null;
		return "$" + escapeString(string);
	};

	exports.Date = function(date) {
		if(date === null) return QM.Null;
		return date.toJSON();
	};
})(typeof exports === 'undefined' ? this['pgasus']={} : exports);
