const expect = require('chai').expect;
const STATUS = require('../src/heartMonitorStatus');
const HeartMonitor = require('../src/heartMonitor');

describe('HeartMonitor', () => {
  const StoppedBeating = STATUS.STOPPED_BEATING;
  const HeartBeating = STATUS.HEART_BEATING;
  const featureToggle = { stopBeatingWhenSignalRemainsTheSame: true };

  const heartMonitor = new HeartMonitor(featureToggle);

  it('indicates that heart is beating', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 1 },
      { timestamp: '2017-03-16T06:30', signal: 0 },
      { timestamp: '2017-03-16T07:00', signal: 1 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(HeartBeating);
  });

  it('indicates that heart has stopped beating when all signals are zero', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 0 },
      { timestamp: '2017-03-16T06:30', signal: 0 },
      { timestamp: '2017-03-16T07:00', signal: 0 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(StoppedBeating);
  });

  it('indicates that heart has stopped beating when signal remains the same', () => {
    const dataIntervals = [
      { timestamp: '2017-03-16T06:00', signal: 1 },
      { timestamp: '2017-03-16T06:30', signal: 1 },
      { timestamp: '2017-03-16T07:00', signal: 1 },
    ];

    expect(heartMonitor.getStatus(dataIntervals)).to.eql(StoppedBeating);
  });

  describe('when toggle is OFF', () => {
    const featureToggle = { stopBeatingWhenSignalRemainsTheSame: false };
    const heartMonitor = new HeartMonitor(featureToggle);

    it('indicates that heart is beating when non zero signals remain the same', () => {
      const dataIntervals = [
        { timestamp: '2017-03-16T06:00', signal: 1 },
        { timestamp: '2017-03-16T06:30', signal: 1 },
        { timestamp: '2017-03-16T07:00', signal: 1 },
      ];

      expect(heartMonitor.getStatus(dataIntervals)).to.eql(HeartBeating);
    });
  });
});
