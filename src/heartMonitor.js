const STATUS = require('./heartMonitorStatus');

class HeartMonitor {
  getStatus (dataIntervals) {
    const allSignals = dataIntervals.map( (data) => data.signal );
    const flatLine = allSignals.every( (signal) => signal === 0 );

    return flatLine ? STATUS.STOPPED_BEATING : STATUS.HEART_BEATING;
  }
}

module.exports = HeartMonitor;
