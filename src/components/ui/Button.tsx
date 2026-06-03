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

import { colors, gradients, radius, spacing, typography, useKesslerTheme } from '@/theme';

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
  const theme = useKesslerTheme();
  const fillStyle = [
    styles.fill,
    size === 'small' ? styles.fillSmall : styles.fillMedium,
    fullWidth && styles.fillFullWidth,
  ];

  const content = (
    <View style={styles.content}>
      {icon}
      <Text
        maxFontSizeMultiplier={1.25}
        numberOfLines={2}
        style={[
          styles.label,
          {
            color:
              variant === 'ghost'
                ? theme.colors.accent.cyan
                : disabled
                  ? theme.colors.text.disabled
                  : theme.colors.text.primary,
          },
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
        <LinearGradient colors={gradients.primaryButton} style={fillStyle}>
          {content}
        </LinearGradient>
      ) : (
        <View
          style={[
            fillStyle,
            variantStyles[variant],
            variant === 'secondary' && {
              backgroundColor: theme.colors.background.surfaceElevated,
              borderColor: theme.colors.border.strong,
            },
          ]}>
          {content}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    flexShrink: 1,
    maxWidth: '100%',
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
    width: '100%',
  },
  fill: {
    alignItems: 'center',
    borderRadius: radius.pill,
    justifyContent: 'center',
    maxWidth: '100%',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  fillSmall: {
    minHeight: 44,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  fillMedium: {
    minHeight: 48,
  },
  fillFullWidth: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    flexShrink: 1,
    flexDirection: 'row',
    gap: spacing[2],
    justifyContent: 'center',
    maxWidth: '100%',
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.primary,
    flexShrink: 1,
    fontWeight: '700',
    includeFontPadding: false,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.48,
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
