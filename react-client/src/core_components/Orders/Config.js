module.exports = [
  {
    name: 'orders',
    component: 'core_components/Orders/Orders.js',
    settings: 'core_components/Orders/Settings.js',
    settingsWidth: '300px',
    img: 'core_components/Orders/Orders.png',
    header: 'Orders asks',
    customHeader: '',
    description: 'People want to sell coins',
    author: '#core',
    authorLink: 'https://github.com/kupi-network/kupi-terminal',
    source: 'https://github.com/kupi-network/kupi-terminal/blob/master/react-client/src/core_components/Orders/Orders.js',
    data: {type: 'asks'}
  },
  {
    name: 'orders',
    component: 'core_components/Orders/Orders.js',
    settings: 'core_components/Orders/Settings.js',
    settingsWidth: '300px',
    img: 'core_components/Orders/Orders.png',
    header: 'Orders bids',
    customHeader: '',
    description: 'People want to buy coins',
    author: '#core',
    authorLink: 'https://github.com/kupi-network/kupi-terminal',
    source: 'https://github.com/kupi-network/kupi-terminal/blob/master/react-client/src/core_components/Orders/Orders.js',
    data: {type: 'bids'}
  }
]
