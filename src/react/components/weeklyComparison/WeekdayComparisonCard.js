import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {withOpacity} from '@controleonline/ui-layout/src/styles/branding';
import {
  formatDecimal,
  formatInteger,
  formatSignedPercent,
  normalizeNumber,
  normalizeText,
  resolveAccentColor,
  resolveProgressColor,
  ReportCardShell,
} from '../operationalInsights/shared';

const DEFAULT_TEXT = '#0F172A';
const DEFAULT_TEXT_SECONDARY = '#475569';
const DEFAULT_PANEL = '#FFFFFF';
const DEFAULT_BORDER = '#CBD5E1';

const createStyles = (ppcColors = {}, accentColor = '') => {
  const accent = resolveAccentColor(ppcColors, accentColor);

  return {
    scroll: {
      marginHorizontal: -2,
    },
    scrollContent: {
      paddingHorizontal: 2,
      gap: 12,
    },
    weekCard: {
      width: 264,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: withOpacity(
        normalizeText(ppcColors?.borderSoft || DEFAULT_BORDER),
        0.9,
      ),
      backgroundColor: withOpacity(
        normalizeText(ppcColors?.cardBg || DEFAULT_PANEL),
        0.99,
      ),
      paddingHorizontal: 12,
      paddingVertical: 12,
      shadowColor: '#0F172A',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 8},
      shadowRadius: 16,
      elevation: 6,
    },
    weekHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10,
    },
    weekTitleWrap: {
      flex: 1,
      minWidth: 0,
    },
    weekTitle: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '900',
    },
    weekSubtitle: {
      marginTop: 1,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    trendPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    trendPillText: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '900',
    },
    trendNote: {
      marginTop: 6,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
    },
    chart: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 4,
      minHeight: 116,
    },
    chartItem: {
      flex: 1,
      minWidth: 0,
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
    },
    chartTrack: {
      width: '100%',
      height: 104,
      borderRadius: 14,
      backgroundColor: withOpacity(
        normalizeText(ppcColors?.border || DEFAULT_BORDER),
        0.28,
      ),
      justifyContent: 'flex-end',
      overflow: 'hidden',
    },
    chartFill: {
      width: '100%',
      minHeight: 8,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      backgroundColor: accent,
    },
    chartTick: {
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 9,
      lineHeight: 11,
      fontWeight: '800',
    },
    rangeRow: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    rangeText: {
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 9,
      lineHeight: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    summaryGrid: {
      marginTop: 10,
      flexDirection: 'row',
      gap: 6,
    },
    summaryTile: {
      flex: 1,
      minWidth: 0,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: withOpacity(accent, 0.16),
      backgroundColor: withOpacity(accent, 0.06),
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    summaryValue: {
      color: normalizeText(ppcColors?.textPrimary || DEFAULT_TEXT),
      fontSize: 14,
      lineHeight: 16,
      fontWeight: '900',
    },
    summaryLabel: {
      marginTop: 2,
      color: normalizeText(ppcColors?.textSecondary || DEFAULT_TEXT_SECONDARY),
      fontSize: 9,
      lineHeight: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
  };
};

const resolveTrendMeta = week => {
  switch (week?.trend) {
    case 'up':
      return {
        icon: 'trending-up',
        color: '#16A34A',
        label:
          week?.growthPercent !== null
            ? formatSignedPercent(week.growthPercent)
            : 'novo',
      };
    case 'down':
      return {
        icon: 'trending-down',
        color: '#c10015',
        label:
          week?.growthPercent !== null
            ? formatSignedPercent(week.growthPercent)
            : '0%',
      };
    default:
      return {
        icon: 'minus',
        color: '#64748B',
        label:
          week?.growthPercent !== null
            ? formatSignedPercent(week.growthPercent)
            : '0%',
      };
  }
};

const WeekdayComparisonCard = ({
  ppcColors = {},
  title = '',
  subtitle = '',
  accentColor = '',
  comparison = null,
  loading = false,
  message = '',
  iconName = 'calendar-week',
  style = null,
}) => {
  const styles = useMemo(
    () => createStyles(ppcColors, accentColor),
    [accentColor, ppcColors],
  );

  const weekdays = useMemo(() => {
    if (Array.isArray(comparison)) {
      return comparison;
    }

    if (Array.isArray(comparison?.weekdays)) {
      return comparison.weekdays;
    }

    return [];
  }, [comparison]);

  const rangeLabel = normalizeText(comparison?.range?.label);
  const hasPoints = weekdays.some(weekday => Array.isArray(weekday?.points) && weekday.points.length > 0);

  return (
    <ReportCardShell
      ppcColors={ppcColors}
      accentColor={accentColor}
      title={title}
      subtitle={subtitle}
      iconName={iconName}
      loading={loading}
      message={message || (!hasPoints ? 'Sem dados para a comparação semanal.' : '')}
      style={style}
    >
      {hasPoints ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.scroll}
        >
          {weekdays.map(weekday => {
            const points = Array.isArray(weekday?.points) ? weekday.points : [];
            const maxValue =
              points.reduce(
                (highest, point) => Math.max(highest, normalizeNumber(point?.value)),
                0,
              ) || 1;
            const trendMeta = resolveTrendMeta(weekday);

            return (
              <View key={weekday?.key || weekday?.index} style={styles.weekCard}>
                <View style={styles.weekHeader}>
                  <View style={styles.weekTitleWrap}>
                    <Text style={styles.weekTitle}>{normalizeText(weekday?.label) || 'Dia'}</Text>
                    <Text style={styles.weekSubtitle}>
                      {points.length} ocorrências
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.trendPill,
                      {
                        borderColor: withOpacity(trendMeta.color, 0.3),
                        backgroundColor: withOpacity(trendMeta.color, 0.08),
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={trendMeta.icon}
                      size={12}
                      color={trendMeta.color}
                    />
                    <Text style={[styles.trendPillText, {color: trendMeta.color}]}>
                      {trendMeta.label}
                    </Text>
                  </View>
                </View>

                <Text style={styles.trendNote}>
                  {points.length > 0
                    ? `${normalizeText(weekday?.label) || 'Dia'} em sequência das últimas 10 semanas.`
                    : 'Sem ocorrências no período comparado.'}
                </Text>

                <View style={styles.chart}>
                  {points.map((point, index) => {
                    const height =
                      maxValue > 0
                        ? Math.max(8, Math.round((normalizeNumber(point?.value) / maxValue) * 100))
                        : 8;

                    return (
                      <View key={point?.key || index} style={styles.chartItem}>
                        <View style={styles.chartTrack}>
                          <View
                            style={[
                              styles.chartFill,
                              {
                                height,
                                backgroundColor: resolveProgressColor(
                                  accentColor,
                                  index,
                                  points.length,
                                ),
                              },
                            ]}
                          />
                        </View>
                        <Text style={styles.chartTick}>
                          {formatInteger(point?.value)}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {rangeLabel ? (
                  <View style={styles.rangeRow}>
                    <Text style={styles.rangeText}>{rangeLabel}</Text>
                    <Text style={styles.rangeText}>{'mais antigo -> mais recente'}</Text>
                  </View>
                ) : (
                  <View style={styles.rangeRow}>
                    <Text style={styles.rangeText}>{'mais antigo -> mais recente'}</Text>
                  </View>
                )}

                <View style={styles.summaryGrid}>
                  <View style={styles.summaryTile}>
                    <Text style={styles.summaryValue}>
                      {formatInteger(weekday?.totalSecondary)}
                    </Text>
                    <Text style={styles.summaryLabel}>Pedidos</Text>
                  </View>

                  <View style={styles.summaryTile}>
                    <Text style={styles.summaryValue}>
                      {formatInteger(weekday?.totalValue)}
                    </Text>
                    <Text style={styles.summaryLabel}>Itens</Text>
                  </View>

                  <View style={styles.summaryTile}>
                    <Text style={styles.summaryValue}>
                      {formatDecimal(weekday?.averageValue)}
                    </Text>
                    <Text style={styles.summaryLabel}>Média</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : null}
    </ReportCardShell>
  );
};

export default WeekdayComparisonCard;
