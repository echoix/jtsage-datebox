 /**
     * JTSage-DateBox
     * @fileOverview Bulma Themes and StyleFunctions
     * This file supports: datebox, flipbox, slidebox, calbox.
     *
     * This framework requires use of [id]-dbAttach ID's. (hella-nest)
     * 
     * @author J.T.Sage <jtsage+datebox@gmail.com>
     * @author {@link https://github.com/jtsage/jtsage-datebox/contributors|GitHub Contributors}
     * @license {@link https://github.com/jtsage/jtsage-datebox/blob/master/LICENSE.txt|MIT}
     * @version 5.0.0
     *
     */

mergeOpts({
	theme_clearBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_clearBtnIcn : "clear",

	theme_closeBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_closeBtnIcn : "check",

	theme_cancelBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_cancelBtnIcn : "cancel",

	theme_tomorrowBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_tomorrowBtnIcn : "goto",

	theme_todayBtnCls : "is-fullwidth is-marginless is-secondary",
	theme_todayBtnIcn : "goto",

	theme_dropdownContainer : "card",
	theme_modalContainer : "card",
	theme_inlineContainer : "card",

	theme_headerTheme : "is-dark",
	theme_headerBtnCls : "is-light",
	theme_headerBtnIcn : "cancel",

	theme_cal_Today       : "is-info",
	theme_cal_DayHigh     : "is-warning",
	theme_cal_Selected    : "is-success",
	theme_cal_DateHigh    : "is-warning",
	theme_cal_DateHighAlt : "is-danger",
	theme_cal_DateHighRec : "is-warning",
	theme_cal_Default     : "is-outlined is-primary",
	theme_cal_OutOfBounds : "is-white",

	theme_cal_NextBtnIcn : "next",
	theme_cal_NextBtnCls : "outline-dark",
	theme_cal_PrevBtnIcn : "prev",
	theme_cal_PrevBtnCls : "outline-dark",

	theme_dbox_NextBtnIcn : "plus",
	theme_dbox_NextBtnCls : "is-outlined is-dark",
	theme_dbox_PrevBtnIcn : "minus",
	theme_dbox_PrevBtnCls : "is-outlined is-dark",

	theme_fbox_Selected   : "success",
	theme_fbox_Default    : "light",
	theme_fbox_Forbidden  : "danger",
	theme_fbox_RollHeight : "135px",

	theme_slide_Today       : "outline-info",
	theme_slide_DayHigh     : "outline-warning",
	theme_slide_Selected    : "outline-success",
	theme_slide_DateHigh    : "outline-warning",
	theme_slide_DateHighAlt : "outline-danger",
	theme_slide_DateHighRec : "outline-warning",
	theme_slide_Default     : "outline-primary",

	theme_slide_NextBtnIcn     : "plus",
	theme_slide_NextBtnCls     : "outline-dark border-0",
	theme_slide_PrevBtnIcn     : "minus",
	theme_slide_PrevBtnCls     : "outline-dark border-0",
	theme_slide_NextDateBtnIcn : "next",
	theme_slide_NextDateBtnCls : "outline-dark border-0",
	theme_slide_PrevDateBtnIcn : "prev",
	theme_slide_PrevDateBtnCls : "outline-dark border-0",

	theme_backgroundMask : {
		position: "fixed",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,.4)"
	},
	theme_headStyle : false,
	theme_spanStyle : false,

	buttonIconDate: "calendar",
	buttonIconTime: "clock",

	disabledState  : "disabled",

	clickEvent: "click",
	tranDone: "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend"
});

JTSageDateBox.baseMode = "bootstrap4";

