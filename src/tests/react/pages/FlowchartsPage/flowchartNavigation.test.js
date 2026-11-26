/* global describe, expect, it */

const {
  digitsOnly,
  normalizeFlowId,
  shouldNavigateToFlowId,
  shouldLoadFlowById,
  resolveActiveFlow,
} = require('../../../../react/pages/FlowchartsPage/flowchartNavigation');

describe('flowchartNavigation (task-367 single-click)', () => {
  it('digitsOnly strips non-digits', () => {
    expect(digitsOnly('/flowcharts/12')).toBe('12');
    expect(digitsOnly('5')).toBe('5');
    expect(digitsOnly(null)).toBe('');
  });

  it('normalizeFlowId prefers id then flowKey', () => {
    expect(normalizeFlowId({id: 7})).toBe('7');
    expect(normalizeFlowId({flowKey: 'abc'})).toBe('abc');
    expect(normalizeFlowId({flow_key: 'x'})).toBe('x');
  });

  it('shouldNavigateToFlowId is true only when target differs from route', () => {
    expect(shouldNavigateToFlowId(5, 1)).toBe(true);
    expect(shouldNavigateToFlowId('5', '1')).toBe(true);
    expect(shouldNavigateToFlowId(1, 1)).toBe(false);
    expect(shouldNavigateToFlowId('', 1)).toBe(false);
    expect(shouldNavigateToFlowId(5, '')).toBe(true);
  });

  it('single-click from route 1 to 5 requires navigate then load', () => {
    expect(shouldNavigateToFlowId(5, 1)).toBe(true);
    expect(
      shouldLoadFlowById({
        targetFlowId: 5,
        loadingFlowId: '',
        loadedFlowId: 1,
        activeFlowId: 5,
      }),
    ).toBe(true);
  });

  it('shouldLoadFlowById skips redundant get for same loaded+active id', () => {
    expect(
      shouldLoadFlowById({
        targetFlowId: 5,
        loadingFlowId: '',
        loadedFlowId: 5,
        activeFlowId: 5,
      }),
    ).toBe(false);
  });

  it('shouldLoadFlowById skips while the same id is already loading', () => {
    expect(
      shouldLoadFlowById({
        targetFlowId: 5,
        loadingFlowId: 5,
        loadedFlowId: 1,
        activeFlowId: 5,
      }),
    ).toBe(false);
  });

  it('resolveActiveFlow prefers list item by activeFlowId before load finishes', () => {
    const flows = [
      {id: 1, title: 'A'},
      {id: 5, title: 'B'},
    ];
    const active = resolveActiveFlow({
      isCreatingFlow: false,
      activeFlowId: '5',
      loadedFlow: {id: 1, title: 'A'},
      flowcharts: flows,
    });
    expect(normalizeFlowId(active)).toBe('5');
    expect(active.title).toBe('B');
  });

  it('resolveActiveFlow returns null while creating', () => {
    expect(
      resolveActiveFlow({
        isCreatingFlow: true,
        activeFlowId: '1',
        loadedFlow: {id: 1},
        flowcharts: [{id: 1}],
      }),
    ).toBeNull();
  });
});
