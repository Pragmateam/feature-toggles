const STATUS = require('./heartMonitorStatus');

class HeartMonitor {
  constructor(featureToggle) {
    this.featureToggle = featureToggle;
  }

  getStatus (dataIntervals) {
    const flatLine = this.isFlatLine(dataIntervals);

    return flatLine ? STATUS.STOPPED_BEATING : STATUS.HEART_BEATING;
  }

  isFlatLine (dataIntervals) {
    const allSignals = dataIntervals.map( (data) => data.signal );

    return allSignals.every( (signal) => signal === allSignals[0]);
  }
}

module.exports = HeartMonitor;
