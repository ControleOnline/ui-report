import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {withOpacity} from '@controleonline/../../src/styles/branding';
import MermaidDiagram from './MermaidDiagram';

export default function FlowchartMaximizedOverlay({previewFlow, palette, styles, onClose}) {
  if (!previewFlow) {
    return null;
  }

  return (
    <View style={styles.flowMaximizedBackdrop}>
      <View style={styles.flowMaximizedPanel}>
        <View style={styles.flowMaximizedHeader}>
          <View style={styles.titleWrap}>
            <Text style={styles.editorTitle}>{previewFlow.title}</Text>
            <Text style={styles.pageSubtitle}>{previewFlow.summary}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && {backgroundColor: withOpacity(palette.primary, 0.08)},
            ]}
          >
            <Icon name="minimize-2" size={14} color={palette.primary} />
            <Text style={styles.secondaryButtonText}>Fechar</Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          style={styles.flowMaximizedScroll}
          contentContainerStyle={styles.flowMaximizedHorizontalContent}
          showsHorizontalScrollIndicator
        >
          <ScrollView
            style={styles.flowMaximizedVerticalScroll}
            contentContainerStyle={styles.flowMaximizedDiagramContent}
            showsVerticalScrollIndicator
          >
            <MermaidDiagram chart={previewFlow} palette={palette} styles={styles} />
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}
