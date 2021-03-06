import * as React from 'react';
import {CSSObject} from '@emotion/core';
import {
  focusRing,
  useTheme,
  Themeable,
  EmotionCanvasTheme,
  createComponent,
} from '@workday/canvas-kit-react/common';
import {colors, space, type, borderRadius} from '@workday/canvas-kit-react/tokens';
import {CanvasSystemIcon} from '@workday/design-assets-types';
import {ButtonColors} from './types';
import {ButtonContainer, ButtonLabelIcon, ButtonLabel} from './parts';

export interface TertiaryButtonProps extends Themeable {
  /**
   * The variant of the TertiaryButton.
   * @default undefined
   */
  variant?: 'inverse' | undefined;
  /**
   * The size of the TertiaryButton.
   * @default 'medium'
   */
  size?: 'small' | 'medium';
  /**
   * The position of the TertiaryButton icon.
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * The icon of the TertiaryButton.
   */
  icon?: CanvasSystemIcon;
  /**
   * The capitalization of the text in the button.
   */
  /**
   * If set to `true`, transform the icon's x-axis to mirror the graphic
   * @default false
   */
  shouldMirrorIcon?: boolean;
  allCaps?: boolean;
  children?: React.ReactNode;
}

const getTertiaryButtonColors = (
  variant: 'inverse' | undefined,
  theme: EmotionCanvasTheme
): ButtonColors => {
  const {
    canvas: {
      palette: {primary: themePrimary},
    },
  } = theme;

  if (variant === 'inverse') {
    return {
      default: {
        background: 'transparent',
        icon: colors.frenchVanilla100,
        label: colors.frenchVanilla100,
      },
      hover: {
        background: colors.frenchVanilla100,
        icon: colors.blackPepper400,
        label: colors.blackPepper400,
      },
      active: {
        background: colors.soap200,
        icon: colors.blackPepper400,
        label: colors.blackPepper400,
      },
      focus: {
        background: colors.frenchVanilla100,
        icon: colors.blackPepper400,
        label: colors.blackPepper400,
        focusRing: focusRing(
          {
            separation: 2,
            inset: 'inner',
            innerColor: 'currentColor',
            outerColor: colors.frenchVanilla100,
          },
          theme
        ),
      },
      disabled: {
        background: 'transparent',
        icon: 'rgba(255, 255, 255, 0.5)',
        label: 'rgba(255, 255, 255, 0.5)',
      },
    };
  } else {
    return {
      default: {
        icon: themePrimary.main,
        label: themePrimary.main,
      },
      hover: {
        background: colors.soap200,
        icon: themePrimary.dark,
        label: themePrimary.dark,
      },
      active: {
        background: colors.soap300,
        icon: themePrimary.dark,
        label: themePrimary.dark,
      },
      focus: {
        icon: themePrimary.dark,
        label: themePrimary.dark,
        focusRing: focusRing({}, theme),
      },
      disabled: {
        background: 'transparent',
        icon: themePrimary.light,
        label: themePrimary.light,
      },
    };
  }
};

const containerStyles = {
  borderRadius: borderRadius.m,
  border: '0',
  padding: `0 ${space.xxs}`,
  minWidth: 'auto',
  '.wdc-text-button-label': {
    borderBottom: '2px solid transparent',
    paddingTop: '2px',
    transition: 'border-color 0.3s',
  },
  '&:hover:not([disabled]) .wdc-text-button-label': {
    borderBottomColor: 'currentColor',
  },
};

export const TertiaryButton = createComponent('button')({
  displayName: 'TertiaryButton',
  Component: (
    {
      // TODO: Fix useTheme and make it a real hook
      // eslint-disable-next-line react-hooks/rules-of-hooks
      theme = useTheme(),
      size = 'medium',
      iconPosition = 'left',
      variant,
      children,
      icon,
      shouldMirrorIcon = false,
      allCaps,
      ...elemProps
    }: TertiaryButtonProps,
    ref,
    Element
  ) => {
    // Note: We don't use ButtonLabel because the label styles differ from other button types
    const allContainerStyles: CSSObject = allCaps
      ? {
          ...containerStyles,
          textTransform: 'uppercase',
          fontWeight: type.properties.fontWeights.bold,
          fontSize: size === 'medium' ? type.properties.fontSizes[16] : undefined,
          letterSpacing: '.5px',
        }
      : {
          ...containerStyles,
          fontSize: size === 'medium' ? type.properties.fontSizes[14] : undefined,
        };

    return (
      <ButtonContainer
        ref={ref}
        as={Element}
        colors={getTertiaryButtonColors(variant, theme)}
        size={size}
        extraStyles={allContainerStyles}
        {...elemProps}
      >
        {icon && iconPosition === 'left' && (
          <ButtonLabelIcon
            size={size}
            iconPosition={iconPosition}
            icon={icon}
            shouldMirrorIcon={shouldMirrorIcon}
          />
        )}
        <ButtonLabel className="wdc-text-button-label">{children}</ButtonLabel>
        {icon && iconPosition === 'right' && (
          <ButtonLabelIcon
            size={size}
            iconPosition={iconPosition}
            icon={icon}
            shouldMirrorIcon={shouldMirrorIcon}
          />
        )}
      </ButtonContainer>
    );
  },
});
