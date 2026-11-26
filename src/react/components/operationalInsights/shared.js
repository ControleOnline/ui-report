import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {withOpacity} from '@controleonline/ui-layout/src/styles/branding';
import Formatter from '@controleonline/ui-common/src/utils/formatter';

const DEFAULT_ACCENT = '#0EA5E9';
const DEFAULT_SURFACE = '#FFFFFF';
const DEFAULT_PANEL = '#F8FAFC';
const DEFAULT_BORDER = '#CBD5E1';
const DEFAULT_TEXT = '#0F172A';
const DEFAULT_TEXT_SECONDARY = '#475569';

export const normalizeText = value => String(value ?? '').trim();

export const normalizeNumber = value => {
  const numericValue = Number(value ?? 0);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

export const formatInteger = value =>
  Formatter.formatInteger(normalizeNumber(value));

export const formatDecimal = value =>
  Formatter.formatDecimal(normalizeNumber(value));

export const formatPercent = value => Formatter.formatPercent(normalizeNumber(value));

export const formatSignedInteger = value => {
  const normalized = normalizeNumber(value);

  return Formatter.formatSignedInteger(normalized);
};

export const formatSignedPercent = value => {
  const normalized = normalizeNumber(value);

  return Formatter.formatSignedPercent(normalized);
};

export const resolveAccentColor = (ppcColors = {}, accentColor = '') =>
  normalizeText(accentColor) ||
  normalizeText(ppcColors?.accentInfo) ||
  DEFAULT_ACCENT;

export const resolveProgressColor = (
  accentColor,
  index = 0,
  total = 1,
) => {
  const accent = resolveAccentColor({}, accentColor);

  if (total <= 1) {
    return accent;
  }

  const ratio = index / Math.max(total - 1, 1);
  const opacity = 0.34 + ratio * 0.66;
  return withOpacity(accent, opacity);
};

export const createOperationalInsightsStyles = (
  ppcColors = {},
  accentColor = '',
) => {
  const accent = resolveAccentColor(ppcColors, accentColor);

  return StyleSheet.create({
    card: {
      borderRadius: 22,
      borderWidth: 1,
      borderColor: withOpacity(
        normalizeText(ppcColors?.borderSoft || DEFAULT_BORDER),
        0.9,
      ),
      backgroundColor: withOpacity(
        normalizeText(ppcColors?.cardBg || DEFAULT_SURFACE),
        0.98,
      ),
      paddingHorizontal: 14,
      paddingVertical: 14,
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.14,
      shadowRadius: 18,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
    },
    headerIdentity: {
      flex: 1,
      minWidth: 0,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconWrap: {
      width: 38,
      height: 38,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      backgroundColor: withOpacity(accent, 0.1),
      borderColor: withOpacity(accent, 0.3),
    },
    titleWrap: {
      flex: 1,
      minWidth: 0,
    },
    title: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 17,
      lineHeight: 21,
      fontWeight: '900',
    },
    subtitle: {
      marginTop: 2,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '700',
    },
    headerRight: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    body: {
      marginTop: 12,
    },
    footer: {
      marginTop: 10,
    },
    loadingRow: {
      minHeight: 50,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    loadingText: {
      flex: 1,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '700',
    },
    emptyText: {
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '700',
      fontStyle: 'italic',
    },
    statGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    statTile: {
      flexGrow: 1,
      flexBasis: '48%',
      minHeight: 72,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: withOpacity(accent, 0.18),
      backgroundColor: withOpacity(accent, 0.06),
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    statValue: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 24,
      lineHeight: 28,
      fontWeight: '900',
    },
    statLabel: {
      marginTop: 2,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    statHint: {
      marginTop: 6,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
    },
    list: {
      gap: 10,
    },
    listRow: {
      gap: 6,
    },
    listHeaderRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10,
    },
    listLabelWrap: {
      flex: 1,
      minWidth: 0,
    },
    listLabel: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 13,
      lineHeight: 17,
      fontWeight: '900',
    },
    listMeta: {
      marginTop: 1,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    listValue: {
      color: accent,
      fontSize: 16,
      lineHeight: 18,
      fontWeight: '900',
      textAlign: 'right',
    },
    track: {
      height: 8,
      borderRadius: 999,
      backgroundColor: withOpacity(
        normalizeText(ppcColors?.border || DEFAULT_BORDER),
        0.42,
      ),
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: 999,
      backgroundColor: accent,
    },
    trendShell: {
      marginHorizontal: -2,
    },
    trendContent: {
      paddingHorizontal: 2,
      gap: 8,
    },
    trendColumn: {
      width: 54,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
    },
    trendColumnValue: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '900',
    },
    trendColumnTrack: {
      width: '100%',
      height: 118,
      borderRadius: 16,
      backgroundColor: withOpacity(
        normalizeText(ppcColors?.border || DEFAULT_BORDER),
        0.28,
      ),
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    trendColumnFill: {
      width: '100%',
      minHeight: 8,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      backgroundColor: accent,
    },
    trendColumnLabel: {
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '800',
      textAlign: 'center',
    },
    bucketGrid: {
      flexDirection: 'row',
      gap: 8,
    },
    bucketTile: {
      flex: 1,
      minWidth: 0,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: withOpacity(
        normalizeText(ppcColors?.border || DEFAULT_BORDER),
        0.78,
      ),
      backgroundColor: normalizeText(ppcColors?.panelBg || DEFAULT_PANEL),
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    bucketLabel: {
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    bucketValue: {
      marginTop: 2,
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 18,
      lineHeight: 20,
      fontWeight: '900',
    },
    bucketMeta: {
      marginTop: 4,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
    },
  });
};

export const MetricTile = ({
  ppcColors = {},
  accentColor = '',
  label,
  value,
  hint = '',
  formatValue = formatInteger,
}) => {
  const styles = useMemo(
    () => createOperationalInsightsStyles(ppcColors, accentColor),
    [accentColor, ppcColors],
  );

  return (
    <View style={styles.statTile}>
      <Text style={styles.statValue}>{formatValue(value)}</Text>
      <Text style={styles.statLabel}>{normalizeText(label)}</Text>
      {normalizeText(hint) ? <Text style={styles.statHint}>{hint}</Text> : null}
    </View>
  );
};

export const ReportCardShell = ({
  ppcColors = {},
  accentColor = '',
  title = '',
  subtitle = '',
  iconName = 'chart-box-outline',
  loading = false,
  message = '',
  children = null,
  footer = null,
  rightContent = null,
  style = null,
  bodyStyle = null,
}) => {
  const styles = useMemo(
    () => createOperationalInsightsStyles(ppcColors, accentColor),
    [accentColor, ppcColors],
  );

  const accent = resolveAccentColor(ppcColors, accentColor);
  const normalizedMessage = normalizeText(message);
  const hasRenderableBody =
    Boolean(children) || loading || Boolean(normalizedMessage);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <View style={styles.headerIdentity}>
          {iconName ? (
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name={iconName}
                size={18}
                color={accent}
              />
            </View>
          ) : null}
          <View style={styles.titleWrap}>
            {normalizeText(title) ? <Text style={styles.title}>{title}</Text> : null}
            {normalizeText(subtitle) ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
          </View>
        </View>

        {rightContent ? <View style={styles.headerRight}>{rightContent}</View> : null}
      </View>

      {hasRenderableBody ? (
        <View style={[styles.body, bodyStyle]}>
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={accent} />
              <Text style={styles.loadingText}>
                {normalizedMessage || 'Carregando relatórios...'}
              </Text>
            </View>
          ) : Boolean(children) ? (
            children
          ) : (
            <Text style={styles.emptyText}>
              {normalizedMessage || 'Sem dados para exibir.'}
            </Text>
          )}
        </View>
      ) : null}

      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
};
