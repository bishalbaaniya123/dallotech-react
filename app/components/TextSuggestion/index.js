import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import {allCountries} from 'dan-api/extras/countries';
import api from 'dan-api/remote-api/index';

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class HighlightSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      suggestions: [],
      placeholder: props.placeholder || 'No placeholder',
      identifier: props.identifier,
      suggestionUrl: props.suggestionUrl,
      suggestionsApi: [],
      allSuggestions: []
    };
  }

  componentDidMount() {
    const { identifier, suggestionUrl } = this.state;
    if (identifier === 'loading_port' || identifier === 'discharge_port') {
      this.setState({
        allSuggestions: [
          {
            id: 1,
            name: 'Shanghai'
          },
          {
            id: 2,
            name: 'Singapore'
          },
          {
            id: 3,
            name: 'Hong Kong'
          },
          {
            id: 4,
            name: 'Guangzhou'
          },
          {
            id: 5,
            name: 'Ningbo'
          },
          {
            id: 6,
            name: 'Rotterdam'
          },
        ]
      });
    } else if(identifier === "country") {
      this.setState({
        allSuggestions: allCountries
      });
    } else {
      if (identifier && suggestionUrl) {
        api.getSuggestion(suggestionUrl)
          .then(res => {
            this.setState({
              allSuggestions: res
            });
          });
      }
    }
  }

  renderInput = (inputProps) => {
    const { classes, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        disabled={this.props.isDisabled}
        label={this.props.topLabel || ''}
        InputProps={{
          inputRef: ref,
          classes: {
            input: classes.input,
          },
          ...other,
        }}
        style={this.props.style}
      />
    );
  };

  getSuggestions = (value) => {
    const { allSuggestions } = this.state;
    const inputValue = value.trim()
      .toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 ? [] : allSuggestions.filter(suggestion => {
      const keep = count < 5 && suggestion.name.toLowerCase()
        .slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });

  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    if (this.state.identifier === 'meeting_with') {
      return newValue
    }
    this.setState({
      value: newValue,
    }, () => {
      for (let i in this.state.allSuggestions) {
        if (newValue === this.state.allSuggestions[i].name) {
          switch (this.state.identifier) {
            case 'customer_id':
              this.props.setNewId('customer', 'customer_id', this.state.allSuggestions[i].id, this.state.allSuggestions[i].name);
              break;
            case 'ware_house_address_id':
              if (this.props.section === 'origin_warehouse') {
                this.props.setNewId('trade_lane', 'origin_ware_house', 'ware_house_address_id', this.state.allSuggestions[i].id);
              } else {
                this.props.setNewId('trade_lane', 'destination_ware_house', 'ware_house_address_id', this.state.allSuggestions[i].id);
              }
              break;
            case 'loading_port':
              this.props.setNewId('trade_lane', 'loading_port', this.state.allSuggestions[i].name);
              break;
            case 'discharge_port':
              this.props.setNewId('trade_lane', 'discharge_port', this.state.allSuggestions[i].name);
              break;
            default:
              break;
          }
        }
      }
    });
  };

  renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.name;
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div" style={{zIndex: 10000}}>
        <div>
          {parts.map((part, index) => (
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            )
          ))}
        </div>
      </MenuItem>
    );
  };

  render() {
    const { classes } = this.props;
    const { suggestions, value } = this.state;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          classes,
          placeholder: this.state.placeholder,
          value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

HighlightSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  setNewId: PropTypes.object.optional,
  topLabel: PropTypes.string.optional,
};

export default withStyles(styles)(HighlightSuggest);
