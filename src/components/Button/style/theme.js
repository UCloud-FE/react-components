/**
 * theme style for styleType
 */
export default ({ colorList }) => ({
    styleType: {
        primary: {
            color: colorList.white,
            background: colorList.primary2,
            borderColor: colorList.primary2,
            ':hover': {
                color: colorList.white,
                background: colorList.primary1,
                borderColor: colorList.primary1
            }
        },
        border: {
            color: colorList.secondary1,
            background: colorList.white,
            borderColor: colorList.secondary4,
            ':hover': {
                color: colorList.primary,
                background: colorList.white,
                borderColor: colorList.primary2
            }
        },
        'border-gray': {
            color: colorList.secondary1,
            background: colorList.primary4,
            borderColor: colorList.secondary4,
            ':hover': {
                color: colorList.primary2,
                background: colorList.primary4,
                borderColor: colorList.primary2
            }
        }
    }
});
