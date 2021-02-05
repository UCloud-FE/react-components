export default function hoistStatics(targetComponent, sourceComponent) {
    if ('defaultProps' in sourceComponent) {
        targetComponent.defaultProps = sourceComponent.defaultProps;
    }
    return targetComponent;
}
