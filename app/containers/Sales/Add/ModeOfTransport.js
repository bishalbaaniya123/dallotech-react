import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import classNames from 'classnames';
import imgApi from 'dan-api/images/photos';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    marginBottom: '50px',
    marginTop: '30px'
  },
  marginLeft5: {
    marginLeft: '5%',
  },
  marginLeft20: {
    marginLeft: '20%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.1,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

class ComplexButtons extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: props.state.name,
      images: [],
    };
  }

  componentWillMount() {
    this.setState({
      images: [
        {
          url: imgApi[62],
          title: 'Air',
          width: '22.5%',
          id: 'AIR'
        },
        {
          url: imgApi[63],
          title: 'Sea',
          width: '22.5%',
          id: 'SEA'
        },
        {
          url: imgApi[64],
          title: 'Rail',
          width: '22.5%',
          id: 'RAIL'
        },{
          url: imgApi[73],
          title: 'Road',
          width: '22.5%',
          id: 'ROAD'
        },
      ]
    });
  }

  handleButtonClick = (key) => {
    this.props.getButtonClickAction("MODE_OF_TRANSPORT", key, "transport_type");
  };


  render() {
    const { classes } = this.props;
    let {name, images} = this.state;

    return (
      <Fragment>
        <div className={classNames(classes.root, classes.marginLeft5)}>
          {images.map(image => (
            <ButtonBase
              focusRipple
              key={image.id}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
              }}
              onClick={() => this.handleButtonClick(image.id)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop}/>
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked}/>
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>
      </Fragment>
    );
  }
}

ComplexButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexButtons);
