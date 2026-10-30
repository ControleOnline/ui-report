/**
 * Pure navigation decisions for FlowchartsPage single-click sidebar (task-367).
 * Route drives load; sidebar only navigates + optimistic active highlight.
 */

export const digitsOnly = value => String(value || '').replace(/\D+/g, '');

export const normalizeFlowId = flow =>
  String(flow?.id || flow?.flowKey || flow?.flow_key || '');

export const shouldNavigateToFlowId = (targetFlowId, routeFlowId) => {
  const target = digitsOnly(targetFlowId);
  const current = digitsOnly(routeFlowId);
  return Boolean(target && target !== current);
};

export const shouldLoadFlowById = ({
  targetFlowId,
  loadingFlowId,
  loadedFlowId,
  activeFlowId,
}) => {
  const target = digitsOnly(targetFlowId);
  if (!target) {
    return false;
  }
  if (digitsOnly(loadingFlowId) === target) {
    return false;
  }
  if (
    digitsOnly(loadedFlowId) === target &&
    digitsOnly(activeFlowId) === target
  ) {
    return false;
  }
  return true;
};

export const resolveActiveFlow = ({
  isCreatingFlow,
  activeFlowId,
  loadedFlow,
  flowcharts,
}) => {
  if (isCreatingFlow) {
    return null;
  }
  const loadedFlowId = normalizeFlowId(loadedFlow);
  if (activeFlowId && loadedFlowId === activeFlowId) {
    return loadedFlow;
  }
  return (
    (Array.isArray(flowcharts) ? flowcharts : []).find(
      flow => normalizeFlowId(flow) === activeFlowId,
    ) ||
    (Array.isArray(flowcharts) ? flowcharts[0] : null) ||
    null
  );
};
