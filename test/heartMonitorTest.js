const expect = require('chai').expect;
const STATUS = require('../src/heartMonitorStatus');
const HeartMonitor = require('../src/heartMonitor');

describe('HeartMonitor', () => {
  const StoppedBeating = STATUS.STOPPED_BEATING;
  const HeartBeating = STATUS.HEART_BEATING;

  const heartMonitor = new HeartMonitor();

  it('should indicate the heart is beating when the signal values change', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 1 },
      { timestamp: '2017-03-16T06:30', signal: 0 },
      { timestamp: '2017-03-16T07:00', signal: 1 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(HeartBeating);
  });

  it('should indicate the heart has stopped beating when all signals are zero', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 0 },
      { timestamp: '2017-03-16T06:30', signal: 0 },
      { timestamp: '2017-03-16T07:00', signal: 0 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(StoppedBeating);
  });

  it('should indicate the heart has stopped beating when the signal values are the same', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 1 },
      { timestamp: '2017-03-16T06:30', signal: 1 },
      { timestamp: '2017-03-16T07:00', signal: 1 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(StoppedBeating);
  });
});
