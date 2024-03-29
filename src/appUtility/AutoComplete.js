import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListView, Platform, StyleSheet, Text, View, ViewPropTypes as RNViewPropTypes} from 'react-native';
import {Input} from 'react-native-elements'
import {colors, radius} from "../styles/base";

const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
  static propTypes = {
    ...Input.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the textInput component.
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ViewPropTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input.
     */
    renderItem: PropTypes.func,
    /**
     * `renderSeparator` will be called to render the list separators
     * which will be displayed between the list elements in the result view
     * below the text input.
     */
    renderSeparator: PropTypes.func,
    /**
     * renders custom Input. All props passed to this function.
     */
    renderTextInput: PropTypes.func,
    /**
     * `rowHasChanged` will be used for data objects comparison for dataSource
     */
    rowHasChanged: PropTypes.func
  };

  static defaultProps = {
    data: [],
    defaultValue: '',
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: rowData => <Text>{rowData}</Text>,
    renderSeparator: null,
    renderTextInput: props => <Input {...props}ref={props.inputRef} />,
    rowHasChanged: (r1, r2) => r1 !== r2
  };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: props.rowHasChanged});
    this.state = {dataSource: ds.cloneWithRows(props.data)};
    this.resultList = null;
  }

  componentWillReceiveProps({data}) {
    const dataSource = this.state.dataSource.cloneWithRows(data);
    this.setState({dataSource});
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const {textInput} = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const {textInput} = this;
    textInput && textInput.focus();
  }

  renderResultList() {
    const {dataSource} = this.state;
    const {
      listStyle,
      renderItem,
      renderSeparator,
      keyboardShouldPersistTaps,
      onEndReached,
      onEndReachedThreshold
    } = this.props;

    return (
      <ListView
        ref={(resultList) => {
          this.resultList = resultList;
        }}
        dataSource={dataSource}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        renderRow={renderItem}
        renderSeparator={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        style={[styles.list, listStyle, {height: 150}]}
      />
    );
  }

  renderTextInput() {
    const {onEndEditing, renderTextInput, style} = this.props;
    const props = {
      style: [styles.input, style],
      ref: ref => (this.textInput = ref),
      onEndEditing: e => onEndEditing && onEndEditing(e),
      ...this.props
    };

    return renderTextInput(props);
  }

  render() {
    const {dataSource} = this.state;
    const {
      containerStyle,
      hideResults,
      inputContainerStyle,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture
    } = this.props;
    const showResults = dataSource.getRowCount() > 0;

    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {this.renderTextInput()}
        </View>
        {!hideResults && (
          <View
            style={listContainerStyle}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderRadius: 1,
  borderWidth: 1
};

const androidStyles = {
  container: {
    flex: 1
  },
  inputContainer: {
    ...border,
    marginBottom: 0
  },
  list: {
    ...border,
    backgroundColor:colors.white,
    borderTopWidth: 0,
    margin: 10,
    marginTop: 0
  }
};

const iosStyles = {
  container: {
    zIndex: 10,
    flex: 1
  },
  inputContainer: {
    ...border
  },
  inputContainerStyle: {
    height: 300,
    maxHeight: 300,
    borderWidth: 0,
    marginTop: 3,
    zIndex: 1,
    borderStyle: 'solid',
    backgroundColor:colors.danger,
    borderColor: colors.white,
  },
  listContainerStyle: {
    height: 300,
    zIndex: 1,
    maxHeight: 300,
    borderColor: colors.border,
    backgroundColor:colors.white,
    borderRadius: radius.lg
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  list: {
    ...border,
    zIndex: 1,
    height: 300,
    maxHeight: 300,
    backgroundColor: colors.white,
    borderTopWidth: 0,
  }
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 40,
    paddingLeft: 3
  },
  ...Platform.select({
    android: {...androidStyles},
    ios: {...iosStyles}
  })
});

export default Autocomplete;
