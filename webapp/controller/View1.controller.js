sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	// 'sap/suite/ui/commons/TimelineFilterType'
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("chngdoc.dev.controller.View1", {
			onInit: function () {
				var oModel = this.getView().getModel();
				// oModel.attachRequestCompleted(this.convertData);
	            
				this._timeline = this.byId("idTimeline");
				var oItem = new sap.suite.ui.commons.TimelineItem({ 
				    dateTime: "{dat_tim}",
					title: "{objectid}",
					userNameClickable: true,
					text: "{comments}",
					userName: "{name}",
					filterValue: "{objectid}",
					icon: "sap-icon://account" });
			    // var oAgg = sap.ui.base.ManagedObject.AggregationBindingInfo(
				// 	{
				// 		path: "/Y_C_CHANGEDOCUMENTS",
				// 		template: oItem
				// 	}
				// );
				this._timeline.bindAggregation("content", "/Y_C_CHANGEDOCUMENTS", oModel, oItem
				);
				// this._initBindingEventHandler();
			},

			// convertData: function(oEvent){
			// 	// var oModel = oEvent.getSource();
			// 	var oData = JSON.parse(oEvent.getParameter("response").responseText);
			// 	if(oData.d){
			// 		oData.d.results.forEach(function (oDocData) {
			// 		oDocData.fname = ( oDocData.fname + " is changed" )
			// 	});
			// 	// oEvent.updateBindings(true);
			// 	oEvent.getParameter("response").responseText = JSON.stringify(oData);
			// 	oEvent.getSource().refresh;
			// }
			// }

			_initBindingEventHandler: function() {
				var oBinding = this._timeline.getBinding("content");
				this._timeline.setNoDataText("Loading");
	
				oBinding.attachDataReceived(function() {
					this._timeline.setNoDataText("No data found");
				}, this);
	
				// this._timeline.attachFilterSelectionChange(function(oEvent) {
				// 	var sType = oEvent.getParameter("type"),
				// 		bClear = oEvent.getParameter("clear");
	
				// 	if (bClear) {
				// 		this.byId("idTableSelector").setSelectedKey("All");
				// 		return;
				// 	}
	
				// 	if (sType === TimelineFilterType.Search) {
				// 		this._search(oEvent);
				// 	}
				// 	if (sType === TimelineFilterType.Data) {
				// 		this._dataFilter(oEvent);
				// 	}
				// 	if (sType === TimelineFilterType.Time) {
				// 		this._timeFilter(oEvent);
				// 	}
				// }, this);
			},
	
			tableChanged: function(oEvent) {
				var sSelectedItem = oEvent.getParameter("selectedItem").getKey();
				if (sSelectedItem === "ALL") {
					// clear table filter
					this._timeline.setCustomFilterMessage("");
					this._timeline.setCustomModelFilter("tabname", null);
				} else {
					this._timeline.setCustomFilterMessage("tabname (" + sSelectedItem + ")");
					this._timeline.setCustomModelFilter("tabnameFilter", new Filter({
						path: "tabname",
						value1: sSelectedItem,
						operator: FilterOperator.EQ
					}));
				}
			},
		});
	});
