import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { OrbitalObjectRepositoryStatus } from '@/domain/repositories';
import { colors, radius, spacing, typography } from '@/theme';

type DataSourceNoticeProps = {
  isLoading?: boolean;
  status: OrbitalObjectRepositoryStatus;
  style?: StyleProp<ViewStyle>;
};

export function DataSourceNotice({ isLoading, status, style }: DataSourceNoticeProps) {
  const title = isLoading
    ? 'Checking public orbital data'
    : status.source === 'celestrak'
      ? 'CelesTrak data loaded'
      : 'Using local fallback catalog';
  const detail = isLoading
    ? 'The app is starting with local objects while the public adapter refreshes in the background.'
    : status.message;

  return (
    <View
      style={[
        styles.notice,
        status.source === 'celestrak' && styles.noticeLive,
        status.error && styles.noticeError,
        style,
      ]}>
      <View style={styles.marker} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
        {status.updatedAt && (
          <Text style={styles.meta}>
            Last adapter refresh: {new Date(status.updatedAt).toLocaleString()}
          </Text>
        )}
        {status.error && <Text style={styles.error}>Adapter error: {status.error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    alignItems: 'flex-start',
    backgroundColor: colors.background.surface,
    borderColor: colors.border.subtle,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing[3],
    padding: spacing[4],
  },
  noticeLive: {
    borderColor: 'rgba(34, 197, 94, 0.32)',
  },
  noticeError: {
    borderColor: 'rgba(245, 158, 11, 0.32)',
  },
  marker: {
    backgroundColor: colors.accent.cyan,
    borderRadius: radius.pill,
    height: 10,
    marginTop: 4,
    width: 10,
  },
  copy: {
    flex: 1,
    gap: spacing[1],
    minWidth: 0,
  },
  title: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  detail: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.muted,
  },
  error: {
    ...typography.caption,
    color: colors.semantic.warning,
  },
});
