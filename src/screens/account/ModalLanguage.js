import * as React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {View} from 'react-native';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import SelectType from '../../containers/SelectType';

class ModalLanguage extends React.Component {
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
    const {visitModal, setModalVisible, languages, clickShow, t} = this.props;
    const {valueSelect} = this.state;
    const types = Object.values(languages).map(lang => ({
      name: lang.translated_name || lang.native_name,
      status: lang.code,
    }));
    return (
      <Modal visible={visitModal} setModalVisible={setModalVisible}>
        <View style={{paddingHorizontal: 27}}>
          <SelectType
            lists={types}
            valueSelect={valueSelect}
            onSelect={item => this.changeSelect(item.status)}
          />
          <Button
            title={t('common:text_show')}
            onPress={() => clickShow(valueSelect)}
            containerStyle={{marginVertical: 28}}
          />
        </View>
      </Modal>
    );
  }
}

ModalLanguage.propTypes = {
  visitModal: PropTypes.bool,
  setModalVisible: PropTypes.func,
  languages: PropTypes.object,
  valueSelect: PropTypes.string,
  clickShow: PropTypes.func,
};
ModalLanguage.defaultProps = {
  visitModal: false,
  languages: {},
};
export default withTranslation()(ModalLanguage);
