/* eslint-disable import/first */
import _ from 'lodash'
import React from "react"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ClearIcon from '@material-ui/icons/Clear'
import SettingsIcon from '@material-ui/icons/Settings'
import { observer } from 'mobx-react'
import RGL, { WidthProvider } from 'react-grid-layout'
const GridLayout = WidthProvider(RGL)

import DashboardsStore from './stores/DashboardsStore'
import DrawersStore from './stores/DrawersStore'


@observer
class Grid extends React.Component {
  onLayoutChange(layout) {
    DashboardsStore.setLayout(layout)
  }

  render() {
    return (
      <GridLayout
        className="layout"
        cols={24}
        rowHeight={12}
        layout={DashboardsStore.widgets}
        onLayoutChange={(layout) => {
            this.onLayoutChange(layout)
            setTimeout(function() {
              window.dispatchEvent(new Event('resize'))
            }, 200)
          }
        }
        draggableCancel="input,textarea"
        draggableHandle=".widget-header"
      >
        {
          JSON.stringify(DashboardsStore.dashboardActiveId) !== 'false' &&
          _.map(DashboardsStore.dashboards[DashboardsStore.dashboardActiveId].widgets, (widget) => {
            const Component = require("./"+widget.component).default
            var customHeader = false
            if (widget.customHeader !== '') {
              customHeader = widget.customHeader
            }
            var dashboardId = DashboardsStore.dashboardActiveId
            var widgetId = widget.i
            var noteId = _.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).data.noteId
            return (
              <div key={widget.uid} data-grid={{ w: widget.w, h: widget.h, x: widget.x, y: widget.y, minW: widget.minW, minH:  widget.minH }}>
                <div className={`widget widget-${widget.name}`}>
                  <div className="widget-header">
                    <span>{ customHeader || widget.header}</span>
                    <div>
                      <SettingsIcon style={{ fontSize: 18 }} onClick={this.drawerRightToggle.bind(
                        this,
                        widget.settings,
                        widget.settingsWidth,
                        {
                          dashboardId: dashboardId,
                          widgetId: widgetId,
                          noteId: noteId
                        },
                        DashboardsStore.dashboardActiveId,
                        widget.i
                      )} className="pointer"/>
                      <ClearIcon style={{ fontSize: 18 }} onClick={this.removeWidget.bind(this, widget.i)} className="pointer"/>
                    </div>
                  </div>
                  <div className="widget-body">
                    {
                      React.createElement(Component, {'data': {...widget.data, dashboardId: DashboardsStore.dashboardActiveId, widgetId: widget.i} })
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </GridLayout>
      // HELPER FOR SCREENSHOTS
      // <div>
      //   {
      //     _.map(DashboardsStore.widgetsMarket, (widget) => {
      //       const Component = require("./"+widget.component).default
      //       return (
      //         <div className="widget" key={widget.id} style={{height: '266px', width: '520px', margin: '10px', overflow: 'hidden'}}>
      //           { React.createElement(Component, {data: widget.data}) }
      //         </div>
      //       )
      //     })
      //   }
      // </div>
    )
  }
  drawerRightToggle(component, width, data, dashboardId, widgetId) {
    // if (DrawersStore.drawerRightComponent === component && (DrawersStore.drawerRightDashboardId !== dashboardId || DrawersStore.drawerRightWidgetId !== widgetId) ) {
    //   // current component
    //   DrawersStore.drawerRightToggle()
    // } else {
    //   // new component
    //   if (DrawersStore.drawerRightOpen === false) DrawersStore.drawerRightToggle()
    //   DrawersStore.drawerRightSet(component, width, data, dashboardId, widgetId)
    // }
    DrawersStore.drawerRightSet(component, width, data, dashboardId, widgetId)
    DrawersStore.drawerRightToggle()
  }
  // widgetSettings(settings, settingsWidth) {
  //   DrawersStore.drawerRightSet(settings, settingsWidth)
  // }
  removeWidget(id) {
    DashboardsStore.removeWidget(id)
  }
}
export default Grid
