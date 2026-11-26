import {Platform, StyleSheet} from 'react-native';
import {withOpacity} from '@controleonline/ui-layout/src/styles/branding';

const createShadow = () =>
  Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOpacity: 0.08,
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 18,
    },
    android: {
      elevation: 6,
    },
    web: {
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
    },
    default: {},
  });

const createReportPageStyles = (width = 0) => {
  const cardBasis =
    width >= 1320 ? '32%' : width >= 960 ? '48%' : '100%';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F5F9',
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 32,
      gap: 18,
    },
    heroCard: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 28,
      backgroundColor: '#0F172A',
      paddingHorizontal: 20,
      paddingVertical: 20,
      ...createShadow(),
    },
    heroOrbOne: {
      position: 'absolute',
      right: -24,
      top: -24,
      width: 180,
      height: 180,
      borderRadius: 999,
      backgroundColor: 'rgba(14, 165, 233, 0.16)',
    },
    heroOrbTwo: {
      position: 'absolute',
      left: -38,
      bottom: -52,
      width: 210,
      height: 210,
      borderRadius: 999,
      backgroundColor: 'rgba(34, 197, 94, 0.14)',
    },
    heroHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
    },
    heroTextWrap: {
      flex: 1,
      minWidth: 0,
      gap: 6,
    },
    heroEyebrow: {
      color: withOpacity('#FFFFFF', 0.72),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: 1.8,
    },
    heroTitle: {
      color: '#FFFFFF',
      fontSize: 28,
      lineHeight: 32,
      fontWeight: '900',
      letterSpacing: -0.6,
    },
    heroSubtitle: {
      maxWidth: 860,
      color: withOpacity('#E2E8F0', 0.94),
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '600',
    },
    heroMetaRow: {
      marginTop: 14,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    heroChip: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: withOpacity('#FFFFFF', 0.14),
      backgroundColor: withOpacity('#FFFFFF', 0.08),
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    heroChipText: {
      color: '#FFFFFF',
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    heroActions: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      gap: 10,
    },
    refreshButton: {
      borderRadius: 16,
      backgroundColor: '#E2E8F0',
      paddingHorizontal: 14,
      paddingVertical: 10,
      minWidth: 132,
      alignItems: 'center',
      justifyContent: 'center',
    },
    refreshButtonText: {
      color: '#0F172A',
      fontSize: 11,
      lineHeight: 13,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    refreshHint: {
      color: withOpacity('#FFFFFF', 0.62),
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '700',
      textAlign: 'right',
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12,
    },
    sectionHeaderText: {
      flex: 1,
      minWidth: 0,
      gap: 3,
    },
    sectionEyebrow: {
      color: '#475569',
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    sectionTitle: {
      color: '#0F172A',
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '900',
      letterSpacing: -0.4,
    },
    sectionSubtitle: {
      color: '#64748B',
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '600',
    },
    sectionPill: {
      borderRadius: 999,
      borderWidth: 1,
      borderColor: withOpacity('#0F172A', 0.08),
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    sectionPillText: {
      color: '#0F172A',
      fontSize: 10,
      lineHeight: 12,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    gridCard: {
      flexBasis: cardBasis,
      minWidth: 0,
      flexGrow: 1,
    },
    fullWidthCard: {
      flexBasis: '100%',
    },
    comparisonCard: {
      flexBasis: '100%',
    },
    sectionSpacer: {
      height: 6,
    },
  });
};

export default createReportPageStyles;
