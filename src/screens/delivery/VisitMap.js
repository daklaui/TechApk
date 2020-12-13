import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Line from '../../components/Line';
import Card from '../../components/Card';
import {shadowSecondary} from '../../utils/shadow';

function ItemVisit(props) {
  const {leftElement, subTitle, title, style, rightStyle} = props;
  return (
    <View style={[itemStyles.view, style]}>
      {leftElement}
      <View style={[itemStyles.right, rightStyle && rightStyle]}>
        {subTitle && <Text forth style={itemStyles.subTitle}>{subTitle}</Text>}
        <Text>{title}</Text>
      </View>
    </View>
  );
}
function VisitMap(props) {
  const {colors} = useTheme();
  const {style, textFrom, textTo, textDuration} = props;

  return (
    <Card style={[styles.container, style]}>
      <ItemVisit
        title={textFrom}
        leftElement={
          <View style={styles.fromLeft}>
            <View
              style={[styles.fromIcon, {backgroundColor: colors.primary}]}
            />
            <Line direction="vertical" type="dashed" color={colors.thirdText} />
          </View>
        }
        rightStyle={styles.fromText}
        style={styles.viewFrom}
      />
      <ItemVisit
        subTitle={textDuration}
        title={textTo}
        leftElement={
          <Icon
            containerStyle={styles.toLeft}
            name="map-marker"
            size={24}
            color={colors.error}
          />
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 30,
    paddingRight: 22,
    ...shadowSecondary,
  },
  viewFrom: {
    marginBottom: 5,
  },
  fromLeft: {
    width: 63,
    alignItems: 'center',
    height: '100%',
  },
  fromIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginBottom: 5,
  },
  fromText: {
    marginBottom: 27,
  },
  toLeft: {
    width: 63,
  },
});

const itemStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  right: {
    flex: 1,
  },
  subTitle: {
    marginBottom: 4,
  },
});

export default VisitMap;
