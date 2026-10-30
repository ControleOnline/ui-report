import Formatter from '@controleonline/ui-common/src/utils/formatter';
import {
  digitsOnly,
  normalizeFlowId,
  shouldNavigateToFlowId,
  shouldLoadFlowById,
  resolveActiveFlow,
} from './flowchartNavigation';

export {
  digitsOnly,
  normalizeFlowId,
  shouldNavigateToFlowId,
  shouldLoadFlowById,
  resolveActiveFlow,
};

export const NEW_FLOW_ID = '__new-flowchart__';

export const DEFAULT_NEW_MERMAID = `flowchart TD
  start["Novo fluxo"] --> step["Edite o Mermaid"]
  step --> done["Salvar no tenant"]`;

export const repairText = value => Formatter.repairMojibake(value);

export const normalizeFlowchart = flow => {
  if (!flow) {
    return null;
  }

  return {
    ...flow,
    checkpoints: Array.isArray(flow.checkpoints)
      ? flow.checkpoints.map(checkpoint => repairText(checkpoint))
      : flow.checkpoints,
    summary: repairText(flow.summary),
    title: repairText(flow.title),
  };
};

export const buildFlowKey = title => {
  const slug = String(title || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${slug || 'fluxo'}-${Date.now()}`;
};

export const normalizeFlowcharts = flowcharts =>
  (Array.isArray(flowcharts) ? flowcharts : [])
    .filter(flow => flow && flow.enabled !== false)
    .map(normalizeFlowchart)
    .sort((a, b) => {
      const sortA = Number(a.sortOrder ?? a.sort_order ?? 0);
      const sortB = Number(b.sortOrder ?? b.sort_order ?? 0);

      if (sortA !== sortB) {
        return sortA - sortB;
      }

      return String(a.title || '').localeCompare(String(b.title || ''));
    });
