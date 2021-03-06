import React from 'react'
import { observer } from 'mobx-react'
import Preloader from '../Preloader'
import ReactEcharts from 'echarts-for-react'
import BalanceStore from '../../stores/BalanceStore'

@observer
class BalancePie extends React.Component {
  render() {
    const {data} = this.props
    const {total} = data
    var balanceData = total ? BalanceStore['balanceHistoryTotal'] : BalanceStore['balanceHistoryStock']
    if (JSON.stringify(balanceData) === '[]') {
      return <Preloader />
    }
    var option = {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: balanceData.coins
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : balanceData.timestamps
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : balanceData.series
    }
    return (
      <ReactEcharts
        option={option}
        style={{width: '100%', height: '100%', position: 'absolute'}}
        className='react_for_echarts'
        theme={'light'}
      />
    )
  }
  componentDidMount() {
    if (this.props.data.total === true ) {
      BalanceStore.count('balanceHistoryTotal_counter', 1)
    } else {
      BalanceStore.count('balanceHistoryStock_counter', 1)
    }
  }
  componentWillUnmount() {
    if (this.props.data.total === true ) {
      BalanceStore.count('balanceHistoryTotal_counter', -1)
    } else {
      BalanceStore.count('balanceHistoryStock_counter', -1)
    }
  }
}

export default BalancePie
