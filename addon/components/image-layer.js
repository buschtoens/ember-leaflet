import BaseLayer from 'ember-leaflet/components/base-layer';

export default BaseLayer.extend({

  leafletRequiredOptions: [
    'imageUrl', 'bounds'
  ],

  leafletOptions: [
    'attribution', 'opacity'
  ],

  leafletProperties: [
    'url', 'opacity'
  ],

  _bounds: null,

  createLayer() {
    return this.L.imageOverlay(...this.get('requiredOptions'), this.get('options'));
  },

  didReceiveAttrs() {
    this._super(...arguments);

    // if the bounds changed, remove this layer and insert it again
    const oldBounds = this.get('_bounds');
    const newBounds = this.get('bounds');
    this.set('_bounds', newBounds);
    if (oldBounds && oldBounds !== newBounds) {
      this.willDestroyParent();
      this.notifyPropertyChange('requiredOptions');
      this.didInsertParent();
    }
  }
});
