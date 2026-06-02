import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { colors, gradients, radius, spacing, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium';

type ButtonProps = Omit<PressableProps, 'style'> & {
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: ButtonVariant;
};

export function Button({
  children,
  disabled,
  fullWidth,
  icon,
  size = 'medium',
  style,
  textStyle,
  variant = 'primary',
  ...pressableProps
}: ButtonProps) {
  const content = (
    <View style={styles.content}>
      {icon}
      <Text
        style={[
          styles.label,
          variant === 'ghost' && styles.ghostLabel,
          disabled && styles.disabledLabel,
          textStyle,
        ]}>
        {children}
      </Text>
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        fullWidth && styles.fullWidth,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...pressableProps}>
      {variant === 'primary' ? (
        <LinearGradient colors={gradients.primaryButton} style={styles.fill}>
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.fill, variantStyles[variant]]}>{content}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    minHeight: 48,
    minWidth: 48,
    overflow: 'hidden',
  },
  small: {
    minHeight: 44,
  },
  medium: {
    minHeight: 48,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  fill: {
    alignItems: 'center',
    borderRadius: radius.pill,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing[2],
    justifyContent: 'center',
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.primary,
    fontWeight: '700',
  },
  ghostLabel: {
    color: colors.accent.cyan,
  },
  disabled: {
    opacity: 0.48,
  },
  disabledLabel: {
    color: colors.text.disabled,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
});

const variantStyles = StyleSheet.create({
  primary: {},
  secondary: {
    backgroundColor: colors.background.surfaceElevated,
    borderColor: colors.border.strong,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing[2],
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.14)',
    borderColor: 'rgba(239, 68, 68, 0.32)',
    borderWidth: 1,
  },
});
