import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import {StyleSheet, View, Switch} from 'react-native';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import SelectType from '../../containers/SelectType';
import {shadowBottom} from '../../utils/shadow';

class ModalFilterNotification extends React.Component {
  constructor(props) {
    super(props);
    const {filter} = props;
    this.state = {
      filter: filter,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, filter} = this.props;
    if (
      visitModal !== prevProps.visitModal &&
      !isEqual(filter.equals, this.state.filter)
    ) {
      this.changeFilter(filter);
    }
  }
  changeFilter = value => {
    this.setState({
      filter: value,
    });
  };
  changeValue = (key, value) => {
    this.setState(preState => ({
      filter: {
        ...preState.filter,
        [key]: value,
      },
    }));
  };

  render() {
    const {visitModal, setModalVisible, types, clickShow, titleRead} = this.props;
    const {filter} = this.state;
    const {isRead, status} = filter;
    return (
      <Modal visible={visitModal} setModalVisible={setModalVisible}>
        <View style={styles.content}>
          <View style={styles.viewSwitch}>
            <Text h4 medium>
              {titleRead}
            </Text>
            <Switch
              value={isRead}
              onValueChange={value => this.changeValue('isRead', value)}
            />
          </View>
          <SelectType
            lists={types}
            valueSelect={status}
            onSelect={item => this.changeValue('status', item.status)}
          />
          <Button
            title="Show"
            onPress={() => clickShow(filter)}
            containerStyle={styles.button}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 27,
  },
  viewSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
    ...shadowBottom,
  },
  button: {
    marginVertical: 28,
  },
});
ModalFilterNotification.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  types: PropTypes.array,
  filter: PropTypes.object.isRequired,
  clickShow: PropTypes.func,
};
ModalFilterNotification.defaultProps = {
  visitModal: false,
  types: [],
};
export default ModalFilterNotification;
