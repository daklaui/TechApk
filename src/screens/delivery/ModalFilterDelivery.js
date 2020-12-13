import * as React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import SelectType from '../../containers/SelectType';

class ModalFilterDelivery extends React.Component {
  constructor(props) {
    super(props);
    const {valueSelect} = props;
    this.state = {
      valueSelect: valueSelect,
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {visitModal, valueSelect} = this.props;
    if (
      visitModal !== prevProps.visitModal &&
      valueSelect !== this.state.valueSelect
    ) {
      this.changeSelect(valueSelect);
    }
  }

  changeSelect = value => {
    this.setState({
      valueSelect: value,
    });
  };
  render() {
    const {visitModal, setModalVisible, types, clickShow} = this.props;
    const {valueSelect} = this.state;
    return (
      <Modal visible={visitModal} setModalVisible={setModalVisible}>
        <View style={{paddingHorizontal: 27}}>
          <SelectType
            lists={types}
            valueSelect={valueSelect}
            onSelect={item => this.changeSelect(item.status)}
          />
          <Button title="Show" onPress={() => clickShow(valueSelect)} containerStyle={{marginVertical: 28}}/>
        </View>
      </Modal>
    );
  }
}

ModalFilterDelivery.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  types: PropTypes.array,
  valueSelect: PropTypes.string,
  clickShow: PropTypes.func,
};
ModalFilterDelivery.defaultProps = {
  visitModal: false,
  types: [],
};
export default ModalFilterDelivery;