JTSageDateBox.styleFunctions = {
	/*
	 * Make a button
	 */
	button                : function( themeClass, icon, contents ) {
		var retty;

		retty  = "<a href='#' role='button' class='button " + themeClass + "'>";
		retty += ( icon !== false ) ? "<span>" + this.icons.getIcon(icon) + "</span> " : "";
		retty += contents + "</a>";

		return retty;
	},

	/*
	 * Make a button group
	 * Collapse not available for this framework
	 */
	buttonGroup           : function ( ) {
		return $(
			"<div class='buttons is-fullwidth' style='padding: .3em;'>"
		);
	},

	/*
	 * Wrap the original input in a div so we can add a button to it
	 */
	baseInputWrap         : function ( originalInput ) { 
		originalInput.closest( ".field" ).addClass( "has-addons" );
		originalInput.closest( ".control" ).addClass( "is-expanded" );
		return originalInput.closest( ".field" );
	},

	/*
	 * Create the open button that is added to the input
	 */
	baseInputButton       : function ( icon, title ) {
		return "<div class=\"control\"><a title=\"" + title + "\" class=\"button is-primary\">" +
			this.icons.getIcon( icon ) + "</a></div>";
	},

	/*
	 * When not using the open button, we may need to alter the wrap class differently
	 */
	baseInputNoButton     : function (  ) {
		return true;
	},

	/*
	 * Run when the input is focused
	 */
	focusInput            : function (  ) {
		return true;
	},

	/*
	 * Run when the input is un-focused
	 */
	blurInput             : function (  ) {
		return true;
	},

	/*
	 * Make the header for every mode
	 */
	widgetHeader          : function ( text, themeBar, themeIcon, icon ) {
		return "" +
			"<div class=\"navbar " + themeBar + "\"><div class=\"navbar-brand\">" +
			"<strong class=\"navbar-item\">" + text + "</strong>" +
			"</div><div class=\"is-active navbar-menu\">" +
			"<div class=\"navbar-end\"><div class=\"navbar-item\">" +
			this.styleFunctions.button.apply( this, [ themeIcon + " dbCloser", icon, "" ] ) +
			"</div></div></div></div>";
	},


	/*
	 * Make an internal header ( datebox & flipbox )
	 */
	intHeader             : function ( text ) {
		return $(
			"<div class='is-size-5 has-text-centered dbHeader' style='padding: .3em 0'>" +
			text +
			"</div>"
		);
	},

	/*
	 * Make the header for calbox (month, year, prev/next buttons)
	 */
	calHeader             : function ( txt, firstBtnIcn, firstBtnCls, secondBtnIcn, secondBtnCls ) {
		var returnVal = $("<div class='columns is-vcentered' style='padding:.3em'>");

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [ 
				firstBtnCls + " is-fullwidth dbCalPrev",
				firstBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		$("<div class='column'><div class='title is-5 has-text-centered'>" + txt + "</div></div>")
			.appendTo( returnVal );

		$("<div class='column is-2'>").append(
			$( this.styleFunctions.button.apply( this, [
				secondBtnCls + " is-fullwidth dbCalNext",
				secondBtnIcn,
				""
			] ) )
		).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the calbox grid container.  Probably a table
	 */
	calGrid               : function () {
		return $(
			"<div style='padding:.3em'><table class='dbCalGrid' style='width:100%'></table></div>"
		);
	},

	/*
	 * Create a calbox grid row.  Probably a tr
	 */
	calRow                : function () {
		return $( "<tr>" );
	},

	/*
	 * Create a clickable box for each grid item in calbox.
	 */
	calButton             : function ( data, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls = "class='dbEvent is-fullwidth button " + 
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='has-text-centered'" + style + ">" +
			"<a href='#' style='padding-left:0; padding-right:0;' " + cls + " " + disable + ">" + 
			data.displayText + 
			"</a>" + "</td>");
	},

	/*
	 * Create a non-button calbox grid box
	 */
	calNonButton          : function ( text, header, totalElements ) {
		var style = ( totalElements !== undefined ?
				" style='width: " + ( 100 / totalElements ) + "%'" :
				""
			),
			cls = ( header ) ? " has-text-weight-bold" : "";

		return $("<td class='has-text-centered" + cls + "'" + style + ">" + text + "</td>");
	},

	/*
	 * Create the year and month picker for calbox.
	 */
	calPickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='columns is-gapless' style='padding:.3em'>";

		returnVal += "<div class='column is-8'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.month, "dbCalPickMonth", "" );
  		returnVal += "</div></div>";

		returnVal += "<div class='column is-4'><div class='select is-fullwidth'>";
		returnVal += this._stdSel( ranges.year, "dbCalPickYear", "" );
  		returnVal += "</div></div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the calendar drop down quick pick list.
	 */
	calDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='select is-fullwidth' ";
		returnVal += "style='margin:.8em 0; padding:0 .3em;'>";
		returnVal += this._stdSel( list, "dbCalPickList", "" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the datebox mode container.
	 */
	dboxContainer         : function () {
		return $("<div>");
	},

	/*
	 * Make the datebox control row
	 */
	dboxRow               : function () {
		return $(
			"<div class='columns is-gapless' " +
			"style='padding-left:.3em; padding-right: .3em; margin-bottom: .3em' >"
		);
	},

	/*
	 * Make a datebox +/-/input control
	 */
	dboxControl           : function ( prevIcn, prevCls, nextIcn, nextCls, mainCls, label ) {
		var returnVal = "";

		returnVal += "<div class='column dbBox" + mainCls + "'>";

		returnVal += this.styleFunctions.button.apply( this, [
			nextCls + " dbBoxNext is-fullwidth" ,
			nextIcn,
			""
		] );

		if ( label !== null ) {
			returnVal += "<div class='w-100 form-control rounded-0 p-0 text-center' " +
				"style='height:auto'>" + label + "</div>";
		}
		returnVal += "<input style='padding-left:0;padding-right:0' type='text' ";
		returnVal += "class='input has-text-centered'>";

		returnVal += this.styleFunctions.button.apply( this, [
			prevCls + " dbBoxPrev is-fullwidth" ,
			prevIcn,
			""
		] );

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the container for the flipbox
	 *
	 * @param {number} size Height CSS property
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxContainer         : function ( size ) {
		return $(
			"<div class='d-flex border-top border-bottom m-2' style='height: " + 
			size + 
			"; overflow: hidden'>"
		);
	},

	/*
	 * Make a container for flipbox labels
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxDurLabels         : function ( ) {
		return $(
			"<div class='d-flex mx-2 mt-2' style='margin-bottom: -8px;'>"
		);
	},

	/*
	 * Make a flibox label
	 *
	 * @param {string} text Text of the label
	 * @param {number} items Total number of items
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxDurLabel          : function ( text, items ) {
		return $( 
			"<div class='text-center' style='width: " + ( 100 / items ) + "%'>" + 
			text + 
			"</div>"
		);
	},

	/*
	 * Make a flipbox roller container (outermost)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxRollerContain     : function () {
		return $( "<div class='flex-fill'>" );
	},

	/*
	 * Make a flipbox roller container (middle) - usually a UL
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */	
	fboxRollerParent      : function () {
		return $( "<ul class='list-group'>" );
	},

	/*
	 * Make a flipbox element (innermost) - usually a LI
	 *
	 * @param {string} text
	 * @param {string} cls
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxRollerChild       : function ( text, cls ) {
		return $( 
			"<li class='list-group-item p-1 text-center list-group-item-" + cls + "'>" + 
			text + 
			"</li>"
		);
	},

	/*
	 * Make the flipbox lens
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	fboxLens              : function () {
		return $( "<div class='p-4 border border-dark shadow mx-1'>" );
	},

	/*
	 * Make the header for slidebox
	 * 
	 * Previous button MUST have "dbSlidePrev" class
	 * Next button MUST have "sbSlideNext" class
	 *
	 * @param {string} txt Text of header
	 * @param {string} prevBtnIcn Previous button icon ( name or SVG )
	 * @param {string} prevBtnCls Previous button theme class
	 * @param {string} nextBtnIcn Next button icon ( name or SVG )
	 * @param {string} nextBtnCls Nevt button theme class
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideHeader           : function ( txt, prevBtnIcn, prevBtnCls, nextBtnIcn, nextBtnCls ) {
		var returnVal = $("<div class='my-2 text-center d-flex justify-content-between'>");

		$( this.styleFunctions.button.apply( this, [
			prevBtnCls + " mx-2 dbSlidePrev",
			prevBtnIcn,
			""
		] ) ).appendTo( returnVal );

		$("<h5>" + txt + "</h5>").appendTo( returnVal );

		$( this.styleFunctions.button.apply( this, [ 
			nextBtnCls + " mx-2 dbSlideNext",
			nextBtnIcn,
			""
		] ) ).appendTo( returnVal );

		return returnVal;
	},

	/*
	 * Create the year and month picker for slide.
	 * 
	 * Month picker MUST have the "dbSlidePickMonth" class
	 * Year picker MUST have the "dbSlidePickYear" class 
	 *
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}.
	 * 
	 * @param  {object} ranges Year and Month arrays
	 * @param {array} ranges.year Containing arrays of [ value, text, selected (boolean) ]
	 * @param {array} ranges.month Containing arrays of [ value, text, selected (boolean) ]
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slidePickers            : function ( ranges ) {
		var returnVal = "";

		returnVal += "<div class='row my-2 mx-1'>";

		returnVal += "<div class='col-sm-8 p-0 m-0'>";
		returnVal += this._stdSel( ranges.month, "dbSlidePickMonth", "form-control" );
  		returnVal += "</div>";

		returnVal += "<div class='col-sm-4 p-0 m-0'>";
		returnVal += this._stdSel( ranges.year, "dbSlidePickYear", "form-control" );
  		returnVal += "</div>";

		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the slidebox drop down quick pick list.
	 * 
	 * Consider using {@link JTSageDateBox.html#._stdSel__anchor|_stdSel()}
	 *
	 * @param {string} listLabel Label for the list
	 * @param {array} list Containing arrays of [ value, text, selected (boolean) ]
	 * @return {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideDateList           : function ( listLabel, list ) {
		var returnVal = "";

		list.unshift([false, listLabel, true]);

		returnVal += "<div class='row my-2 mx-1'>";
		returnVal += this._stdSel( list, "dbSlidePickList", "form-control" );
		returnVal += "</div>";

		return $(returnVal);
	},

	/*
	 * Make the grid container for slidebox (usually a table)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideGrid               : function () {
		return $( "<div class='w-100 py-1'><table class='dbSlideGrid w-100'></table></div>" );
	},

	/*
	 * Make the grid for for slidebox (usually a TR)
	 *
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideRow                : function () {
		return $( "<tr>" );
	},

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
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox.styleFunctions
	 */
	slideDateButton         : function ( data ) {
		var style   = " style='width: " + ( ( 100 / 8 ) ) + "%'",
			disable = ( data.bad ? "disabled='disabled'" : ""),
			cls     = "class='dbEventS w-100 rounded-circle btn-sm btn btn-" +
				data.theme + ( data.bad ? " disabled":"" ) + "'";

		return $("<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + " " + disable + ">" + 
			"<small>" + this.__( "daysOfWeekShort")[data.dateObj.getDay()] +
			"</small><br>" + data.dateObj.getDate() +  
			"</a>" + "</td>");
	},

	/*
	 * Create next/prev week buttons for slidebox
	 *
	 * @param {string} eventCls The event class.  Should be placed on the button
	 * @param {string} icon Icon to use for button ( name or SVG )
	 * @param {string} theme Theme class for button
	 * @returns {object} jQuery Object
	 * @memberof JTSageDateBox.styleFunctions
	 * @this JTSageDateBox
	 */
	slideMoveButton         : function ( eventCls, icon, theme ) {
		var style = " style='width: " + ( ( 100 / 8 ) / 2 ) + "%'",
			cls   = "class='w-100 p-1 rounded-circle btn-sm btn btn-" +
				theme + " " + eventCls + "'";

		return $(
			"<td class='m-0 p-0 text-center'" + style + ">" +
			"<a href='#' " + cls + ">" + 
			this.icons.getIcon( icon )  + "</a></td>"
		);
	},
};