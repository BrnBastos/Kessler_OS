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
            Última atualização do adaptador: {new Date(status.updatedAt).toLocaleString('pt-BR')}
          </Text>
        )}
        {status.error && <Text style={styles.error}>Erro do adaptador: {status.error}</Text>}
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
