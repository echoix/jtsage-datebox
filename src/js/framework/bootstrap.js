/**
 * JTSage-DateBox
 * @fileOverview BootStrap v3 Themes and StyleFunctions
 * This file supports: datebox, flipbox, slidebox, calbox.
 * 
 * @author J.T.Sage <jtsage+datebox@gmail.com>
 * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
 * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
 * @version 5.2.0
 */

mergeOpts({

	theme_clearBtn    : [ "clear",  "default" ],
	theme_closeBtn    : [ "check",  "default" ],
	theme_cancelBtn   : [ "cancel", "default" ],
	theme_tomorrowBtn : [ "goto",   "default" ],
	theme_todayBtn    : [ "goto",   "default" ],

	theme_dropdownContainer : "panel panel-default",
	theme_modalContainer    : "panel panel-default",
	theme_inlineContainer   : "panel panel-default",

	theme_headerTheme  : "navbar-default",
	theme_headerBtn    : [ "cancel", "default" ],
	theme_openButton   : "", // has-succes, has-warning, has-error

	theme_cal_Today       : "info",
	theme_cal_DayHigh     : "warning",
	theme_cal_Selected    : "success",
	theme_cal_DateHigh    : "warning",
	theme_cal_DateHighAlt : "danger",
	theme_cal_DateHighRec : "warning",
	theme_cal_Default     : "default",
	theme_cal_OutOfBounds : "link",

	theme_cal_NextBtn : [ "next", "default" ],
	theme_cal_PrevBtn : [ "prev", "default" ],

	theme_cal_Pickers  : false, // UNUSED
	theme_cal_DateList : false, // UNUSED

	theme_dbox_NextBtn : [ "plus",  "default" ],
	theme_dbox_PrevBtn : [ "minus", "default" ],
	theme_dbox_Inputs  : false, //UNUSED

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "light",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "info",
	theme_slide_DayHigh     : "warning",
	theme_slide_Selected    : "success",
	theme_slide_DateHigh    : "warning",
	theme_slide_DateHighAlt : "danger",
	theme_slide_DateHighRec : "warning",
	theme_slide_Default     : "default",

	theme_slide_NextBtn     : [ "plus",  "default" ],
	theme_slide_PrevBtn     : [ "minus", "default" ],
	theme_slide_NextDateBtn : [ "next",  "default" ],
	theme_slide_PrevDateBtn : [ "prev",  "default" ],

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
	theme_headStyle : " .w-100 { width: 100%; }",
	theme_spanStyle : false,

	flipboxLensAdjust : 9,
	buttonIconDate    : "calendar",
	buttonIconTime    : "clock",
	disabledState     : "disabled",

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
	var w               = this,
		possibleAttach  = w.d.wrap.parent(),
		hardAttachPoint = $( "body" ).find( "#" + w.baseID + "-dbAttach" );
		

	// If [id]-dbAttach exists, that's the attachment point, always.
	if ( hardAttachPoint.length === 1 ) { return hardAttachPoint; }

	// Not inline, either modal or popup
	if ( !isInline ) {
		return $( "body" );
	}

	// Inline or blind
	if ( possibleAttach.hasClass( "form-group" ) ) {
		return possibleAttach;
	} else {
		return w.d.wrap;
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

	retty  = "<a href='#' role='button' class='btn btn-sm btn-" + theme[1] + "'>";
	retty += ( theme[0] !== false ) ?
		"<span style='top: 3px; display: inline-block; position: relative;'>" +
		this.icons.getIcon.call( this, theme[0] ) + "</span> " :
		"";
	retty += contents + "</a>";
	return retty;
};

/*
 * Make a button group
 * 
 * @param  {boolean} collapse Attempt to display buttons on one line
 * @return {object} jQuery object of a button group that buttons can be appended to
 */
JTSageDateBox.style_btnGrp = function ( collapse ) {
	var cls = ( collapse === true ) ?
		"btn-group btn-group-justified" :
		"btn-group btn-group-vertical";

	return $(
		"<div style='padding: 5px;' class='w-100 " +  cls + "'>"
	);
};

/*
 * Wrap the original input in a div so we can add a button to it
 * 
 * @param  {object} originalInput Original input element, jQuery object
 * @return {object} jQuery object now wrapped with some sort of div
 */
JTSageDateBox.style_inWrap = function ( originalInput, theme ) {
	return originalInput.wrap("<div class='input-group " + theme + "'>").parent();
};

/*
 * Create the open button that is added to the input
 * 
 * MUST contain dbOpenButton class. (outer)
 * 
 * @param  {string} icon Icon to use (name or SVG)
 * @param  {string} title Hover text for the button
 * @return {string} Rendered HTML of the open button
 */
JTSageDateBox.style_inBtn = function ( icon, title ) {
	return "<div class='input-group-addon dbOpenButton' title='" + title + "'>" +
		"<span>" + this.icons.getIcon.call( this, icon ) + "</span>" +
		"</div>";
};

/*
 * When not using the open button, we may need to alter the wrap class differently
 * 
 * @param  {object} originalInputWrap jQuery object
 */
JTSageDateBox.style_inNoBtn = function ( originalInputWrap ) {
	originalInputWrap.css( "width", "100%" );
};

/*
 * Hide the input element completely.
 */
JTSageDateBox.style_inHide = function() {
	var w      = this,
		hideMe = w.d.wrap.parent();

	if ( hideMe.hasClass("form-group") ) {
		hideMe.hide();
	} else {
		w.d.wrap.hide();
	}
};

/*
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
	return "<div class='navbar " + themeBar + "'><div class='navbar-header'>" +
		"<span class='navbar-brand'>" + text + "</span>" +
		"</div>" + "<ul class='nav navbar-nav navbar-right'>" +
		"<li><a href='#' class='dbCloser'><span>" + this.icons.getIcon.call( this, themeButton[0]) +
		"</span>&nbsp;&nbsp;</a></li></ul></div>";
},

/*
 * Make an internal header ( datebox & flipbox )
 * 
 * MUST have the "dbHeader" class
 * 
 * @param  {string} text Text to display
 * @return {object} jQuery object
 */
JTSageDateBox.style_subHead =  function ( text ) {
	return $(
		"<div class='text-center dbHeader'>" +
		"<h4>" + text + "</h4>" +
		"</div>"
	);
},

/*
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
	var returnVal = $("<div style='padding-bottom: 5px;'>");

	$( this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " pull-left " + prevCtl
	] ) ).appendTo( returnVal );

	$( this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " pull-right " + nextCtl
	] ) ).appendTo( returnVal );

	$("<h4 class='text-center' style='line-height: 1.5'>" + txt + "</h4>")
		.appendTo( returnVal );

	return returnVal;
};

/*
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

	returnVal += "<div style='padding:5px;'>";

	returnVal += "<div class='col-sm-8' style='padding:0; margin:0'>";
	returnVal += this._stdSel( ranges.month, monthCtl, "form-control" );
	returnVal += "</div>";

	returnVal += "<div class='col-sm-4' style='padding:0; margin:0'>";
	returnVal += this._stdSel( ranges.year, yearCtl, "form-control" );
	returnVal += "</div>";

	returnVal += "</div>";

	return $(returnVal);
};

/*
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

	returnVal += "<div style='padding:5px'>";
	returnVal += this._stdSel( newList, ctlCls, "form-control" );
	returnVal += "</div>";

	return $(returnVal);
};


/* CalBox Specific */


/*
 * Create the calbox grid container.  Probably a table
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calGrid = function () {
	return $(
		"<div style='padding:5px; clear:both'>" +
		"<table class='dbCalGrid w-100'>" +
		"</table></div>"
	);
};

/*
 * Create a calbox grid row.  Probably a tr
 * 
 * @return {object} jQuery object
 */
JTSageDateBox.style_calRow = function () {
	return $( "<tr>" );
};

/*
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
	var style = ( totalElements !== undefined ?
			" style='width: " + ( 100 / totalElements ) + "%'" :
			""
		),
		disable = ( data.bad ? "disabled='disabled'" : ""),
		cls = "class='w-100 dbEvent btn-sm btn btn-" +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td class='text-center'" + style + ">" +
		"<a href='#' " + cls + " " + disable + ">" +
		data.displayText +
		"</a>" + "</td>");
};

/*
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
	var style = ( totalElements !== undefined ?
			" style='width: " + ( 100 / totalElements ) + "%'" :
			""
		),
		cls = ( header ) ? " font-weight-bold" : "";

	return $("<td class='text-center" + cls + "'" + style + ">" + text + "</td>");
};


/* DateBox Specific */

/*
 * Make the datebox mode container.
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxCtr = function () {
	return $("<table style='margin: 5px;'>");
};

/*
 * Make the datebox control row
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_dboxRow = function () {
	return $("<tr>");
};

/*
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

	returnVal += "<td><div class='btn-group-vertical dbBox" + mainCls + "'>";

	returnVal += this.style_btn( [
		nextBtn[0],
		nextBtn[1] + " dbBoxNext"
	] );
	
	if ( label !== null ) {
		returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
			"style='height:auto'>" + label + "</div>";
	}
	returnVal += "<input type='text' ";
	returnVal += "class='form-control input-sm text-center' ";
	returnVal += "style='border-radius: 0; padding: 5px 0;'>";
	
	returnVal += this.style_btn( [
		prevBtn[0],
		prevBtn[1] + " dbBoxPrev"
	] );

	returnVal += "</div></td>";

	return $(returnVal);
};


/* SlideBox Specific */

/*
 * Make the grid container for slidebox (usually a table)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideGrid = function () {
	return $(
		"<div style='padding: 5px 0; clear: both;'>" +
		"<table class='dbSlideGrid w-100'>" +
		"</table></div>"
	);
};

/*
 * Make the grid for for slidebox (usually a TR)
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideRow = function () {
	return $( "<tr>" );
};

/*
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
	var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
		disable = ( data.bad ? "disabled='disabled'" : ""),
		cls     = "class='w-100 dbEventS btn-sm btn btn-" +
			data.theme + ( data.bad ? " disabled":"" ) + "'";

	return $("<td class='text-center'" + style + ">" +
		"<a href='#' style='border-radius: 50%;' " + cls + " " + disable + ">" +
		"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
		"</small><br>" + data.dateObj.getDate() +
		"</a>" + "</td>");
};

/*
 * Create next/prev week buttons for slidebox
 *
 * @param {string} eventCls The event class.  Should be placed on the button
 * @param {string} theme Icon to use for button ( name or SVG ) & theme
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_slideCtrl = function ( eventCls, theme ) {
	var style = " style='width: " + ( ( 100 / 8 ) / 2 ) + "%'",
		cls   = "class='w-100 btn-sm btn btn-" +
			theme[1] + " " + eventCls + "'";

	return $(
		"<td class='m-0 p-1 text-center'" + style + ">" +
		"<a href='#' style='border-radius: 50%; padding:2px; margin:0;' " +
		cls + ">" + this.icons.getIcon.call( theme[0] ) + "</a></td>"
	);
};


/* FlipBox Specific */



/*
 * Make the container for the flipbox
 *
 * @param {number} size Height CSS property
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxCtr = function ( size ) {
	return $(
		"<div style='height: " +
		size +
		"; overflow: hidden; padding: 5px;'>"
	);
};

/*
 * Make a container for flipbox labels
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbls = function ( ) {
	return $(
		"<div style='padding: 0 5px;'>"
	);
};

/*
 * Make a flibox label
 *
 * @param {string} text Text of the label
 * @param {number} items Total number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxDurLbl = function ( text, items ) {
	return $(
		"<div class='text-center' style='display: inline-block; width: " +
		( 100 / items ) + "%'>" + text +
		"</div>"
	);
};

/*
 * Make a flipbox roller container (outermost)
 *
 * @param {number} total Number of items
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCtr = function ( items ) {
	return $( "<div style='float: left; width: " + ( 100 / items ) + "%'>" );
};

/*
 * Make a flipbox roller container (middle) - usually a UL
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollPrt = function () {
	return $( "<ul class='list-group'>" );
};

/*
 * Make a flipbox element (innermost) - usually a LI
 *
 * @param {string} text
 * @param {string} cls
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxRollCld = function ( text, cls ) {
	return $(
		"<li class='list-group-item text-center list-group-item-" + cls + "'" +
		" style='padding: 10px 0;'>" +
		text +
		"</li>"
	);
};

/*
 * Make the flipbox lens
 *
 * @returns {object} jQuery Object
 */
JTSageDateBox.style_fboxLens = function () {
	return $(
		"<div style='margin: 0px 2px; box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); " +
		"border: 1px solid black; height: 50px;'>"
	);
};


/*
 * Position the flip elements.  Overrides the base function if it exists
 */
JTSageDateBox.style_fboxPos = function () {
	var fullRoller, firstItem, height_Roller, intended_Top,
		w                 = this,
		o                 = this.options,
		height_Outside    = w.d.intHTML.find( ".dbRollerV" ).outerHeight( true ),
		height_Container  = w.d.intHTML.find( ".dbRollerV" ).height(),
		theLens           = w.d.intHTML.find( ".dbLens" ).first(),
		height_Lens       = theLens.outerHeight();

	// Trap for run too early.
	if ( height_Container < 1 ) { return true; }

	// Lens top:
	// Negative Half the parent height is center.
	// Add Negative half the lens height.
	intended_Top = -1 * ( ( height_Outside / 2 ) + ( height_Lens / 2 ) );
	theLens.css( {
		top          : intended_Top,
		marginBottom : -1 * height_Lens
	} );

	w.d.intHTML.find( ".dbRoller" ).each( function() {
		fullRoller    = $(this);
		firstItem     = fullRoller.children().first();
		height_Roller = fullRoller.outerHeight(true);

		if ( firstItem.css( "marginTop" ) === "0px" ) {
			// Negative Half the height of the roller ( gets center to top border of view)
			// Add half of the view container height.
			intended_Top  = ( -1 * ( height_Roller / 2 ) ) + ( height_Container / 2 );

			if ( o.flipboxLensAdjust !== false ) { intended_Top += o.flipboxLensAdjust; }

			firstItem.css("margin-top", intended_Top);
		}
	});
};


