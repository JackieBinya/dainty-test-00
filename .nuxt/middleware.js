const middleware = {}

middleware['menu'] = require('../middleware/menu.js')
middleware['menu'] = middleware['menu'].default || middleware['menu']

middleware['pricingOverlay'] = require('../middleware/pricingOverlay.js')
middleware['pricingOverlay'] = middleware['pricingOverlay'].default || middleware['pricingOverlay']

export default middleware
