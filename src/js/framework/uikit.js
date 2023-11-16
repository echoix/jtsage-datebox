/**
 * JTSage-DateBox
 * @fileOverview UIKit v3 Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * calbox: A+
 * datebox: A+
 * slidebox: A+
 * flipbox: A+
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.0.0
 */

mergeOpts({
	theme_clearBtn    : [ "clear",  "default" ],
	theme_closeBtn    : [ "check",  "default" ],
	theme_cancelBtn   : [ "cancel", "default" ],
	theme_tomorrowBtn : [ "goto",   "default" ],
	theme_todayBtn    : [ "goto",   "default" ],

	theme_dropdownContainer : "uk-card uk-card-default",
	theme_modalContainer    : "uk-card uk-card-default",
	theme_inlineContainer   : "uk-card uk-card-default",

	theme_headerTheme  : "bg-dark",
	theme_headerBtn    : [ "cancel", "default" ],
	theme_openButton   : "secondary",

	theme_cal_Today       : "secondary",
	theme_cal_DayHigh     : "danger",
	theme_cal_Selected    : "primary",
	theme_cal_DateHigh    : "danger",
	theme_cal_DateHighAlt : "danger",
	theme_cal_DateHighRec : "danger",
	theme_cal_Default     : "default",
	theme_cal_OutOfBounds : "text",

	theme_cal_NextBtn : [ "next", "text" ],
	theme_cal_PrevBtn : [ "prev", "text" ],

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtn : [ "plus",  "default" ],
	theme_dbox_PrevBtn : [ "minus", "default" ],
	theme_dbox_Inputs     : false, //UNUSED

	theme_fbox_Selected   : "primary",
	theme_fbox_Default    : "default",
	theme_fbox_Forbidden  : "secondary",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "secondary",
	theme_slide_DayHigh     : "danger",
	theme_slide_Selected    : "primary",
	theme_slide_DateHigh    : "danger",
	theme_slide_DateHighAlt : "danger",
	theme_slide_DateHighRec : "danger",
	theme_slide_Default     : "default",

	theme_slide_NextBtn     : [ "plus",  "text" ],
	theme_slide_PrevBtn     : [ "minus", "text" ],
	theme_slide_NextDateBtn : [ "next",  "text" ],
	theme_slide_PrevDateBtn : [ "prev",  "text" ],

	theme_slide_Pickers  : false, // UNUSED
	theme_slide_DateList : false, // UNUSED

	theme_backgroundMask : {
		position          : "fixed",
		left              : 0,
		top               : 0,
		right             : 0,
		bottom            : 0,
		backgroundColor   : "rgba(0,0,0,.4)"
	},
	theme_headStyle : false,
	theme_spanStyle : false,

	buttonIconDate : "calendar",
	buttonIconTime : "clock",

	disabledState  : "disabled",

	clickEvent : "click",
	tranDone   : "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});


/*
 * Find the attacment point for the control
 * 
 * @param {boolean} isInline control is being inlined
 * @returns {object} jQuery attachment point
 */
JTSageDateBox.style_attach = function( isInline ) {
	var w               = this, last, exitLoop = 0,
		possibleAttach  = w.d.wrap,
		hardAttachPoint = $( "body" ).find( "#" + w.baseID + "-dbAttach" );
		

	// If [id]-dbAttach exists, that's the attachment point, always.
	if ( hardAttachPoint.length === 1 ) { return hardAttachPoint; }

	// Not inline, either modal or popup
	if ( !isInline ) {
		return $( "body" );
	}

	// Inline or blind
	last = possibleAttach;
	for (;;) {
		exitLoop++;
		possibleAttach = possibleAttach.parent();
		if ( possibleAttach.is( "form" ) ) { return last; }
		if ( exitLoop > 20 ) { return $( "body" ); }
		last = possibleAttach;
	}
};

/*
 * Make a button
 * 
 * @param  {array} theme Theme class and icon for the button
 * @param  {string} contents Text contents of the button (if any)
 * @return {string} Created button
 */

JTSageDateBox.style_btn = function( theme, contents ) {
	var retty;

	contents = ( typeof contents === "undefined" ) ? "" : contents;

	retty  = "<a href='#' role='button' class='uk-button uk-button-" + theme[1] + "'>";
	retty += ( theme[0] !== false ) ?
		"<span>" + this.icons.getIcon.call( this, theme[0] ) + "</span> " :
		"";
	retty += contents + "</a>";

	return retty;
};

/**
 * Make a button group
 * 
 * @param  {boolean} collapse Attempt to display buttons on one line
 * @return {object} jQuery object of a button group that buttons can be appended to
 */
JTSageDateBox.style_btnGrp = function ( collapse ) {
	var cls = ( collapse === true ) ? "uk-button-group uk-width-1-1" : "";

	return $("<div class='" + cls + "'>");
};

JTSageDateBox.style_btnGrpOut = function ( collapse, inner ) {
	if ( collapse ) {
		inner.find(".uk-button").addClass("uk-padding-remove uk-width-expand");
	} else {
		inner.find(".uk-button").addClass("uk-width-1-1");
	}
	return inner;
};

/**
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @param  {string} theme Theme class
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput ) {
	return originalInput.wrap("<div class='uk-inline uk-width-1-1'>").parent();
};

/**
 * Create the open button that is added to the input
 * 
 * MUST contain dbOpenButton class. (outer)
 * 
 * @param  {string} icon Icon to use (name or SVG)
 * @param  {string} title Hover text for the button
 * @return {string} Rendered HTML of the open button
 */
JTSageDateBox.style_inBtn = function ( icon, title ) {
	this.d.wrap.prepend(
		"<a href='#' title='" + title + "' class='dbOpenButton uk-form-icon uk-form-icon-flip'>" +
		this.icons.getIcon.call( this, icon ) + "</a>"
	);
	return "";
};

/**
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
JTSageDateBox.style_inNoBtn = function ( ) {
	return true;
};

/*
 * Hide the input element completely.
 */
JTSageDateBox.style_inHide = function() {
	var w          = this,
		last       = w.d.wrap,
		exitLoop   = 0,
		hideMe     = w.d.wrap;

	for (;;) {
		exitLoop++;
		hideMe = hideMe.parent();
		if ( hideMe.is( "form" ) ) { last.hide(); return true; }
		if ( exitLoop > 20 ) { w.d.wrap.hide(); return true; }
		last = hideMe;
	}
};

/**
 * Make the header for every mode
 * 
 * Close button MUST include the "dbCloser" class.
 * 
 * @param  {string} text Text of the header
 * @param  {string} themeBar Theme class for the header
 * @param  {string} themeButton Icon & Theme for the close button
 * @return {string} Rendered HTML
 */
JTSageDateBox.style_mainHead = function ( text, themeBar, themeButton ) {
	return "<nav class='uk-navbar-container' uk-navbar>" +
		"<div class='uk-navbar-left'>" +
		"<ul class=\"uk-navbar-nav\"><li class=\"uk-active\">" +
		"<div class=\"uk-navbar-item uk-logo\">" + text + "</div></li></ul>" +
		"</div><div class='uk-navbar-right'>" +
		"<ul class=\"uk-navbar-nav\"><li><a href='#' class='dbCloser'>" +
		this.icons.getIcon.call( this, themeButton[0] ) + "</a></li></ul>" +
		"</div></div>";
},

/**
 * Make an internal header ( datebox & flipbox )
 * 
 * MUST have the "dbHeader" class
 * 
 * @param  {string} text Text to display
 * @return {object} jQuery object
 */
JTSageDateBox.style_subHead =  function ( text ) {
	return $(
		"<div class='uk-text-center uk-margin-top dbHeader'><h5>" + text + "</h5></div>"
	);
},

/**
 * Make the header for calbox / slidebox
 * 
 * @param  {string} txt Text to display
 * @param  {string} prevBtn Previous button icon (name or SVG) & class
 * @param  {string} nextBtn Next button icon (name or SVG) & class
 * @param  {string} prevCtl Control class for previous button
 * @param  {string} nextCtl Control class for next button
 * @return {object} jQuery Object
 */
JTSageDateBox.style_pnHead = function ( txt, prevBtn, nextBtn, prevCtl, nextCtl ) {
	var returnVal = $("<div class='uk-grid uk-grid-collapse uk-margin-top'>");


	$( "<div class='uk-text-center uk-width-1-6'>" + this.style_btn(
		[ prevBtn[0], prevBtn[1] + " mx-2 " + prevCtl ]
	) + "</div>" ).appendTo( returnVal );

	$("<div class='uk-width-expand uk-text-center'><h4>" + txt + "</h4></div>")
		.appendTo( returnVal );

	$( "<div class='uk-text-center uk-width-1-6'>" + this.style_btn(
		[ nextBtn[0], nextBtn[1] + " mx-2 " + nextCtl ]
	) + "</div>" ).appendTo( returnVal );

	return returnVal;
};

/**
 * Create the year and month picker for calbox / slidebox
 * 
 * @param {object} ranges Year and Month arrays
 * @param {array} ranges.year Containing arrays of [ value, text, selected (boolean) ]
 * @param {array} ranges.month Containing arrays of [ value, text, selected (boolean) ]
 * @param {string} theme Theme class for controls
 * @param {string} monthCtl Control class for month picker
 * @param {string} yearCtl Control class for year picker
 * @return {object} jQuery Object
 */
JTSageDateBox.style_picker =  function ( ranges, theme, monthCtl, yearCtl ) {
	var returnVal = "";

	returnVal += "<div class='uk-grid uk-margin uk-grid-collapse'>";

	returnVal += "<div class='uk-width-2-3'>";
	returnVal += this._stdSel( ranges.month, monthCtl, "uk-select" );
	returnVal += "</div>";

	returnVal += "<div class='uk-width-1-3'>";
	returnVal += this._stdSel( ranges.year, yearCtl, "uk-select" );
	returnVal += "</div>";

	returnVal += "</div>";

	return $(returnVal);
};

/**
 * Make the calbox/slidebox drop down quick pick list.
 * 
 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
 *
 * @param {string} listLabel Label for the list
 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
 * @param {string} theme Theme class
 * @param {string} ctlCls Control class for select
 * @return {object} jQuery Object
 */
JTSageDateBox.style_dateList = function ( listLabel, list, theme, ctlCls ) {
	var returnVal = "",
		newList = list.slice();


	newList.unshift([false, listLabel, true]);

	returnVal += "<div class='uk-margin'>";
	returnVal += this._stdSel( newList, ctlCls, "uk-select" );
	returnVal += "</div>";

	return $(returnVal);
};


/* CalBox Specific */


/**
 * Create the calbox grid container.  Probably a table
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calGrid = function () {
	return $(
		"<div class='uk-width-1-1 uk-margin'><table class='dbCalGrid uk-width-1-1'></table></div>"
	);
};

/**
 * Create a calbox grid row.  Probably a tr
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calRow = function () {
	return $( "<tr>" );
};

/**
 * Create a clickable box for each grid item in calbox.
 * 
 * MUST have the "dbEvent" class
 * 
 * @param {object}  data             Date information object
 * @param {boolean} data.bad         True if the date is invalid
 * @param {boolean} data.good        True if the date is valid
 * @param {string}  data.theme       Theme class for the button
 * @param {string}  data.displayText Text of the date
 * @param {object}  data.dateObj     Date object
 * 
 * @param  {number} totalElements Number of elements in the row ( 7 or 8 )
 * @return {object} jQuery Object
 */
JTSageDateBox.style_calBtn =  function ( data, totalElements ) {
	var styles_TD = [
			"width : " + ( 100 / totalElements ) + "%"
		],
		class_TD = [
			"uk-margin-remove",
			"uk-padding-remove",
			"uk-text-center"
		],
		class_A = [
			"dbEvent",
			"uk-width-1-1",
			"uk-button",
			"uk-button-small",
			"uk-padding-remove",
			"uk-button-" + data.theme,
			( data.bad ? " disabled":"" )
		],
		disable = ( data.bad ? "disabled='disabled'" : "" );

	return $(
		"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD.join( ";" ) + "'>" +
		"<a href='#' class='" + class_A.join( " " ) + "' " + disable + ">" +
		data.displayText +
		"</a>" + "</td>"
	);
};

/**
 * Create a non-button calbox grid box
 * 
 * @param  {string} text Text to display
 * @param  {boolean} header Is this a header (bold?)
 * @param  {number} totalElements Number of elements in the row ( 7 or 8 )
 * @return {object} jQuery object
 * @memberof JTSageDateBox.styleFunctions
 * @this JTSageDateBox.styleFunctions
 */
JTSageDateBox.style_calTxt = function ( text, header, totalElements ) {
	var styles_TD =
			"width : " + ( 100 / totalElements ) + "%",
		class_TD = [
			"uk-margin-remove",
			"uk-padding-remove",
			"uk-text-center",
			( header ) ? "uk-text-bold" : ""
		];

	return $(
		"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD + "'>" + text + "</td>"
	);
};


/* DateBox Specific */

/**
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $( "<table class='uk-width-1-1'>" );
};

/**
 * Make the datebox control row
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxRow = function () {
	return $( "<tr>" );
};

/**
 * Make a datebox +/-/input control
 * 
 * Next button MUST have "dbBoxNext" class
 * Previous button MUST have "dbBoxPrev" class
 * Container must have "mainCls"
 *
 * @param {string} prevBtn Previous button icon (name or SVG) & class
 * @param {string} nextBtn Next button icon (name of SVG) & class
 * @param {string} mainCls Class for the control (input type)
 * @param {string} label Label, if needed
 * @param {string} inTheme Theme for inputs
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtrl = function ( prevBtn, nextBtn, mainCls, label ) {
	var returnVal = "";

	returnVal += "<td class='dbBox" + mainCls + "'>";

	returnVal += this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " dbBoxNext uk-padding-remove uk-width-1-1"
	] );

	if ( label !== null ) {
		returnVal += "<div class='uk-text-center' " +
			"style='height:auto'>" + label + "</div>";
	}
	returnVal += "<input type='text' ";
	returnVal += "class='uk-input uk-padding-remove uk-text-center'>";

	returnVal += this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " dbBoxPrev uk-padding-remove uk-width-1-1"
	] );

	returnVal += "</div>";

	return $(returnVal);
};


/* SlideBox Specific */

/**
 * Make the grid container for slidebox (usually a table)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideGrid = function () {
	return $( "<div class='uk-margin'><table class='dbSlideGrid uk-width-1-1'></table></div>" );
};

/**
 * Make the grid for for slidebox (usually a TR)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideRow = function () {
	return $( "<tr>" );
};

/**
 * Create a clickable box for each grid date in slidebox.
 * 
 * MUST have the "dbEventS" class
 * 
 * @param {object} data Date information object
 * @param {boolean} data.bad True if the date is invalid
 * @param {boolean} data.good True if the date is valid
 * @param {string} data.theme Theme class for the button
 * @param {object} data.dateObj Date object
 * 
 * @return {object} jQuery Object
 */
JTSageDateBox.style_slideBtn = function ( data ) {
	var styles_TD = "width: " + ( 100 / 8 ) + "%",
		class_TD = [
			"uk-margin-remove",
			"uk-padding-remove",
			"uk-text-center"
		],
		class_A = [
			"dbEventS",
			"uk-button",
			"uk-width-1-1",
			"uk-padding-remove",
			"uk-button-" + data.theme,
			( data.bad ? "disabled" : "" )
		],
		disable = ( data.bad ? "disabled='disabled'" : "");

	return $(
		"<td class='" + class_TD.join( " " ) + "' style='" + styles_TD + "'>" +
		"<a href='#' class='" + class_A.join( " " ) + "' " + disable + ">" +
		"<span class='uk-text-small'>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
		"</span>" +
		"<br>" + data.dateObj.getDate() +
		"</a></td>");
};

/**
 * Create next/prev week buttons for slidebox
 *
 * @param {string} eventCls The event class.  Should be placed on the button
 * @param {string} theme Icon to use for button ( name or SVG ) & theme
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideCtrl = function ( eventCls, theme ) {
	var styles_TD = "width: " + ( ( 100 / 8 ) / 2 ) + "%",
		class_TD = [
			"uk-margin-remove",
			"uk-padding-remove",
			"uk-text-center"
		],
		class_A = [
			"uk-width-1-1",
			"uk-padding-remove",
			"uk-button",
			"uk-button-" + theme[1],
			eventCls
		];

	return $(
		"<td class='" +  class_TD.join( " " ) + "' style='" + styles_TD + "'>" +
		"<a href='#' class='" + class_A.join( " " ) + "'>" +
		this.icons.getIcon.call( this, theme[0] )  + "</a></td>"
	);
};


/* FlipBox Specific */



/**
 * Make the container for the flipbox
 *
 * @param {number} size Height CSS property
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxCtr = function ( size ) {
	return $(
		"<div class='uk-margin' style='height: " +
		size +
		"; overflow: hidden'>"
	);
};

/**
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $(
		"<div class='' style='margin-bottom: -8px;'>"
	);
};

/**
 * Make a flibox label
 *
 * @param {string} text Text of the label
 * @param {number} items Total number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbl = function ( text, items ) {
	return $(
		"<div class='uk-text-center uk-display-inline-block' " +
		"style='width: " + ( 100 / items ) + "%'>" +
		text +
		"</div>"
	);
};

/**
 * Make a flipbox roller container (outermost)
 *
 * @param {number} total Number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCtr = function ( total ) {
	var style = [
		"width: " + ( 100 / total ) + "%",
		"float: left"
	];
	return $( "<div style='" + style.join( ";" ) + "'>" );
};

/**
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<ul class='uk-list'>" );
};

/**
 * Make a flipbox element (innermost) - usually a LI
 *
 * @param {string} text
 * @param {string} cls
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCld = function ( text, cls ) {
	return $(
		"<li style='margin-top:0; margin-bottom:0; padding:4px 0;' " +
		"class='uk-text-center uk-background-" + cls + "'>" +
		text +
		"</li>"
	);
};

/**
 * Make the flipbox lens
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxLens = function () {
	return $(
		"<div class='uk-width-1-1 uk-box-shadow-small' " +
		"style='height:40px; border: 1px solid rgba(0,0,0,.2);'>"
	);
};


/**
 * Position the flip elements.  Overrides the base function if it exists
 */
JTSageDateBox.style_fboxPos = function () {
	var fullRoller, firstItem, height_Roller, intended_Top,
		w                 = this,
		o                 = this.options,
		height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight(),
		theLens           = w.d.intHTML.find( ".dbLens" ).first(),
		height_Lens       = theLens.outerHeight(true),
		single            = w.d.intHTML.find( ".dbRoller" ).first().children().first();

	// Trap for run too early.
	if ( single.height() < 5 ) { return true; }

	// Lens top:
	// Negative Half the parent height is center.
	// Add Negative half the lens height.
	intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
	theLens.css( {
		top          : intended_Top - 12,
		marginBottom : -1 * height_Lens
	} );
	
	w.d.intHTML.find( ".dbRoller" ).each( function() {
		fullRoller    = $(this);
		firstItem     = fullRoller.children().first();

		// No RE-DO's, if it has a style, it's probably right.
		if ( firstItem.css( "marginTop" ) === "0px" ) {
				
			height_Roller = (fullRoller.children().length - 0.5 ) * firstItem.outerHeight();

			// Negative Half the height of the roller ( gets center to top border of view)
			// Add half of the view container height.
			intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Outside / 2 );

			if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

			firstItem.css("margin-top", intended_Top);
			
		}
	});
};

