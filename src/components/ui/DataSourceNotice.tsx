import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { OrbitalObjectRepositoryStatus } from '@/domain/repositories';
import { colors, radius, spacing, typography, useKesslerTheme } from '@/theme';

type DataSourceNoticeProps = {
  isLoading?: boolean;
  status: OrbitalObjectRepositoryStatus;
  style?: StyleProp<ViewStyle>;
};

export function DataSourceNotice({ isLoading, status, style }: DataSourceNoticeProps) {
  const theme = useKesslerTheme();
  const title = isLoading
    ? 'Verificando dados orbitais públicos'
    : status.source === 'celestrak'
      ? 'Dados do CelesTrak carregados'
      : 'Usando catálogo local de apoio';
  const detail = isLoading
    ? 'O app começa com objetos locais enquanto o adaptador público atualiza em segundo plano.'
    : status.message;

  return (
    <View
      style={[
        styles.notice,
        {
          backgroundColor: theme.colors.background.surface,
          borderColor: theme.colors.border.subtle,
        },
        status.source === 'celestrak' && styles.noticeLive,
        status.error && styles.noticeError,
        style,
      ]}>
      <View style={[styles.marker, { backgroundColor: theme.colors.accent.cyan }]} />
      <View style={styles.copy}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
        <Text style={[styles.detail, { color: theme.colors.text.secondary }]}>{detail}</Text>
        {status.updatedAt && (
          <Text style={[styles.meta, { color: theme.colors.text.muted }]}>
            Última atualização do adaptador: {new Date(status.updatedAt).toLocaleString('pt-BR')}
          </Text>
        )}
        {status.error && (
          <Text style={[styles.error, { color: theme.colors.semantic.warning }]}>
            Erro do adaptador: {status.error}
          </Text>
        )}
        {isLoading && (
          <View
            accessibilityLabel="Carregando dados orbitais"
            accessibilityRole="progressbar"
            style={styles.skeletonGroup}>
            <View
              style={[
                styles.skeletonLine,
                styles.skeletonLineLarge,
                { backgroundColor: 'rgba(203, 213, 225, 0.2)' },
              ]}
            />
            <View style={styles.skeletonGrid}>
              <View
                style={[styles.skeletonBlock, { backgroundColor: theme.colors.background.surfaceSoft }]}
              />
              <View
                style={[styles.skeletonBlock, { backgroundColor: theme.colors.background.surfaceSoft }]}
              />
              <View
                style={[styles.skeletonBlock, { backgroundColor: theme.colors.background.surfaceSoft }]}
              />
            </View>
          </View>
        )}
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
  skeletonGroup: {
    gap: spacing[2],
    paddingTop: spacing[2],
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  skeletonLine: {
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: radius.pill,
    height: 10,
  },
  skeletonLineLarge: {
    maxWidth: 360,
    width: '72%',
  },
  skeletonBlock: {
    backgroundColor: 'rgba(148, 163, 184, 0.16)',
    borderColor: 'rgba(148, 163, 184, 0.1)',
    borderRadius: radius.sm,
    borderWidth: 1,
    flexBasis: 96,
    flexGrow: 1,
    height: 38,
  },
});
