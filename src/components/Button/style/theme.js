/**
 * theme style for styleType
 */
export default ({ colorList, materialVars }) => ({
    styleType: {
        primary: {
            color: colorList.white,
            borderColor: colorList.primary2,
            border: 'none',
            background: materialVars.primaryLinearGradient,
            boxShadow: materialVars.primaryBoxShadow,
            transition: `all ${materialVars.transitionUp}`,
            ':hover': {
                color: colorList.white,
                borderColor: colorList.primary1,
                background: materialVars.primaryLinearGradientActive,
                boxShadow: materialVars.primaryBoxShadowActive
            }
        },
        border: {
            color: colorList.secondary1,
            background: colorList.white,
            borderColor: colorList.secondary4,
            border: 'none',
            boxShadow: materialVars.whiteBoxShadow,
            transition: `all ${materialVars.transitionUp}`,
            ':hover': {
                color: colorList.primary,
                background: colorList.white,
                borderColor: colorList.primary2,
                boxShadow: materialVars.whiteBoxShadowActive
            }
        },
        'border-gray': {
            color: colorList.secondary1,
            borderColor: colorList.secondary4,
            transition: `all ${materialVars.transitionFlat}`,
            background: '#fafafc',
            ':hover': {
                background: '#fff',
                color: colorList.primary,
                borderColor: colorList.primary
            }
        }
    }
});
