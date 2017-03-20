const STATUS = require('./heartMonitorStatus');

const isFlatLine = (dataIntervals) => {
  const allSignals = dataIntervals.map( (data) => data.signal );

  return allSignals.every( (signal) => signal === allSignals[0]);
}

class HeartMonitor {
  getStatus (dataIntervals) {
    return isFlatLine(dataIntervals) ?
      STATUS.STOPPED_BEATING : STATUS.HEART_BEATING;
  }
}

module.exports = HeartMonitor;
